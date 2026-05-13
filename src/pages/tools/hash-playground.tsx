import React, { useCallback, useMemo, useState } from "react";
import Layout from "@theme/Layout";

type PhaseKey = "fundamentals" | "salting" | "stretching" | "storage" | "attacks";

type PhaseConfig = {
  key: PhaseKey;
  label: string;
  badge: string;
  headline: string;
  description: string;
  attackerFocus: string;
  defenderFocus: string;
  observations: string[];
};

type AttackerLineTone = "default" | "muted" | "warn" | "danger";

type AttackerLine = {
  id: string;
  text: string;
  tone: AttackerLineTone;
};

type EventSeverity = "info" | "strong" | "neutral";

type EventEntry = {
  id: string;
  label: string;
  body: string;
  severity: EventSeverity;
  timestamp: string;
};

type AlgorithmKey = "SHA-256" | "SHA-1";

const phases: PhaseConfig[] = [
  {
    key: "fundamentals",
    label: "Fundamentals",
    badge: "Concept",
    headline: "From raw passwords to irreversible digests.",
    description:
      "This phase focuses on the core idea of password hashing: transforming a human-chosen secret into a fixed-length, irreversible digest. The goal is to ensure that even if an attacker steals the database, they cannot easily recover the original passwords.",
    attackerFocus:
      "The attacker wants direct access to raw passwords or weakly protected hashes that can be reversed or guessed quickly.",
    defenderFocus:
      "The defender wants to ensure that no raw passwords are ever stored and that hashes are produced using modern, collision-resistant algorithms.",
    observations: [
      "The same password and algorithm always produce the same hash.",
      "Small changes in the password completely change the resulting hash.",
      "Hash length is fixed for a given algorithm, regardless of password length."
    ]
  },
  {
    key: "salting",
    label: "Salting",
    badge: "Defense",
    headline: "Breaking precomputed tables with unique salts.",
    description:
      "Salts ensure that identical passwords do not produce identical hashes across users or systems. This prevents attackers from using precomputed rainbow tables and makes large-scale reuse of work much harder.",
    attackerFocus:
      "The attacker prefers unsalted hashes so that one precomputed table can attack many accounts at once.",
    defenderFocus:
      "The defender generates a unique, random salt per credential and stores it alongside the hash so verification remains possible.",
    observations: [
      "Different salts produce different hashes for the same password.",
      "Salts are not secret; they are stored with the hash.",
      "Random, per-user salts make rainbow tables ineffective."
    ]
  },
  {
    key: "stretching",
    label: "stretching",
    badge: "Defense",
    headline: "Trading CPU cycles for attacker pain.",
    description:
      "Key stretching increases the computational cost of hashing. Legitimate users only pay this cost during login, but attackers must pay it for every guess in an offline attack.",
    attackerFocus:
      "The attacker wants low-cost hashes so they can test billions of guesses per second on GPUs or ASICs.",
    defenderFocus:
      "The defender tunes iteration counts or uses memory-hard algorithms to slow down brute-force attempts while keeping login latency acceptable.",
    observations: [
      "Higher iteration counts increase the time required to compute a hash.",
      "Attackers must pay the same cost for each password guess.",
      "There is a balance between user experience and brute-force resistance."
    ]
  },
  {
    key: "storage",
    label: "Storage",
    badge: "Implementation",
    headline: "Encoding parameters, salts, and hashes safely.",
    description:
      "Password storage formats encode the algorithm, parameters, salt, and hash in a single record. This allows the system to verify passwords later and migrate to stronger settings over time.",
    attackerFocus:
      "The attacker inspects storage formats to identify weak algorithms, low iteration counts, or missing salts.",
    defenderFocus:
      "The defender uses explicit, self-describing formats that make verification and future migrations predictable and safe.",
    observations: [
      "Storing algorithm and parameters enables flexible verification.",
      "Consistent formats simplify migrations and audits.",
      "Compromised storage should not reveal raw passwords."
    ]
  },
  {
    key: "attacks",
    label: "Attack Surface",
    badge: "Threat",
    headline: "Reading hashes like an attacker would.",
    description:
      "In this phase, you interpret the configuration as an attacker. Weak algorithms, missing salts, and low iteration counts translate directly into faster cracking and higher risk.",
    attackerFocus:
      "The attacker prioritizes weak hashes and misconfigurations to maximize success with minimal cost.",
    defenderFocus:
      "The defender continuously reviews stored hashes and configuration to phase out weak settings before they are exploited.",
    observations: [
      "Low iteration counts enable high-speed offline cracking.",
      "Missing salts allow reuse of precomputed hashes.",
      "Legacy algorithms like MD5 or SHA-1 are considered unsafe for password storage."
    ]
  }
];

const algorithms: { key: AlgorithmKey; label: string; digestName: AlgorithmKey; bitLength: number }[] = [
  { key: "SHA-256", label: "SHA-256 (recommended baseline)", digestName: "SHA-256", bitLength: 256 },
  { key: "SHA-1", label: "SHA-1 (legacy, weak)", digestName: "SHA-1", bitLength: 160 }
];

function nowTimeString(): string {
  const d = new Date();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const ss = d.getSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i += 1) {
    const h = bytes[i].toString(16).padStart(2, "0");
    hex += h;
  }
  return hex;
}

async function hashOnce(algorithm: AlgorithmKey, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const digest = await crypto.subtle.digest(algorithm, encoded);
  return toHex(digest);
}

async function stretchHash(
  algorithm: AlgorithmKey,
  password: string,
  salt: string,
  iterations: number,
  onCheckpoint: (iteration: number, total: number) => void
): Promise<string> {
  const base = `${password}:${salt}`;
  let current = base;
  const total = Math.max(1, iterations);
  const checkpoints = new Set<number>([
    1,
    Math.floor(total * 0.25),
    Math.floor(total * 0.5),
    Math.floor(total * 0.75),
    total
  ]);
  for (let i = 1; i <= total; i += 1) {
    current = await hashOnce(algorithm, current);
    if (checkpoints.has(i)) {
      onCheckpoint(i, total);
    }
  }
  return current;
}

function formatStorageRecord(algorithm: AlgorithmKey, iterations: number, salt: string, hash: string): string {
  const safeSalt = salt || "";
  const safeIterations = Number.isFinite(iterations) && iterations > 0 ? iterations : 1;
  return `${algorithm}$${safeIterations}$${safeSalt}$${hash}`;
}

function classifySeverity(iterations: number, algorithm: AlgorithmKey): EventSeverity {
  if (algorithm === "SHA-1") {
    return "strong";
  }
  if (iterations < 1000) {
    return "strong";
  }
  if (iterations < 10000) {
    return "info";
  }
  return "neutral";
}

const HashPlayground: React.FC = () => {
  const [activePhase, setActivePhase] = useState<PhaseKey>("fundamentals");
  const [password, setPassword] = useState<string>("");
  const [salt, setSalt] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>("SHA-256");
  const [iterations, setIterations] = useState<number>(10000);
  const [hashOutput, setHashOutput] = useState<string>("");
  const [storageRecord, setStorageRecord] = useState<string>("");
  const [attackerLines, setAttackerLines] = useState<AttackerLine[]>([
    {
      id: randomId("line"),
      text: "$ Waiting for defender configuration...",
      tone: "muted"
    }
  ]);
  const [events, setEvents] = useState<EventEntry[]>([]);

  const currentPhase = useMemo(
    () => phases.find((p) => p.key === activePhase) ?? phases[0],
    [activePhase]
  );

  const currentAlgorithmMeta = useMemo(
    () => algorithms.find((a) => a.key === algorithm) ?? algorithms[0],
    [algorithm]
  );

  const addAttackerLine = useCallback((text: string, tone: AttackerLineTone = "default") => {
    setAttackerLines((prev) => [...prev, { id: randomId("line"), text, tone }]);
  }, []);

  const addEvent = useCallback((label: string, body: string, severity: EventSeverity) => {
    setEvents((prev) => [
      {
        id: randomId("event"),
        label,
        body,
        severity,
        timestamp: nowTimeString()
      },
      ...prev
    ]);
  }, []);

  const handlePhaseChange = useCallback(
    (phase: PhaseKey) => {
      setActivePhase(phase);
      addAttackerLine(`$ Observing defender behavior in phase: ${phases.find((p) => p.key === phase)?.label ?? phase}`, "muted");
      addEvent(
        "Phase changed",
        `Switched to ${phases.find((p) => p.key === phase)?.label ?? phase} phase.`,
        "info"
      );
    },
    [addAttackerLine, addEvent]
  );

  const handleGenerateHash = useCallback(async () => {
    if (!password) {
      addAttackerLine("$ Defender did not provide a password. No hash generated.", "warn");
      addEvent("Missing input", "Password is required to generate a hash.", "info");
      return;
    }
    if (!("crypto" in window) || !window.crypto.subtle) {
      addAttackerLine("$ Browser does not support Web Crypto API. Cannot compute hash.", "danger");
      addEvent("Environment limitation", "Web Crypto API is not available in this environment.", "strong");
      return;
    }
    const effectiveSalt = salt || "";
    const effectiveIterations = Number.isFinite(iterations) && iterations > 0 ? iterations : 1;
    addAttackerLine(
      `$ Defender configured ${algorithm} with ${effectiveIterations.toLocaleString()} iterations and salt length ${effectiveSalt.length}.`,
      "muted"
    );
    addEvent(
      "Hashing started",
      `Computing hash using ${algorithm} with ${effectiveIterations.toLocaleString()} iterations.`,
      "info"
    );
    const start = performance.now();
    const finalHash = await stretchHash(algorithm, password, effectiveSalt, effectiveIterations, (i, total) => {
      addAttackerLine(
        `$ Offline cracking cost checkpoint at iteration ${i.toLocaleString()} of ${total.toLocaleString()}.`,
        "muted"
      );
    });
    const end = performance.now();
    const durationMs = end - start;
    const record = formatStorageRecord(algorithm, effectiveIterations, effectiveSalt, finalHash);
    setHashOutput(finalHash);
    setStorageRecord(record);
    const severity = classifySeverity(effectiveIterations, algorithm);
    const durationLabel =
      durationMs < 50
        ? "Extremely cheap to compute. Attractive for attackers."
        : durationMs < 250
        ? "Moderate cost. Better than defaults, but still improvable."
        : "Noticeable cost. Stronger resistance to brute-force.";
    addAttackerLine(
      `$ Observed hash length ${finalHash.length} hex characters (${currentAlgorithmMeta.bitLength} bits).`,
      "default"
    );
    addAttackerLine(
      `$ Single hash computation took approximately ${durationMs.toFixed(1)} ms on this device.`,
      severity === "strong" ? "danger" : severity === "info" ? "warn" : "default"
    );
    addEvent(
      "Hash generated",
      `Hash computed in ${durationMs.toFixed(1)} ms. ${durationLabel}`,
      severity
    );
  }, [password, salt, iterations, algorithm, addAttackerLine, addEvent, currentAlgorithmMeta.bitLength]);

  const handleClear = useCallback(() => {
    setPassword("");
    setSalt("");
    setHashOutput("");
    setStorageRecord("");
    setIterations(10000);
    setAttackerLines([
      {
        id: randomId("line"),
        text: "$ State cleared. Waiting for new configuration...",
        tone: "muted"
      }
    ]);
    setEvents([]);
  }, []);

  const handleSample = useCallback(() => {
    const samplePassword = "Winter2026!";
    const sampleSalt = "user-1234-salt";
    const sampleIterations = 15000;
    setPassword(samplePassword);
    setSalt(sampleSalt);
    setIterations(sampleIterations);
    setAlgorithm("SHA-256");
    addAttackerLine(
      "$ Defender loaded a sample configuration: non-trivial password, per-user salt, and elevated iteration count.",
      "default"
    );
    addEvent(
      "Sample loaded",
      "Sample password, salt, and iteration count have been populated for exploration.",
      "info"
    );
  }, [addAttackerLine, addEvent]);

  const handleIterationsChange = useCallback(
    (value: string) => {
      const parsed = parseInt(value, 10);
      if (Number.isNaN(parsed)) {
        setIterations(0);
        return;
      }
      const clamped = Math.max(1, Math.min(500000, parsed));
      setIterations(clamped);
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-900 bg-slate-950/80 p-4 shadow-2xl shadow-black/70">
      

      <nav className="flex gap-2 border-b border-slate-900 pb-1">
        {phases.map((phase) => (
          <button
            key={phase.key}
            type="button"
            onClick={() => handlePhaseChange(phase.key)}
            className={[
              "flex-1 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
              activePhase === phase.key
                ? "border-indigo-400/80 bg-gradient-to-r from-indigo-600/70 to-sky-500/60 text-slate-50 shadow-lg shadow-indigo-900/60"
                : "border-transparent bg-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-100"
            ].join(" ")}
          >
            {phase.label}
          </button>
        ))}
      </nav>

      <section className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-900 bg-slate-950/80 p-3 md:grid-cols-[2.1fr,1.9fr,1.6fr]">
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-900 bg-slate-950/90 p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Attacker
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              External perspective
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-slate-950 bg-gradient-to-b from-slate-950 to-slate-950/90">
            <div className="h-64 overflow-y-auto px-3 py-2 font-mono text-[11px] text-slate-100">
              {attackerLines.map((line) => (
                <div
                  key={line.id}
                  className={[
                    "whitespace-pre-wrap leading-relaxed",
                    line.tone === "muted"
                      ? "text-slate-500"
                      : line.tone === "warn"
                      ? "text-amber-300"
                      : line.tone === "danger"
                      ? "text-rose-300"
                      : "text-slate-100"
                  ].join(" ")}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-slate-900 bg-slate-950/90 p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Defender
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              Configuration surface
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a candidate password"
                  className="w-full rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Salt
                </label>
                <input
                  type="text"
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="Optional per-user salt"
                  className="w-full rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Algorithm
                </label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as AlgorithmKey)}
                  className="w-full rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                >
                  {algorithms.map((algo) => (
                    <option key={algo.key} value={algo.key}>
                      {algo.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Iterations
                </label>
                <input
                  type="number"
                  min={1}
                  max={500000}
                  value={iterations}
                  onChange={(e) => handleIterationsChange(e.target.value)}
                  className="w-full rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                />
                <div className="text-[10px] text-slate-500">
                  Current cost: {iterations.toLocaleString()} iterations of {algorithm}.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleGenerateHash}
                className="rounded-full border border-indigo-400/80 bg-gradient-to-r from-indigo-600/80 to-sky-500/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-50 shadow-md shadow-indigo-900/70 transition hover:shadow-lg hover:shadow-indigo-900"
              >
                Generate Hash
              </button>
              <button
                type="button"
                onClick={handleSample}
                className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
              >
                Load Sample
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:border-rose-500/70 hover:bg-rose-950/40 hover:text-rose-200"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-slate-900 bg-slate-950/90 p-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Hash Output ({currentAlgorithmMeta.bitLength}-bit)
              </div>
              <textarea
                value={hashOutput}
                readOnly
                placeholder="Hash will appear here once generated."
                className="h-20 w-full resize-none rounded-lg border border-slate-900 bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-100 outline-none ring-0"
              />
              <div className="text-[10px] text-slate-500">
                Length: {hashOutput ? `${hashOutput.length} hex characters` : "–"}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-slate-900 bg-slate-950/90 p-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Storage Model
                </div>
                <div className="rounded-full border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
                  algo$iterations$salt$hash
                </div>
              </div>
              <div className="rounded-lg border border-slate-900 bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-100">
                {storageRecord || "Record will appear here once a hash is generated."}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-slate-900 bg-slate-950/90 p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Recent Events
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              Timeline
            </div>
          </div>
          <div className="h-64 overflow-y-auto space-y-2">
            {events.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950/80 px-2.5 py-2 text-[11px] text-slate-500">
                Hashing activity, configuration changes, and risk signals will appear here as you interact with the lab.
              </div>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-slate-950 px-2.5 py-2"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <div className="font-semibold uppercase tracking-[0.18em]">
                    {event.label}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">{event.timestamp}</span>
                    <span
                      className={[
                        "rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]",
                        event.severity === "strong"
                          ? "border-rose-500/80 bg-rose-950/40 text-rose-200"
                          : event.severity === "info"
                          ? "border-sky-500/80 bg-sky-950/40 text-sky-200"
                          : "border-slate-700 bg-slate-900/80 text-slate-300"
                      ].join(" ")}
                    >
                      {event.severity === "strong"
                        ? "High Impact"
                        : event.severity === "info"
                        ? "Info"
                        : "Event"}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-100">
                  {event.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-900 bg-slate-950/90 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            {currentPhase.label}
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              {currentPhase.badge}
            </span>
          </div>
        </div>
        <div className="mb-2 text-sm font-medium text-slate-100">
          {currentPhase.headline}
        </div>
        <p className="mb-3 text-[13px] leading-relaxed text-slate-300">
          {currentPhase.description}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-xl border border-slate-900 bg-slate-950/90 p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Attacker perspective
            </div>
            <div className="text-[12px] text-slate-200">
              {currentPhase.attackerFocus}
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-slate-900 bg-slate-950/90 p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Defender objective
            </div>
            <div className="text-[12px] text-slate-200">
              {currentPhase.defenderFocus}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            What you might observe
          </div>
          <ul className="ml-4 space-y-1 text-[12px] text-slate-200">
            {currentPhase.observations.map((obs) => (
              <li key={obs}>{obs}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

const LayoutComponent = Layout as React.ComponentType<{
  children: React.ReactNode;
  title?: string;
  description?: string;
}>;

const HashPlaygroundPage: React.FC = () => {
  return (
    <LayoutComponent title="Password Hashing Lab" description="Explore hashing algorithms, salts, and secure password storage.">
      <div className="container margin-vert--lg">
        <HashPlayground />
      </div>
    </LayoutComponent>
  );
};

export default HashPlaygroundPage;
