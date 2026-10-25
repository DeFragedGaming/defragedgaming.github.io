import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

type StepId = "case" | "headers" | "auth" | "links" | "verdict" | "quarantine" | "domain" | "report";
type Entry = { kind: "system" | "command" | "output" | "success" | "error"; text: string };

const steps: { id: StepId; title: string; command: string; detail: string }[] = [
  { id: "case", title: "Open the reported message", command: "case open MAIL-731", detail: "Review the report and message context." },
  { id: "headers", title: "Inspect message headers", command: "headers MAIL-731", detail: "Compare visible sender and reply-to details." },
  { id: "auth", title: "Check sender authentication", command: "auth MAIL-731", detail: "Review SPF, DKIM, and DMARC results." },
  { id: "links", title: "Inspect embedded links", command: "links MAIL-731", detail: "Inspect the link destination without opening it." },
  { id: "verdict", title: "Classify the message", command: "verdict MAIL-731 credential-phishing", detail: "Record the most likely message classification." },
  { id: "quarantine", title: "Contain the message", command: "quarantine MAIL-731", detail: "Quarantine the reported message." },
  { id: "domain", title: "Add a scoped block", command: "block-domain sender-lookalike.example.invalid", detail: "Simulate blocking the confirmed sender domain." },
  { id: "report", title: "Document the incident", command: "report MAIL-731", detail: "Generate the analyst handoff." },
];

const initialEntries: Entry[] = [
  { kind: "system", text: "CYBERTRACE EMAIL SECURITY // ANALYST CONSOLE" },
  { kind: "system", text: "Mailbox report MAIL-731 is awaiting triage." },
  { kind: "system", text: "Type help to list commands. This simulation is local; no message or URL is sent." },
];

const messageEvents = [
  "08:14:02Z  MAIL_RECEIVED   mailbox=alex.rivera@example.invalid",
  "08:14:03Z  SPAM_FILTER     score=medium  action=deliver",
  "08:17:41Z  USER_REPORTED   category=suspicious_email",
  "08:17:42Z  CASE_CREATED    id=MAIL-731   priority=medium",
];

const stepIds = steps.map(({ id }) => id);

export default function PhishingLab() {
  const [completed, setCompleted] = useState<StepId[]>([]);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [finished, setFinished] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentStep = steps.find(({ id }) => !completed.includes(id));

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [entries]);

  function addEntries(newEntries: Entry[]) {
    setEntries((current) => [...current, ...newEntries]);
  }

  function processCommand(raw: string) {
    const command = raw.trim().replace(/\s+/g, " ");
    if (!command) return;
    const normalized = command.toLowerCase();
    const output: Entry[] = [{ kind: "command", text: command }];
    const print = (text: string, kind: Entry["kind"] = "output") => output.push({ kind, text });
    const done = (id: StepId) => completed.includes(id);
    const complete = (id: StepId, text: string) => {
      setCompleted((current) => current.includes(id) ? current : [...current, id]);
      print(`✓ ${text}`, "success");
    };

    if (normalized === "help") {
      print("AVAILABLE CASE COMMANDS");
      print("  case open MAIL-731                         Open the reported email case");
      print("  headers MAIL-731                           Review sender and reply-to headers");
      print("  auth MAIL-731                              Inspect SPF, DKIM, and DMARC results");
      print("  links MAIL-731                             Safely inspect inert link indicators");
      print("  verdict MAIL-731 credential-phishing       Classify the message");
      print("  quarantine MAIL-731                        Quarantine the reported message");
      print("  block-domain sender-lookalike.example.invalid  Simulate a scoped domain block");
      print("  report MAIL-731                            Generate the incident report");
      print("  clear                                       Clear terminal output");
    } else if (normalized === "clear") {
      setEntries([]);
      return;
    } else if (normalized === "case open mail-731") {
      if (!done("case")) {
        complete("case", "Case MAIL-731 opened.");
        print("Reported by: Alex Rivera  |  mailbox: alex.rivera@example.invalid");
        print("Subject: Action required: shared benefits document");
        print("Report: I was not expecting this message. The button asks me to sign in again.");
        print("Review the message headers next: headers MAIL-731");
      } else {
        print("MAIL-731 is open and assigned to this analyst.");
      }
    } else if (normalized === "headers mail-731") {
      if (!done("case")) print("Open the case first: case open MAIL-731", "error");
      else if (!done("headers")) {
        complete("headers", "Message headers reviewed.");
        print("From: Benefits Desk <notices@sender-lookalike.example.invalid>");
        print("Reply-To: collect@sender-lookalike.example.invalid");
        print("To: Alex Rivera <alex.rivera@example.invalid>");
        print("Return-Path: bounce@mailer.sender-lookalike.example.invalid");
        print("Subject: Action required: shared benefits document");
        print("The display name claims to be Benefits Desk; the sender uses an unrelated domain.");
        print("Check domain authentication next: auth MAIL-731");
      } else {
        print("Header review already recorded. Sender and reply-to use sender-lookalike.example.invalid.");
      }
    } else if (normalized === "auth mail-731") {
      if (!done("headers")) print("Review the message headers first: headers MAIL-731", "error");
      else if (!done("auth")) {
        complete("auth", "Authentication results recorded.");
        print("SPF: FAIL  (sending host is not authorized for claimed domain)");
        print("DKIM: NONE (no valid signature)");
        print("DMARC: FAIL (alignment policy not satisfied)");
        print("Authentication failures support the sender mismatch; continue to link inspection.");
        print("Next: links MAIL-731");
      } else {
        print("SPF FAIL  |  DKIM NONE  |  DMARC FAIL");
      }
    } else if (normalized === "links mail-731") {
      if (!done("auth")) print("Review sender authentication before link analysis: auth MAIL-731", "error");
      else if (!done("links")) {
        complete("links", "Link indicators reviewed safely.");
        print("Visible button: Review shared document");
        print("Destination (inert text): hxxps://benefits-review.sender-lookalike.example.invalid/session");
        print("Host differs from the expected organization domain. No link was opened or requested.");
        print("Classify the message next: verdict MAIL-731 credential-phishing");
      } else {
        print("Link destination is recorded as an inert indicator; it has not been opened.");
      }
    } else if (normalized === "verdict mail-731 credential-phishing") {
      if (!done("links")) print("Complete header, authentication, and link review before assigning a verdict.", "error");
      else if (!done("verdict")) {
        complete("verdict", "Credential-phishing verdict recorded.");
        print("Classification: CREDENTIAL PHISHING  |  Confidence: HIGH");
        print("Rationale: sender mismatch, failed authentication, unexpected sign-in prompt, unrelated destination.");
        print("Contain the reported message: quarantine MAIL-731");
      } else print("MAIL-731 is classified as credential phishing.");
    } else if (normalized === "quarantine mail-731") {
      if (!done("verdict")) print("Record and justify a verdict before containment.", "error");
      else if (!done("quarantine")) {
        complete("quarantine", "Message quarantined in simulation.");
        print("MAIL-731 removed from the reporter's inbox; evidence retained for investigation.");
        print("Apply a scoped domain block: block-domain sender-lookalike.example.invalid");
      } else print("MAIL-731 is already quarantined; evidence remains preserved.");
    } else if (normalized === "block-domain sender-lookalike.example.invalid") {
      if (!done("quarantine")) print("Quarantine the reported message before applying a block.", "error");
      else if (!done("domain")) {
        complete("domain", "Scoped sender-domain block simulated.");
        print("Policy simulation: sender-lookalike.example.invalid added to the tenant block list.");
        print("Prepare the handoff: report MAIL-731");
      } else print("The sender domain is already blocked in this simulation.");
    } else if (normalized === "report mail-731") {
      if (!done("domain")) print("Complete investigation and containment before generating the report.", "error");
      else if (!finished) {
        complete("report", "Incident report generated.");
        print("MAIL-731 | CREDENTIAL PHISHING | CONTAINED");
        print("Evidence: sender/reply-to mismatch; SPF and DMARC fail; DKIM signature absent; inert destination is unrelated.");
        print("Actions: message quarantined, sender domain blocked in simulation, evidence retained.");
        print("Follow-up: notify the reporter, search for matching messages, review click/sign-in telemetry, and follow response policy.");
        setFinished(true);
      } else print("Report already generated. Reset the exercise to run it again.");
    } else {
      print(`Unknown command: ${command}`, "error");
      print("Type help to list the supported case commands.");
    }

    addEntries(output);
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    processCommand(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next < history.length ? next : -1);
      setInput(next < history.length ? history[next] : "");
    }
  }

  function reset() {
    setCompleted([]);
    setEntries(initialEntries);
    setInput("");
    setHistory([]);
    setHistoryIndex(-1);
    setFinished(false);
    inputRef.current?.focus();
  }

  return (
    <Layout
      title="Phishing Email Investigation"
      description="A simulated SOC email triage exercise covering message headers, sender authentication, safe link analysis, containment, and incident reporting."
    >
      <main className={styles.lab}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>CYBERTRACE LABS / EMAIL DEFENSE</span>
              <h1>Phishing Email Investigation</h1>
              <p>
                A user reports an unexpected benefits email asking them to sign in.
                Investigate the evidence, decide what happened, and take safe,
                proportionate response actions.
              </p>
            </div>
            <span className={styles.simulationBadge}><span /> SIMULATED CASE</span>
          </header>

          <section className={styles.caseBar} aria-label="Case summary">
            <div><span>CASE</span><strong>MAIL-731</strong></div>
            <div><span>PRIORITY</span><strong className={styles.priority}>MEDIUM</strong></div>
            <div><span>REPORTED BY</span><strong>Alex Rivera</strong></div>
            <div><span>OBJECTIVES</span><strong>{completed.length} / {steps.length}</strong></div>
          </section>

          <div className={styles.workspace}>
            <section className={styles.panel} aria-labelledby="message-title">
              <div className={styles.panelHeader}>
                <div><span className={styles.eyebrow}>REPORTED EMAIL</span><h2 id="message-title">Message preview</h2></div>
                <span className={styles.countBadge}>UNTRUSTED CONTENT</span>
              </div>
              <div className={styles.emailCard}>
                <div className={styles.emailSubject}>Action required: shared benefits document</div>
                <dl className={styles.emailMeta}>
                  <div><dt>From</dt><dd>“Benefits Desk” &lt;notices@sender-lookalike.example.invalid&gt;</dd></div>
                  <div><dt>To</dt><dd>Alex Rivera &lt;alex.rivera@example.invalid&gt;</dd></div>
                  <div><dt>Received</dt><dd>Today, 08:14 UTC</dd></div>
                </dl>
                <div className={styles.emailBody}>
                  <p>Hello Alex,</p>
                  <p>A benefits document has been shared with you. Sign in today to review the updated enrollment information.</p>
                  <div className={styles.fakeLinkButton}>Review shared document <span>Link not opened</span></div>
                  <p>If you have questions, reply to this message.</p>
                  <p>Benefits Desk</p>
                </div>
                <p className={styles.emailSafety}>This is a fictional sample. Its link is intentionally not clickable.</p>
              </div>
              <div className={styles.timeline}>
                <h3>Mailbox activity</h3>
                {messageEvents.map((event) => <code key={event}>{event}</code>)}
              </div>
            </section>

            <aside className={styles.panel} aria-labelledby="objectives-title">
              <div className={styles.panelHeader}>
                <div><span className={styles.eyebrow}>ANALYST WORKFLOW</span><h2 id="objectives-title">Case objectives</h2></div>
                <span className={styles.countBadge}>{completed.length}/{steps.length}</span>
              </div>
              <div className={styles.progressTrack} role="progressbar" aria-label="Investigation progress" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={completed.length}>
                <span style={{ width: `${(completed.length / steps.length) * 100}%` }} />
              </div>
              <ol className={styles.objectiveList}>
                {steps.map((step, index) => {
                  const isComplete = completed.includes(step.id);
                  const isCurrent = currentStep?.id === step.id;
                  return (
                    <li key={step.id} className={`${styles.objective}${isComplete ? ` ${styles.complete}` : ""}${isCurrent ? ` ${styles.current}` : ""}`}>
                      <span className={styles.objectiveNumber}>{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.objectiveCopy}>
                        <strong>{step.title}</strong><span>{step.detail}</span>
                        {!isComplete && <code>{step.command}</code>}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {currentStep && <div className={styles.nextHint}><strong>Suggested next action</strong><code>{currentStep.command}</code></div>}
            </aside>
          </div>

          <section className={`${styles.panel} ${styles.terminalPanel}`} aria-labelledby="terminal-title">
            <div className={styles.panelHeader}>
              <div><span className={styles.eyebrow}>LOCAL SIMULATION</span><h2 id="terminal-title">Email analysis console</h2></div>
              <span className={styles.connected}><span /> READY</span>
            </div>
            <div className={styles.terminal} ref={terminalRef} role="log" aria-label="Email analysis console output" aria-live="polite">
              {entries.map((entry, index) => (
                <div className={`${styles.terminalLine} ${styles[`line_${entry.kind}`]}`} key={`${index}-${entry.text}`}>
                  {entry.kind === "command" && <span className={styles.prompt}>analyst@mail-sec:~$ </span>}
                  {entry.kind !== "command" && entry.kind !== "system" && <span className={styles.marker}>{entry.kind === "error" ? "!" : entry.kind === "success" ? "✓" : "›"}</span>}
                  <span>{entry.text}</span>
                </div>
              ))}
            </div>
            <form className={styles.commandForm} onSubmit={submit}>
              <label className={styles.prompt} htmlFor="email-command">analyst@mail-sec:~$</label>
              <input id="email-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="Enter a case command…" aria-label="Enter an email analysis command" />
              <button type="submit" disabled={!input.trim()}>Run</button>
            </form>
            <p className={styles.terminalHint}>Enter to run · ↑ / ↓ command history · <button type="button" onClick={() => processCommand("help")}>show help</button></p>
          </section>

          <section className={styles.learningPanel} aria-labelledby="safe-analysis-title">
            <span className={styles.eyebrow}>SAFE ANALYSIS PRACTICE</span>
            <h2 id="safe-analysis-title">Analyze evidence without interacting with the lure</h2>
            <div className={styles.learningGrid}>
              <p><strong>Verify the sender</strong>Compare the visible name, sender domain, reply-to, and authentication results.</p>
              <p><strong>Keep links inert</strong>Record and inspect destinations with approved tools; don’t click unexpected links or enter credentials.</p>
              <p><strong>Contain and preserve</strong>Quarantine the message, retain evidence, and follow your organization’s reporting process.</p>
            </div>
          </section>

          {finished && (
            <section className={styles.debrief} role="status" aria-live="polite">
              <div>
                <span className={styles.eyebrow}>CASE HANDOFF</span>
                <h2>MAIL-731 triaged and contained</h2>
                <p>
                  You identified a credential-phishing lure using a mismatched sender,
                  failed SPF/DMARC checks, absent DKIM, and an unrelated sign-in destination.
                  The message was quarantined and a scoped domain block was simulated.
                  In a real incident, search for matching mail, review click and sign-in
                  telemetry, notify the reporter, preserve evidence, and follow local
                  response policy.
                </p>
              </div>
              <button type="button" className={styles.resetButton} onClick={reset}>Run again</button>
            </section>
          )}

          <footer className={styles.footer}>
            <span>DEFENSIVE TRAINING ONLY</span>
            <span>Fictional message · Reserved domains · No clickable links · No network requests</span>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
