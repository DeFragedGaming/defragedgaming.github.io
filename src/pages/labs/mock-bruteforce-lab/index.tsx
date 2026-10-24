import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import "./bruteforceLab.css";

type ObjectiveId =
  | "alert"
  | "logs"
  | "source"
  | "account"
  | "classify"
  | "flag"
  | "block"
  | "mfa"
  | "report";

type TerminalEntry = {
  kind: "system" | "command" | "output" | "success" | "error";
  text: string;
};

type Objective = {
  id: ObjectiveId;
  title: string;
  detail: string;
  command: string;
};

const objectives: Objective[] = [
  { id: "alert", title: "Review the alert queue", detail: "Find the active authentication incident.", command: "alerts" },
  { id: "logs", title: "Inspect the evidence", detail: "Load the event records for the incident.", command: "logs auth-204" },
  { id: "source", title: "Investigate the source", detail: "Correlate failures by source address.", command: "analyze source 198.51.100.24" },
  { id: "account", title: "Correlate account activity", detail: "Check the account with a successful login.", command: "analyze user j.smith" },
  { id: "classify", title: "Classify the activity", detail: "Identify the authentication attack pattern.", command: "classify password-spray" },
  { id: "flag", title: "Flag the affected account", detail: "Mark the account for immediate review.", command: "flag j.smith" },
  { id: "block", title: "Contain the source", detail: "Simulate a temporary block for the suspicious source.", command: "block 198.51.100.24" },
  { id: "mfa", title: "Harden the account", detail: "Require an additional verification factor.", command: "mfa j.smith" },
  { id: "report", title: "Close the investigation", detail: "Generate the incident summary.", command: "report auth-204" },
];

const initialTranscript: TerminalEntry[] = [
  { kind: "system", text: "CYBERTRACE SOC // TRAINING CONSOLE" },
  { kind: "system", text: "Incident AUTH-204 is waiting for analyst review." },
  { kind: "system", text: "Type help to see available commands. All data is fictional and local to this exercise." },
];

const simulatedLogs = [
  "09:41:08Z  AUTH_FAIL  src=198.51.100.24  user=j.smith",
  "09:41:13Z  AUTH_FAIL  src=198.51.100.24  user=m.chen",
  "09:41:19Z  AUTH_FAIL  src=198.51.100.24  user=a.patel",
  "09:41:25Z  AUTH_FAIL  src=198.51.100.24  user=r.jones",
  "09:41:31Z  AUTH_FAIL  src=198.51.100.24  user=t.wilson",
  "09:41:38Z  AUTH_FAIL  src=198.51.100.24  user=j.smith",
  "09:41:44Z  AUTH_FAIL  src=198.51.100.24  user=m.chen",
  "09:41:50Z  AUTH_FAIL  src=198.51.100.24  user=a.patel",
  "09:42:02Z  AUTH_OK    src=203.0.113.17   user=j.smith",
  "09:42:11Z  AUTH_FAIL  src=198.51.100.24  user=r.jones",
];

const objectiveIds = objectives.map(({ id }) => id);

export default function BruteforceLab() {
  const [completed, setCompleted] = useState<ObjectiveId[]>([]);
  const [transcript, setTranscript] = useState<TerminalEntry[]>(initialTranscript);
  const [command, setCommand] = useState("");
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentObjective = objectives.find(({ id }) => !completed.includes(id));

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [transcript]);

  function addEntries(entries: TerminalEntry[]) {
    setTranscript((current) => [...current, ...entries]);
  }

  function completeObjective(id: ObjectiveId, message: string) {
    setCompleted((current) => (current.includes(id) ? current : [...current, id]));
    addEntries([{ kind: "success", text: `✓ ${message}` }]);
  }

  function processCommand(rawCommand: string) {
    const input = rawCommand.trim().replace(/\s+/g, " ");
    if (!input) return;

    const normalized = input.toLowerCase();
    const entries: TerminalEntry[] = [{ kind: "command", text: input }];
    const addOutput = (text: string, kind: TerminalEntry["kind"] = "output") => {
      entries.push({ kind, text });
    };
    const isDone = (id: ObjectiveId) => completed.includes(id);
    const sourceAnalyzed = isDone("source");
    const accountAnalyzed = isDone("account");
    const isClassified = isDone("classify");
    const isFlagged = isDone("flag");

    if (normalized === "help") {
      addOutput("AVAILABLE COMMANDS");
      addOutput("  alerts                         List active SOC alerts");
      addOutput("  logs auth-204                  View incident authentication events");
      addOutput("  analyze source <address>       Summarize activity from a source");
      addOutput("  analyze user <username>        Review an account's login activity");
      addOutput("  classify password-spray        Record your incident classification");
      addOutput("  flag <username>                Flag an account for review");
      addOutput("  block <address>                Simulate a temporary source block");
      addOutput("  mfa <username>                 Require MFA for an account");
      addOutput("  report auth-204                Generate the incident report");
      addOutput("  clear                          Clear terminal output");
    } else if (normalized === "clear") {
      setTranscript([]);
      return;
    } else if (normalized === "alerts") {
      if (isDone("alert")) {
        addOutput("AUTH-204  HIGH  Unusual authentication failures  STATUS: INVESTIGATING");
        addOutput("Source 198.51.100.24 generated repeated failures across several accounts.");
      } else {
        completeObjective("alert", "Alert AUTH-204 opened.");
        addOutput("AUTH-204  HIGH  Unusual authentication failures  STATUS: OPEN");
        addOutput("Review the incident event records next: logs auth-204");
      }
    } else if (normalized === "logs auth-204") {
      if (!isDone("alert")) {
        addOutput("Open the incident first with: alerts", "error");
      } else if (!isDone("logs")) {
        completeObjective("logs", "10 authentication events loaded.");
        entries.push(...simulatedLogs.map((line) => ({ kind: "output" as const, text: line })));
        addOutput("Look for repeated failures by source and any successful login.");
      } else {
        entries.push(...simulatedLogs.map((line) => ({ kind: "output" as const, text: line })));
      }
    } else if (normalized.startsWith("analyze source ")) {
      const address = input.slice("analyze source ".length);
      if (!isDone("logs")) {
        addOutput("Load incident records first: logs auth-204", "error");
      } else if (address !== "198.51.100.24") {
        addOutput("No matching source in AUTH-204. Check the event log and try again.", "error");
      } else if (!sourceAnalyzed) {
        completeObjective("source", "Source analysis complete.");
        addOutput("198.51.100.24  |  9 failed attempts  |  5 distinct accounts  |  63 seconds");
        addOutput("Pattern: low-volume attempts distributed across multiple accounts.");
        addOutput("Next, check the account with a successful login: analyze user j.smith");
      } else {
        addOutput("198.51.100.24  |  9 failed attempts  |  5 distinct accounts  |  63 seconds");
      }
    } else if (normalized.startsWith("analyze user ")) {
      const username = input.slice("analyze user ".length);
      if (!sourceAnalyzed) {
        addOutput("Analyze the repeated source first: analyze source 198.51.100.24", "error");
      } else if (username !== "j.smith") {
        addOutput("No successful login requiring correlation found for that account.", "error");
      } else if (!accountAnalyzed) {
        completeObjective("account", "Account activity correlated.");
        addOutput("j.smith  |  2 failures from 198.51.100.24");
        addOutput("09:42:02Z  AUTH_OK  src=203.0.113.17  device=unrecognized");
        addOutput("Successful login came from a different source and an unrecognized device.");
        addOutput("Treat this as suspicious and continue investigating; do not assume it is confirmed compromise.");
      } else {
        addOutput("j.smith  |  successful login from 203.0.113.17  |  device=unrecognized");
      }
    } else if (normalized === "classify password-spray") {
      if (!sourceAnalyzed || !accountAnalyzed) {
        addOutput("Review both source and account activity before classifying the incident.", "error");
      } else if (!isClassified) {
        completeObjective("classify", "Incident classified as password spraying.");
        addOutput("Classification recorded: PASSWORD SPRAYING (confidence: high).");
        addOutput("Next: flag the suspiciously accessed account with flag j.smith");
      } else {
        addOutput("Incident classification is already recorded as PASSWORD SPRAYING.");
      }
    } else if (normalized.startsWith("flag ")) {
      const username = input.slice("flag ".length);
      if (!isClassified) {
        addOutput("Classify the observed activity before flagging an account.", "error");
      } else if (username !== "j.smith") {
        addOutput("The account needing immediate review is j.smith, due to its unrecognized-device success.", "error");
      } else if (!isFlagged) {
        completeObjective("flag", "j.smith flagged for urgent review.");
        addOutput("Account j.smith marked for identity verification and session review.");
        addOutput("Contain the repeated source next: block 198.51.100.24");
      } else {
        addOutput("Account j.smith is already flagged for review.");
      }
    } else if (normalized.startsWith("block ")) {
      const address = input.slice("block ".length);
      if (!isFlagged) {
        addOutput("Flag the account and verify the activity before containment.", "error");
      } else if (address !== "198.51.100.24") {
        addOutput("That source is not associated with the repeated failures in this incident.", "error");
      } else if (!isDone("block")) {
        completeObjective("block", "Temporary source block simulated.");
        addOutput("Policy applied in simulation: 198.51.100.24 temporarily blocked.");
        addOutput("Harden the flagged account next: mfa j.smith");
      } else {
        addOutput("198.51.100.24 is already temporarily blocked in this simulation.");
      }
    } else if (normalized.startsWith("mfa ")) {
      const username = input.slice("mfa ".length);
      if (!isDone("block")) {
        addOutput("Contain the repeated source before updating account protections.", "error");
      } else if (username !== "j.smith") {
        addOutput("Use the account identified during investigation: mfa j.smith", "error");
      } else if (!isDone("mfa")) {
        completeObjective("mfa", "MFA requirement simulated for j.smith.");
        addOutput("Account policy updated in simulation: MFA required for j.smith.");
        addOutput("Review your work and close the case: report auth-204");
      } else {
        addOutput("MFA is already required for j.smith in this simulation.");
      }
    } else if (normalized === "report auth-204") {
      if (!isDone("mfa")) {
        addOutput("Complete the investigation, containment, and account hardening objectives first.", "error");
      } else if (!finished) {
        completeObjective("report", "Incident report generated.");
        addOutput("AUTH-204  |  PASSWORD SPRAYING  |  CONTAINED");
        addOutput("Source 198.51.100.24 temporarily blocked; j.smith flagged and MFA required.");
        addOutput("Successful login from 203.0.113.17 remains under investigation.");
        addOutput("Case closed for this exercise. Review the debrief below.");
        setFinished(true);
      } else {
        addOutput("Incident report already generated. Reset the lab to run it again.");
      }
    } else {
      addOutput(`Command not recognized: ${input}`, "error");
      addOutput("Type help for supported SOC commands, or use the suggested command shown for your current objective.");
    }

    addEntries(entries);
    setHistory((current) => [...current, input]);
    setHistoryIndex(-1);
    setCommand("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    processCommand(command);
  }

  function handleTerminalKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length) {
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setCommand(history[nextIndex]);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex >= 0) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex < history.length ? nextIndex : -1);
        setCommand(nextIndex < history.length ? history[nextIndex] : "");
      }
    }
  }

  function resetLab() {
    setCompleted([]);
    setTranscript(initialTranscript);
    setCommand("");
    setFinished(false);
    setHistory([]);
    setHistoryIndex(-1);
    inputRef.current?.focus();
  }

  return (
    <Layout
      title="Authentication Attack Investigation"
      description="A multi-step SOC investigation lab using a simulated analyst terminal and fictional authentication logs."
    >
      <main className="brute-lab">
        <div className="brute-lab__container">
          <header className="brute-hero">
            <div className="brute-hero__copy">
              <span className="brute-eyebrow">CYBERTRACE LABS / BLUE TEAM</span>
              <h1>Authentication Attack Investigation</h1>
              <p>
                You’re on shift when an authentication alert lands in the SOC queue.
                Investigate the activity, identify the pattern, and contain the risk
                using the analyst terminal.
              </p>
            </div>
            <div className="brute-hero__status">
              <span className="brute-status-dot" />
              SIMULATED INCIDENT
            </div>
          </header>

          <div className="brute-scenario-bar">
            <div><span>CASE</span><strong>AUTH-204</strong></div>
            <div><span>SEVERITY</span><strong className="brute-severity-text">HIGH</strong></div>
            <div><span>ENVIRONMENT</span><strong>IDENTITY / SSO</strong></div>
            <div><span>OBJECTIVES</span><strong>{completed.length} / {objectives.length}</strong></div>
          </div>

          <div className="brute-workspace">
            <section className="brute-panel brute-terminal-panel" aria-labelledby="terminal-title">
              <div className="brute-panel__header">
                <div>
                  <span className="brute-eyebrow">ANALYST WORKSTATION</span>
                  <h2 id="terminal-title">SOC investigation terminal</h2>
                </div>
                <span className="brute-terminal-status"><span />CONNECTED</span>
              </div>

              <div
                className="brute-terminal"
                ref={terminalRef}
                role="log"
                aria-label="SOC terminal output"
                aria-live="polite"
              >
                {transcript.map((entry, index) => (
                  <div className={`brute-terminal__line brute-terminal__line--${entry.kind}`} key={`${index}-${entry.text}`}>
                    {entry.kind === "command" && <span className="brute-terminal__prompt">soc@cybertrace:~$ </span>}
                    {entry.kind !== "command" && entry.kind !== "system" && <span className="brute-terminal__marker">{entry.kind === "error" ? "!" : entry.kind === "success" ? "✓" : "›"}</span>}
                    <span>{entry.text}</span>
                  </div>
                ))}
              </div>

              <form className="brute-terminal__form" onSubmit={handleSubmit}>
                <label className="brute-terminal__prompt" htmlFor="soc-command">soc@cybertrace:~$</label>
                <input
                  id="soc-command"
                  ref={inputRef}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  onKeyDown={handleTerminalKeyDown}
                  placeholder="Type a command…"
                  aria-label="Enter a SOC command"
                />
                <button type="submit" disabled={!command.trim()}>Run</button>
              </form>
              <div className="brute-terminal__hint">Enter to run · ↑ / ↓ command history · <button type="button" onClick={() => processCommand("help")}>show help</button></div>
            </section>

            <aside className="brute-panel brute-objectives" aria-labelledby="objectives-title">
              <div className="brute-panel__header">
                <div>
                  <span className="brute-eyebrow">INCIDENT WORKFLOW</span>
                  <h2 id="objectives-title">Investigation objectives</h2>
                </div>
                <span className="brute-count">{completed.length}/{objectiveIds.length}</span>
              </div>
              <div
                className="brute-progress-track"
                role="progressbar"
                aria-label="Investigation progress"
                aria-valuemin={0}
                aria-valuemax={objectiveIds.length}
                aria-valuenow={completed.length}
              >
                <span style={{ width: `${(completed.length / objectiveIds.length) * 100}%` }} />
              </div>
              <ol className="brute-objective-list">
                {objectives.map((objective, index) => {
                  const isComplete = completed.includes(objective.id);
                  const isCurrent = currentObjective?.id === objective.id;
                  return (
                    <li
                      key={objective.id}
                      className={`brute-objective${isComplete ? " brute-objective--complete" : ""}${isCurrent ? " brute-objective--current" : ""}`}
                    >
                      <span className="brute-objective__number">{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                      <span className="brute-objective__copy">
                        <strong>{objective.title}</strong>
                        <span>{objective.detail}</span>
                        {!isComplete && (
                          <code>{objective.command}</code>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </aside>
          </div>

          <section className="brute-panel brute-intel" aria-labelledby="intel-title">
            <div className="brute-panel__header">
              <div>
                <span className="brute-eyebrow">CASE FILE</span>
                <h2 id="intel-title">Incident briefing</h2>
              </div>
              <span className="brute-count">SIMULATED DATA</span>
            </div>
            <div className="brute-intel__grid">
              <div>
                <strong>What happened</strong>
                <p>Several accounts received failed logins from one source over a short window. A successful login for one of those accounts came from a separate, unrecognized device.</p>
              </div>
              <div>
                <strong>What you need to decide</strong>
                <p>Determine whether the failures share a pattern, identify which account needs review, then apply scoped containment and account protection.</p>
              </div>
              <div>
                <strong>Safety and scope</strong>
                <p>This is a fictional, client-side SOC exercise. Commands only query the built-in sample data or simulate defensive actions; nothing is sent over the network.</p>
              </div>
            </div>
          </section>

          {finished && (
            <section className="brute-debrief" role="status" aria-live="polite">
              <div>
                <span className="brute-eyebrow">INCIDENT DEBRIEF</span>
                <h2>Good work. The immediate risk is contained.</h2>
                <p>
                  The repeated failures across several accounts indicate password spraying.
                  You flagged j.smith after correlating a success from an unrecognized device,
                  temporarily blocked the source, and required MFA. In a real incident, continue
                  validating the login with the account owner, revoke suspicious sessions,
                  preserve logs, and follow your organization’s response process.
                </p>
              </div>
              <button type="button" className="brute-button brute-button--secondary" onClick={resetLab}>
                Run the scenario again
              </button>
            </section>
          )}

          <footer className="brute-footer">
            <span>TRAINING ENVIRONMENT</span>
            <span>Fictional logs · No network requests · No real credentials</span>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
