import React, { useState, useMemo } from "react";
import Layout from "@theme/Layout";


type Mode = "hash" | "encode";

type HashAlgorithm = "SHA-256" | "SHA-1" | "SHA-384" | "SHA-512" | "MD5";
type EncodingAlgorithm = "Base64" | "Hex" | "URL";

interface HistoryItem {
  id: string;
  mode: Mode;
  algorithm: string;
  input: string;
  output: string;
  timestamp: string;
}

const hashAlgorithms: HashAlgorithm[] = [
  "SHA-256",
  "SHA-1",
  "SHA-384",
  "SHA-512",
  "MD5",
];

const encodingAlgorithms: EncodingAlgorithm[] = ["Base64", "Hex", "URL"];

function formatTimestamp(date = new Date()): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

async function computeHash(algorithm: HashAlgorithm, input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  if (algorithm === "MD5") {
    // Lightweight MD5 fallback (not cryptographically secure, for lab/demo only)
    const { default: SparkMD5 } = await import("spark-md5");
    return SparkMD5.hash(input);
  }

  const subtleAlgo =
    algorithm === "SHA-1"
      ? "SHA-1"
      : algorithm === "SHA-384"
      ? "SHA-384"
      : algorithm === "SHA-512"
      ? "SHA-512"
      : "SHA-256";

  const digest = await crypto.subtle.digest(subtleAlgo, data);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function encodeValue(algorithm: EncodingAlgorithm, input: string): string {
  if (!input) return "";

  switch (algorithm) {
    case "Base64": {
      if (typeof window === "undefined") return "";
      return btoa(unescape(encodeURIComponent(input)));
    }
    case "Hex": {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(input);
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    case "URL": {
      return encodeURIComponent(input);
    }
    default:
      return "";
  }
}

const UltraHashingPlayground: React.FC = () => {
  const [mode, setMode] = useState<Mode>("hash");
  const [hashAlgo, setHashAlgo] = useState<HashAlgorithm>("SHA-256");
  const [encodingAlgo, setEncodingAlgo] = useState<EncodingAlgorithm>("Base64");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const activeAlgorithmLabel = useMemo(
    () => (mode === "hash" ? hashAlgo : encodingAlgo),
    [mode, hashAlgo, encodingAlgo]
  );

  const handleRun = async () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    setIsProcessing(true);
    try {
      let result = "";

      if (mode === "hash") {
        result = await computeHash(hashAlgo, input);
      } else {
        result = encodeValue(encodingAlgo, input);
      }

      setOutput(result);

      const item: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        mode,
        algorithm: activeAlgorithmLabel,
        input,
        output: result,
        timestamp: formatTimestamp(),
      };

      setHistory((prev) => [item, ...prev].slice(0, 20));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleHistoryClick = (item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    if (item.mode === "hash") {
      setMode("hash");
      setHashAlgo(item.algorithm as HashAlgorithm);
    } else {
      setMode("encode");
      setEncodingAlgo(item.algorithm as EncodingAlgorithm);
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/80 p-6 shadow-[0_0_80px_rgba(15,23,42,0.9)] ring-1 ring-cyan-500/20 backdrop-blur">
      {/* Glow / brand accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)]" />

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
            CyberTrace Ultra Lab
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-50">
            Ultra Hashing &amp; Encoding Playground
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Experiment with modern hashing and encoding schemes in a safe, visual lab. Great for demos,
            teaching, and quick sanity checks during investigations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <span className="font-mono uppercase tracking-[0.18em] text-emerald-300/90">
            Live
          </span>
        </div>
      </div>

      {/* Mode + algorithm row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 p-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("hash")}
            className={`rounded-full px-3 py-1.5 font-medium transition ${
              mode === "hash"
                ? "bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            Hashing
          </button>
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`rounded-full px-3 py-1.5 font-medium transition ${
              mode === "encode"
                ? "bg-indigo-500 text-slate-950 shadow-[0_0_18px_rgba(129,140,248,0.7)]"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            Encoding
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
            <span className="text-slate-400">Active:</span>
            <span className="font-mono text-cyan-300">{activeAlgorithmLabel}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-slate-400">Client‑side only · No data leaves this page</span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Left: input/output */}
        <div className="flex flex-col gap-4">
          {/* Algorithm selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {mode === "hash" ? "Hash algorithm" : "Encoding scheme"}
              </span>
              <span className="mt-1 text-sm text-slate-200">
                Choose the algorithm you want to apply to the input.
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(mode === "hash" ? hashAlgorithms : encodingAlgorithms).map((algo) => {
                const isActive =
                  mode === "hash"
                    ? algo === hashAlgo
                    : algo === encodingAlgo;

                return (
                  <button
                    key={algo}
                    type="button"
                    onClick={() =>
                      mode === "hash"
                        ? setHashAlgo(algo as HashAlgorithm)
                        : setEncodingAlgo(algo as EncodingAlgorithm)
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
                        : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-200"
                    }`}
                  >
                    {algo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input / output panels */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Input */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Input
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-cyan-300"
                >
                  Clear
                </button>
              </div>
              <textarea
                className="min-h-[160px] flex-1 resize-none rounded-lg border border-slate-800 bg-slate-950/90 p-3 text-sm text-slate-100 outline-none ring-0 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/60"
                placeholder={
                  mode === "hash"
                    ? "Paste or type the value you want to hash..."
                    : "Paste or type the value you want to encode..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <p className="mt-2 text-[11px] text-slate-500">
                Tip: Use this to show how the same input produces different outputs across algorithms.
              </p>
            </div>

            {/* Output */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Output
                  </span>
                </div>
                <button
                  type="button"
                  disabled={!output}
                  onClick={() => {
                    if (!output) return;
                    navigator.clipboard?.writeText(output);
                  }}
                  className="text-xs text-slate-400 hover:text-emerald-300 disabled:cursor-not-allowed disabled:text-slate-600"
                >
                  Copy
                </button>
              </div>
              <pre className="min-h-[160px] flex-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/90 p-3 text-[11px] leading-relaxed text-emerald-200">
                {output || (
                  <span className="text-slate-500">
                    Run the lab to see the transformed output here.
                  </span>
                )}
              </pre>
              <p className="mt-2 text-[11px] text-slate-500">
                {mode === "hash"
                  ? "Hashes are one‑way: you can’t reverse them back to the original input."
                  : "Encodings are reversible: they’re for representation, not security."}
              </p>
            </div>
          </div>

          {/* Run button */}
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              All operations run in your browser. Great for live demos without leaking sample data.
            </div>
            <button
              type="button"
              onClick={handleRun}
              disabled={isProcessing || !input.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.8)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                  Running…
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Run lab
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: history / explainer */}
        <div className="flex flex-col gap-4">
          {/* History */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Recent runs
                </span>
              </div>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-[11px] text-slate-400 hover:text-rose-300"
                >
                  Clear history
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                Your last 20 runs will appear here. Use this to compare algorithms side‑by‑side during
                walkthroughs.
              </p>
            ) : (
              <div className="flex max-h-[260px] flex-col gap-2 overflow-y-auto pr-1 text-[11px]">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleHistoryClick(item)}
                    className="group flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-2 text-left transition hover:border-cyan-500/70 hover:bg-slate-900/80"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-2 py-0.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.mode === "hash" ? "bg-cyan-400" : "bg-indigo-400"
                          }`}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300">
                          {item.mode === "hash" ? "Hash" : "Encode"} · {item.algorithm}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        {item.timestamp}
                      </span>
                    </div>
                    <div className="line-clamp-1 font-mono text-[10px] text-slate-400">
                      in: <span className="text-slate-300">{item.input}</span>
                    </div>
                    <div className="line-clamp-1 font-mono text-[10px] text-emerald-300 group-hover:text-emerald-200">
                      out: <span>{item.output}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Explainer / teaching card */}
          <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/90 p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-cyan-300">
                
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Teaching notes
              </span>
            </div>
            <ul className="ml-4 list-disc space-y-1 text-[11px] text-slate-400">
              <li>
                <span className="text-slate-300">Hashing:</span> one‑way, fixed‑length output. Great for
                integrity checks and password storage (with salts and slow KDFs).
              </li>
              <li>
                <span className="text-slate-300">Encoding:</span> reversible representation. Use it for
                transport and formatting, not security.
              </li>
              <li>
                Show how the same input looks across SHA‑256 vs SHA‑1 vs MD5, and why modern suites prefer
                SHA‑2+.
              </li>
              <li>
                Pair this lab with logs or packet captures in other CyberTrace labs to show where hashes and
                encodings appear in the wild.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HashPlaygroundPage() {
  return (
    <Layout>
      <main className="bg-slate-950/95 py-10 text-slate-50 min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">

        

          <UltraHashingPlayground />

        </div>
      </main>
    </Layout>
  );
}
