import React, { useState } from "react";
import Layout from "@theme/Layout";

type PhaseNumber = 1 | 2 | 3 | 4 | 5;

type Tools = {
  attacker: string[];
  defender: string[];
};

const phaseTools: Record<PhaseNumber, Tools> = {
  1: {
    attacker: [
      "Nmap (network scanning and service discovery)",
      "Gobuster or similar tools (directory and endpoint enumeration)",
      "Custom HTTP scanners (homegrown or scripted reconnaissance)",
    ],
    defender: [
      "Web Application Firewall (WAF) for filtering suspicious requests",
      "Reverse proxy logs (e.g., Nginx, Apache) for HTTP visibility",
      "SIEM platforms (e.g., Splunk, Elastic Security) to correlate scan patterns",
    ],
  },
  2: {
    attacker: [
      "Burp Suite (manual probing and login form analysis)",
      "Selenium or headless browsers (automated form interaction)",
      "Custom scripts for username enumeration and response analysis",
    ],
    defender: [
      "Application logs (login endpoints, error messages, response codes)",
      "Identity providers (IdP) logs for authentication attempts",
      "SIEM rules to detect repeated failures from the same IP or user",
    ],
  },
  3: {
    attacker: [
      "Hydra or similar password guessing frameworks",
      "Burp Suite Intruder (high‑volume credential attempts)",
      "Distributed or rotating IP infrastructure (e.g., proxies, VPNs)",
    ],
    defender: [
      "Fail2Ban or similar tools for blocking abusive IPs",
      "IDS/IPS solutions to detect brute‑force patterns",
      "EDR/SIEM correlation rules for spikes in authentication failures",
    ],
  },
  4: {
    attacker: [
      "Credential stuffing frameworks using leaked credential lists",
      "Password spraying tools targeting common passwords",
      "Automation scripts to monitor for successful logins",
    ],
    defender: [
      "MFA solutions (e.g., app‑based, hardware tokens)",
      "User behavior analytics (UBA/UEBA) platforms",
      "Alerting rules for success‑after‑failure patterns and unusual locations",
    ],
  },
  5: {
    attacker: [
      "Browser automation or scripts to navigate admin panels",
      "Custom tools to trigger exports or configuration changes",
      "Data exfiltration scripts targeting exports or backups",
    ],
    defender: [
      "Role‑based access control (RBAC) and just‑in‑time access tools",
      "DLP (Data Loss Prevention) solutions monitoring exports",
      "Audit logs for admin actions, configuration changes, and exports",
    ],
  },
};

const globalAttackerTools: string[] = [
  "Nmap — network and service discovery used during reconnaissance.",
  "Gobuster/Dirbuster — directory and endpoint enumeration tools.",
  "Burp Suite — web application testing and manual probing.",
  "Hydra — high‑volume password guessing framework.",
  "Custom automation scripts — often built with Python, Selenium, or HTTP libraries.",
];

const globalDefenderTools: string[] = [
  "SIEM platforms (Splunk, Elastic Security, etc.) for centralized log analysis.",
  "EDR solutions (e.g., CrowdStrike, Microsoft Defender for Endpoint) for endpoint visibility.",
  "WAFs and reverse proxies for HTTP request inspection and filtering.",
  "Fail2Ban and similar tools for blocking abusive IPs based on log patterns.",
  "MFA and strong identity providers (Azure AD, Okta, etc.) to harden authentication.",
  "DLP and audit logging to monitor sensitive actions and data exports.",
];

function randomIp(): string {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function randomTime(base: string, offsetSeconds: number): string {
  // base format: "2025-02-07 03:12:00"
  const date = new Date(base.replace(" ", "T") + "Z");
  date.setSeconds(date.getSeconds() + offsetSeconds);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateLogsForPhase(phase: PhaseNumber): string[] {
  switch (phase) {
    case 1:
      return [
        `${randomTime("2025-02-07 03:11:50", 5)} GET /login 200 UA=UnknownScanner/1.0`,
        `${randomTime("2025-02-07 03:11:50", 6)} GET /admin 404 UA=UnknownScanner/1.0`,
        `${randomTime("2025-02-07 03:11:50", 7)} GET /wp-login.php 404 UA=UnknownScanner/1.0`,
      ];
    case 2:
      return [
        `${randomTime("2025-02-07 03:12:00", 0)} LOGIN FAILED user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:00", 2)} LOGIN FAILED user=root ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:00", 5)} LOGIN FAILED user=test ip=${randomIp()}`,
      ];
    case 3:
      return [
        `${randomTime("2025-02-07 03:12:10", 0)} LOGIN FAILED user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:10", 0)} LOGIN FAILED user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:10", 1)} LOGIN FAILED user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:10", 1)} LOGIN FAILED user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:10", 2)} AUTH WARNING: Too many failures for user admin`,
        `${randomTime("2025-02-07 03:12:10", 3)} LOGIN FAILED user=admin ip=${randomIp()}`,
      ];
    case 4:
      return [
        `${randomTime("2025-02-07 03:12:15", 0)} LOGIN SUCCESS user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:15", 1)} NOTICE: Successful login after 14 failed attempts`,
        `${randomTime("2025-02-07 03:12:15", 1)} WARNING: Login from unusual IP location`,
      ];
    case 5:
      return [
        `${randomTime("2025-02-07 03:12:20", 0)} GET /admin/settings user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:20", 2)} GET /admin/export user=admin ip=${randomIp()}`,
        `${randomTime("2025-02-07 03:12:20", 5)} WARNING: Privilege escalation attempt detected`,
        `${randomTime("2025-02-07 03:12:20", 7)} NOTICE: Large data export initiated`,
      ];
    default:
      return [];
  }
}

function isSuspicious(line: string): boolean {
  const keywords = [
    "FAILED",
    "WARNING",
    "AUTH WARNING",
    "NOTICE",
    "Privilege escalation",
    "export",
    "Too many failures",
    "Large data export",
  ];
  return keywords.some((k) => line.toLowerCase().includes(k.toLowerCase()));
}

export default function MockBruteforceLab() {
  const [phase, setPhase] = useState<PhaseNumber>(1);
  const [logsByPhase, setLogsByPhase] = useState<Record<PhaseNumber, string[]>>({
    1: generateLogsForPhase(1),
    2: generateLogsForPhase(2),
    3: generateLogsForPhase(3),
    4: generateLogsForPhase(4),
    5: generateLogsForPhase(5),
  });
  const [highlight, setHighlight] = useState(false);

  const phases = [
    "Reconnaissance",
    "Probing",
    "Brute-Force",
    "Compromise",
    "Post-Login Behavior",
  ];

  const handleGenerateLogs = () => {
    setLogsByPhase((prev) => ({
      ...prev,
      [phase]: generateLogsForPhase(phase),
    }));
  };

  const renderLogs = () => {
    const lines = logsByPhase[phase] || [];
    return (
      <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
        {lines.map((line, idx) => {
          const suspicious = highlight && isSuspicious(line);
          return (
            <div
              key={idx}
              style={{
                color: suspicious ? "#ff6b6b" : "#f5f5f5",
                fontWeight: suspicious ? 600 : 400,
              }}
            >
              {line}
            </div>
          );
        })}
      </pre>
    );
  };

  const renderPhaseTools = () => {
    const tools = phaseTools[phase];
    return (
      <div style={{ marginTop: "1.5rem" }}>
        <h3>Common Tools in This Phase</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 250px" }}>
            <h4>Attacker Perspective (High‑Level)</h4>
            <ul>
              {tools.attacker.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: "1 1 250px" }}>
            <h4>Defender Perspective</h4>
            <ul>
              {tools.defender.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderPhaseContent = () => {
    switch (phase) {
      case 1:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              In the reconnaissance phase, an attacker is simply trying to discover whether
              a login page exists and what endpoints are available. This is passive,
              high‑level information gathering — not an attack by itself, but it sets the
              stage for later activity.
            </p>

            <h3>Mock Logs</h3>
            {renderLogs()}

            <h3>Defender Insights</h3>
            <ul>
              <li>Unusual user-agent strings may indicate automated scanning.</li>
              <li>Repeated 404s from the same IP can signal probing.</li>
              <li>Requests to non-existent admin pages are suspicious.</li>
            </ul>

            <h3>Prevention Strategies</h3>
            <ul>
              <li>Enable rate limiting on public endpoints.</li>
              <li>Use a Web Application Firewall (WAF) to block scanners.</li>
              <li>Hide sensitive endpoints behind authentication.</li>
            </ul>

            {renderPhaseTools()}
          </>
        );

      case 2:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              In the probing phase, the attacker begins testing the login form with a few
              low‑frequency attempts. This is often used to identify valid usernames or
              confirm that authentication behaves in a predictable way.
            </p>

            <h3>Mock Logs</h3>
            {renderLogs()}

            <h3>Defender Insights</h3>
            <ul>
              <li>Multiple failed logins for different usernames from the same IP.</li>
              <li>Slow timing suggests manual probing or cautious automation.</li>
              <li>Username enumeration attempts often precede brute-force attacks.</li>
            </ul>

            <h3>Prevention Strategies</h3>
            <ul>
              <li>Use generic login error messages (e.g., “Invalid credentials”).</li>
              <li>Enable account lockout or throttling after repeated failures.</li>
              <li>Monitor for repeated login failures from the same IP.</li>
            </ul>

            {renderPhaseTools()}
          </>
        );

      case 3:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              The attacker now escalates to a full brute‑force attempt. This phase is
              characterized by rapid, repeated login failures, often with IP rotation or
              distributed sources to avoid simple rate‑limiting.
            </p>

            <h3>Mock Logs</h3>
            {renderLogs()}

            <h3>Defender Insights</h3>
            <ul>
              <li>High‑frequency login failures indicate automated activity.</li>
              <li>IP rotation suggests an attempt to bypass rate‑limiting.</li>
              <li>Repeated failures for the same username are a strong brute‑force signal.</li>
              <li>Authentication warnings show the system is detecting abnormal behavior.</li>
            </ul>

            <h3>Prevention Strategies</h3>
            <ul>
              <li>Enable Multi‑Factor Authentication (MFA) for all privileged accounts.</li>
              <li>Use IP throttling or progressive delays after repeated failures.</li>
              <li>Deploy bot detection and behavioral analytics.</li>
              <li>Alert on spikes in authentication failures.</li>
            </ul>

            {renderPhaseTools()}
          </>
        );

      case 4:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              After many failed attempts, one login finally succeeds. This marks the moment
              of compromise — the attacker has gained access to the account. This phase is
              critical for defenders, as early detection can prevent further damage.
            </p>

            <h3>Mock Logs</h3>
            {renderLogs()}

            <h3>Defender Insights</h3>
            <ul>
              <li>A success immediately after many failures is a strong compromise signal.</li>
              <li>The login may originate from an unusual or new IP address.</li>
              <li>Logins at abnormal hours can indicate unauthorized access.</li>
            </ul>

            <h3>Prevention Strategies</h3>
            <ul>
              <li>Require MFA to prevent password‑only compromise.</li>
              <li>Trigger alerts on success‑after‑failure patterns.</li>
              <li>Use geo‑velocity and impossible‑travel detection.</li>
              <li>Force password resets after suspicious authentication events.</li>
            </ul>

            {renderPhaseTools()}
          </>
        );

      case 5:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              With access to the account, the attacker begins exploring the system. This
              phase often includes privilege escalation attempts, accessing sensitive pages,
              or downloading data. Defenders can still catch the intrusion here if they
              monitor post‑authentication behavior.
            </p>

            <h3>Mock Logs</h3>
            {renderLogs()}

            <h3>Defender Insights</h3>
            <ul>
              <li>Accessing admin or sensitive pages immediately after login is suspicious.</li>
              <li>Privilege escalation attempts are a major red flag.</li>
              <li>Large or unusual data exports may indicate exfiltration.</li>
              <li>Behavior inconsistent with the user’s normal patterns is highly suspicious.</li>
            </ul>

            <h3>Prevention Strategies</h3>
            <ul>
              <li>Use role‑based access controls to limit sensitive actions.</li>
              <li>Monitor for unusual post‑login behavior.</li>
              <li>Alert on privilege escalation attempts.</li>
              <li>Implement data‑loss prevention (DLP) controls.</li>
            </ul>

            {renderPhaseTools()}
          </>
        );

      default:
        return <p>Phase content coming soon.</p>;
    }
  };

  return (
    <Layout
      title="Mock Brute-Force Attack Simulation"
      description="A safe, educational walkthrough of a simulated brute-force attack chain."
    >
      <main style={{ padding: "2rem" }}>
        <h1>Mock Brute-Force Attack Simulation</h1>

        <p>
          This interactive lab walks through a safe, realistic simulation of a brute-force
          attack chain. Each phase includes explanations, mock logs, defender insights,
          prevention strategies, and real‑world tools used by both attackers and defenders.
        </p>

        <p>Use the timeline below to explore each phase of the simulated attack.</p>

        {/* Timeline */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {phases.map((label, index) => (
            <button
              key={index}
              onClick={() => setPhase((index + 1) as PhaseNumber)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                border: "1px solid #444",
                background: phase === index + 1 ? "#444" : "transparent",
                color: phase === index + 1 ? "white" : "inherit",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleGenerateLogs}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#333",
              color: "white",
              cursor: "pointer",
            }}
          >
            Generate Logs for Current Phase
          </button>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
            />
            Highlight suspicious events
          </label>
        </div>

        {/* Phase Content */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        >
          <h2>{phases[phase - 1]}</h2>
          {renderPhaseContent()}
        </div>

        {/* Global Tools Section */}
        <section style={{ marginTop: "3rem" }}>
          <h2>Common Tools Across the Entire Attack Chain</h2>
          <p>
            This section summarizes real‑world tools that appear across multiple phases of
            the attack chain — both from the attacker and defender perspectives. The goal
            is to help learners recognize names they will encounter in real environments.
          </p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3>Attacker‑Side (High‑Level Awareness)</h3>
              <ul>
                {globalAttackerTools.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <h3>Defender‑Side (Operational Tools)</h3>
              <ul>
                {globalDefenderTools.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}