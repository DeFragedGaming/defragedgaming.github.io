import React, { useState, useEffect, useRef } from "react";
import "./bruteforceLab.css";

export default function BruteforceLab() {
  const phases = [
    "Reconnaissance",
    "Probing",
    "Brute-Force",
    "Compromise",
    "Post-Login Behavior",
  ];

  const phaseTeaching = {
    Reconnaissance: {
      desc: "The attacker is mapping the login surface and gathering public metadata.",
      see: [
        "Unusual user-agent strings",
        "Repeated 404s from the same IP",
        "Requests to non-existent admin pages",
      ],
      defend: [
        "Enable rate limiting",
        "Use a WAF to block scanners",
        "Hide sensitive endpoints behind authentication",
      ],
    },
    Probing: {
      desc: "The attacker is testing endpoint behavior and response patterns.",
      see: [
        "Header anomalies",
        "Odd timing patterns",
        "Repeated OPTIONS/HEAD requests",
      ],
      defend: [
        "Tighten WAF rules",
        "Monitor timing anomalies",
        "Alert on repeated probing",
      ],
    },
    "Brute-Force": {
      desc: "The attacker is attempting credential combinations at scale.",
      see: [
        "Rapid login attempts",
        "Multiple failures from same IP",
        "Strange username patterns",
      ],
      defend: [
        "Enable account lockout",
        "Use MFA",
        "Throttle login attempts",
      ],
    },
    Compromise: {
      desc: "The attacker has gained access and is exploring the environment.",
      see: [
        "Unusual session creation",
        "Suspicious navigation patterns",
        "Privilege escalation attempts",
      ],
      defend: [
        "Terminate sessions",
        "Alert SOC",
        "Force password resets",
      ],
    },
    "Post-Login Behavior": {
      desc: "The attacker is performing actions inside the account.",
      see: [
        "Data exfil indicators",
        "Unusual API calls",
        "Bulk downloads",
      ],
      defend: [
        "Revoke tokens",
        "Block IP",
        "Begin incident response",
      ],
    },
  };

  // Realistic operator-style sequences (per phase)
  const reconSequence = [
    {
      cmd: `nmap -sV --reason login.ct-lab.local   # simulated service scan`,
      out: `scanned 1 host, service: nginx 1.18 (simulated)`,
    },
    {
      cmd: `nmap -Pn -sC api.ct-lab.local        # simulated script scan`,
      out: `3 default scripts executed (simulated)`,
    },
    {
      cmd: `whois ct-lab.local                   # simulated WHOIS lookup`,
      out: `registry data retrieved (simulated)`,
    },
    {
      cmd: `dig A ct-lab.local +trace            # simulated DNS trace`,
      out: `authoritative servers enumerated (simulated)`,
    },
    {
      cmd: `dig MX ct-lab.local                  # simulated MX query`,
      out: `mail.ct-lab.local found (simulated)`,
    },
  ];

  const probingSequence = [
    {
      cmd: `curl -I https://ct-lab.local/login   # simulated header check`,
      out: `HTTP/1.1 200 OK, server: nginx (simulated)`,
    },
    {
      cmd: `curl -X OPTIONS https://api.ct-lab.local/auth   # simulated CORS probe`,
      out: `Allow: GET, POST (simulated)`,
    },
    {
      cmd: `curl -A "ReconBot/1.0" https://ct-lab.local/    # simulated UA test`,
      out: `response size: 14.2kb (simulated)`,
    },
    {
      cmd: `curl -I https://ct-lab.local/admin   # simulated admin check`,
      out: `HTTP/1.1 404 Not Found (simulated)`,
    },
  ];

  const bruteSequence = [
    {
      cmd: `curl -X POST https://ct-lab.local/login -d "u=admin&p=Winter2024!"   # simulated attempt`,
      out: `login failed (simulated)`,
    },
    {
      cmd: `curl -X POST https://ct-lab.local/login -d "u=admin&p=Winter2025!"   # simulated attempt`,
      out: `login failed (simulated)`,
    },
    {
      cmd: `curl -X POST https://ct-lab.local/login -d "u=admin&p=Summer2024!"   # simulated attempt`,
      out: `login failed (simulated)`,
    },
    {
      cmd: `curl -X POST https://ct-lab.local/login -d "u=admin&p=Summer2025!"   # simulated attempt`,
      out: `login failed (simulated)`,
    },
  ];

  const compromiseSequence = [
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/account   # simulated session access`,
      out: `account overview loaded (simulated)`,
    },
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/profile   # simulated profile view`,
      out: `profile data retrieved (simulated)`,
    },
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/settings  # simulated settings access`,
      out: `settings page loaded (simulated)`,
    },
  ];

  const postSequence = [
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/export    # simulated data export`,
      out: `export job queued (simulated)`,
    },
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/download  # simulated bulk download`,
      out: `download stream started (simulated)`,
    },
    {
      cmd: `curl -b "session=simulated" https://ct-lab.local/api/logs  # simulated log access`,
      out: `log entries retrieved (simulated)`,
    },
  ];

  // SOC-style defender events per phase
  const defenderRecon = [
    `alert: unusual user-agent detected during surface scan`,
    `event: repeated 404s from same IP during recon`,
    `notice: scanner-like pattern on login endpoints`,
  ];

  const defenderProbing = [
    `event: abnormal OPTIONS/HEAD request pattern`,
    `notice: header anomalies detected on /login`,
    `signal: timing irregularities on auth endpoints`,
  ];

  const defenderBrute = [
    `alert: rapid login failures from single IP`,
    `signal: rate-limit threshold approaching on /login`,
    `event: suspicious username pattern detected`,
  ];

  const defenderCompromise = [
    `alert: unusual session creation from new device`,
    `event: navigation pattern inconsistent with user history`,
    `notice: privilege escalation attempt detected`,
  ];

  const defenderPost = [
    `alert: bulk download pattern detected`,
    `signal: unusual API call volume`,
    `event: potential data exfil indicators`,
  ];

  const defenderPhaseRisk = {
    Reconnaissance: 4,
    Probing: 6,
    "Brute-Force": 12,
    Compromise: 10,
    "Post-Login Behavior": 8,
  };

  const [activePhase, setActivePhase] = useState("Reconnaissance");

  // Per-phase step indexes (which command in the sequence)
  const [reconStep, setReconStep] = useState(0);
  const [probingStep, setProbingStep] = useState(0);
  const [bruteStep, setBruteStep] = useState(0);
  const [compromiseStep, setCompromiseStep] = useState(0);
  const [postStep, setPostStep] = useState(0);

  const [defReconStep, setDefReconStep] = useState(0);
  const [defProbingStep, setDefProbingStep] = useState(0);
  const [defBruteStep, setDefBruteStep] = useState(0);
  const [defCompromiseStep, setDefCompromiseStep] = useState(0);
  const [defPostStep, setDefPostStep] = useState(0);

  // Typing engine state
  const [typingStage, setTypingStage] = useState("command"); // "command" | "output"
  const [cmdTyped, setCmdTyped] = useState(0);
  const [outTyped, setOutTyped] = useState(0);

  const [attackerFeed, setAttackerFeed] = useState([]);
  const [defenderFeed, setDefenderFeed] = useState([]);
  const [defenderRisk, setDefenderRisk] = useState(0);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  const attackerRef = useRef(null);
  const defenderRef = useRef(null);

  function getSequenceForPhase(phase) {
    if (phase === "Reconnaissance") return reconSequence;
    if (phase === "Probing") return probingSequence;
    if (phase === "Brute-Force") return bruteSequence;
    if (phase === "Compromise") return compromiseSequence;
    return postSequence;
  }

  function getStepForPhase(phase) {
    if (phase === "Reconnaissance") return reconStep;
    if (phase === "Probing") return probingStep;
    if (phase === "Brute-Force") return bruteStep;
    if (phase === "Compromise") return compromiseStep;
    return postStep;
  }

  function setStepForPhase(phase, value) {
    if (phase === "Reconnaissance") return setReconStep(value);
    if (phase === "Probing") return setProbingStep(value);
    if (phase === "Brute-Force") return setBruteStep(value);
    if (phase === "Compromise") return setCompromiseStep(value);
    return setPostStep(value);
  }

  function getDefenderEventsForPhase(phase) {
    if (phase === "Reconnaissance") return defenderRecon;
    if (phase === "Probing") return defenderProbing;
    if (phase === "Brute-Force") return defenderBrute;
    if (phase === "Compromise") return defenderCompromise;
    return defenderPost;
  }

  function getDefStepForPhase(phase) {
    if (phase === "Reconnaissance") return defReconStep;
    if (phase === "Probing") return defProbingStep;
    if (phase === "Brute-Force") return defBruteStep;
    if (phase === "Compromise") return defCompromiseStep;
    return defPostStep;
  }

  function setDefStepForPhase(phase, value) {
    if (phase === "Reconnaissance") return setDefReconStep(value);
    if (phase === "Probing") return setDefProbingStep(value);
    if (phase === "Brute-Force") return setDefBruteStep(value);
    if (phase === "Compromise") return setDefCompromiseStep(value);
    return setDefPostStep(value);
  }

  function getNextPhase(current) {
    const idx = phases.indexOf(current);
    if (idx >= 0 && idx < phases.length - 1) {
      return phases[idx + 1];
    }
    return null;
  }

  function generateSummary(winnerSide) {
    if (winnerSide === "attacker") {
      return [
        "Attacker Victory — Credential Compromise Achieved",
        "Recon completed with low detection.",
        "Probing produced only minor anomalies.",
        "Defender risk stayed below threshold during brute-force.",
        "Brute-force and post-login actions completed before containment.",
        "Session takeover allowed post-login behavior (simulated).",
      ];
    }

    return [
      "Defender Victory — Attack Contained",
      "Recon triggered multiple detection rules.",
      "Probing produced abnormal header and timing patterns.",
      "WAF and rate-limit rules escalated risk quickly.",
      "Defender risk reached 100% before full compromise.",
      "Attack was blocked before post-login behavior could complete.",
    ];
  }

  function resetSimulation() {
    setRunning(false);
    setWinner(null);
    setActivePhase("Reconnaissance");

    setReconStep(0);
    setProbingStep(0);
    setBruteStep(0);
    setCompromiseStep(0);
    setPostStep(0);

    setDefReconStep(0);
    setDefProbingStep(0);
    setDefBruteStep(0);
    setDefCompromiseStep(0);
    setDefPostStep(0);

    setTypingStage("command");
    setCmdTyped(0);
    setOutTyped(0);

    setAttackerFeed([]);
    setDefenderFeed([]);
    setDefenderRisk(0);
  }

  // Defender win condition
  useEffect(() => {
    if (!winner && defenderRisk >= 100) {
      setWinner("defender");
      setRunning(false);
    }
  }, [defenderRisk, winner]);

  // Heavy hybrid typing engine
  useEffect(() => {
    if (!running || winner) return;

    const seq = getSequenceForPhase(activePhase);
    const step = getStepForPhase(activePhase);

    if (!seq || step >= seq.length) {
      return;
    }

    const { cmd, out } = seq[step];

    const interval = setInterval(() => {
      if (typingStage === "command") {
        if (cmdTyped < cmd.length) {
          setCmdTyped((v) => v + 1);
        } else {
          setTypingStage("output");
        }
      } else if (typingStage === "output") {
        if (outTyped < out.length) {
          setOutTyped((v) => v + 1);
        } else {
          // Command + output fully typed → commit to feed
          setAttackerFeed((prev) => [
            ...prev,
            `$ ${cmd}`,
            `→ ${out}`,
          ]);

          // Defender event + risk
          const defEvents = getDefenderEventsForPhase(activePhase);
          const defStep = getDefStepForPhase(activePhase);
          const defEvent =
            defEvents[defStep] || defEvents[defEvents.length - 1];

          setDefenderFeed((prev) => [...prev, defEvent]);
          setDefStepForPhase(
            activePhase,
            (defStep + 1) % defEvents.length
          );

          setDefenderRisk((prev) =>
            Math.min(100, prev + (defenderPhaseRisk[activePhase] || 0))
          );

          // Scroll terminals
          if (attackerRef.current) {
            attackerRef.current.scrollTop =
              attackerRef.current.scrollHeight;
          }
          if (defenderRef.current) {
            defenderRef.current.scrollTop =
              defenderRef.current.scrollHeight;
          }

          // Move to next step or next phase / win
          const nextStep = step + 1;
          if (nextStep < seq.length) {
            setStepForPhase(activePhase, nextStep);
            setTypingStage("command");
            setCmdTyped(0);
            setOutTyped(0);
          } else {
            // Phase completed
            if (activePhase === "Post-Login Behavior") {
              setWinner("attacker");
              setRunning(false);
            } else {
              const nextPhase = getNextPhase(activePhase);
              if (nextPhase) {
                setActivePhase(nextPhase);
                setStepForPhase(nextPhase, 0);
                setTypingStage("command");
                setCmdTyped(0);
                setOutTyped(0);
              }
            }
          }
        }
      }
    }, 60); // heavy hybrid feel

    return () => clearInterval(interval);
  }, [
    running,
    winner,
    activePhase,
    typingStage,
    cmdTyped,
    outTyped,
    reconStep,
    probingStep,
    bruteStep,
    compromiseStep,
    postStep,
  ]);

  // Derived attacker progress from step/sequence length
  const currentSeq = getSequenceForPhase(activePhase);
  const currentStep = getStepForPhase(activePhase);
  const attackerProgress =
    currentSeq && currentSeq.length > 0
      ? Math.min(100, (currentStep / currentSeq.length) * 100)
      : 0;

  // Current typing pair for display
  const currentPair =
    currentSeq && currentStep < currentSeq.length
      ? currentSeq[currentStep]
      : null;

  return (
    <div className="lab-container">
      <header className="lab-header">
        <div className="lab-title">Hybrid Brute-Force Simulator</div>
        <div className="lab-status">LIVE · Client-side only</div>
      </header>

      <div className="phase-tabs">
        {phases.map((p) => (
          <div
            key={p}
            className={`phase-tab ${activePhase === p ? "active" : ""}`}
          >
            {p}
          </div>
        ))}
      </div>

      <div className="workspace">
        <div className="terminal-panel attacker">
          <div className="panel-header">
            <span>Attacker</span>
            <div className="progress-bar">
              <div style={{ width: `${attackerProgress}%` }}></div>
            </div>
          </div>

          <div className="terminal-feed" ref={attackerRef}>
            {attackerFeed.map((line, i) => (
              <div key={i} className="terminal-line">
                {line}
              </div>
            ))}

            {currentPair && typingStage === "command" && (
              <div className="terminal-line">
                $ {currentPair.cmd.slice(0, cmdTyped)}
                <span className="cursor">▌</span>
              </div>
            )}

            {currentPair && typingStage === "output" && (
              <>
                <div className="terminal-line">
                  $ {currentPair.cmd}
                </div>
                <div className="terminal-line">
                  → {currentPair.out.slice(0, outTyped)}
                  <span className="cursor">▌</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="terminal-panel defender">
          <div className="panel-header">
            <span>Defender</span>
            <div className="progress-bar risk">
              <div style={{ width: `${defenderRisk}%` }}></div>
            </div>
          </div>

          <div className="terminal-feed" ref={defenderRef}>
            {defenderFeed.map((line, i) => (
              <div key={i} className="terminal-line">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="events-panel">
          <div className="events-title">Recent Events</div>
          <div className="events-body">
            {[...attackerFeed.slice(-10)].map((e, i) => (
              <div key={i} className="event-line">
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="teaching-panel">
        <h3>{activePhase}</h3>
        <p>{phaseTeaching[activePhase].desc}</p>

        <div className="teach-section">
          <strong>What you might see</strong>
          <ul>
            {phaseTeaching[activePhase].see.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="teach-section">
          <strong>How defenders respond</strong>
          <ul>
            {phaseTeaching[activePhase].defend.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running || !!winner}>
          Start Simulation
        </button>
        <button onClick={() => setRunning(false)} disabled={!running}>
          Pause
        </button>
        <button onClick={resetSimulation}>Reset</button>
      </div>

      {winner && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">
              {winner === "attacker" ? "Attacker Victory" : "Defender Victory"}
            </h2>

            <div className="modal-summary">
              {generateSummary(winner).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="modal-buttons">
              <button onClick={resetSimulation}>Run Again</button>
              <button onClick={() => setWinner(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}