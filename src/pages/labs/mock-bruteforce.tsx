import React, { useState } from "react";
import Layout from "@theme/Layout";

export default function MockBruteforceLab() {
  // Track which phase is selected
  const [phase, setPhase] = useState(1);

  // Labels for the timeline
  const phases = [
    "Reconnaissance",
    "Probing",
    "Brute-Force",
    "Compromise",
    "Post-Login Behavior",
  ];

  // Render content for each phase
  const renderPhaseContent = () => {
    switch (phase) {
      case 1:
        return (
          <>
            <h3>What Happens in This Phase</h3>
            <p>
              In the reconnaissance phase, an attacker is simply trying to discover whether
              a login page exists and what endpoints are available. This is passive,
              high‑level information gathering — not an attack.
            </p>

            <h3>Mock Logs</h3>
            <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
{`2025-02-07 03:11:55 GET /login 200 UA=UnknownScanner/1.0
2025-02-07 03:11:56 GET /admin 404 UA=UnknownScanner/1.0
2025-02-07 03:11:57 GET /wp-login.php 404 UA=UnknownScanner/1.0`}
            </pre>

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
            <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
{`2025-02-07 03:12:00 LOGIN FAILED user=admin ip=192.168.1.55
2025-02-07 03:12:02 LOGIN FAILED user=root ip=192.168.1.55
2025-02-07 03:12:05 LOGIN FAILED user=test ip=192.168.1.55`}
            </pre>

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
            <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
{`2025-02-07 03:12:10 LOGIN FAILED user=admin ip=192.168.1.55
2025-02-07 03:12:10 LOGIN FAILED user=admin ip=192.168.1.55
2025-02-07 03:12:11 LOGIN FAILED user=admin ip=10.0.0.22
2025-02-07 03:12:11 LOGIN FAILED user=admin ip=10.0.0.22
2025-02-07 03:12:12 AUTH WARNING: Too many failures for user admin
2025-02-07 03:12:13 LOGIN FAILED user=admin ip=172.16.0.9`}
            </pre>

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
            <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
{`2025-02-07 03:12:15 LOGIN SUCCESS user=admin ip=192.168.1.55
2025-02-07 03:12:16 NOTICE: Successful login after 14 failed attempts
2025-02-07 03:12:16 WARNING: Login from unusual IP location`}
            </pre>

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
            <pre style={{ background: "#222", padding: "1rem", borderRadius: "6px" }}>
{`2025-02-07 03:12:20 GET /admin/settings user=admin ip=192.168.1.55
2025-02-07 03:12:22 GET /admin/export user=admin ip=192.168.1.55
2025-02-07 03:12:25 WARNING: Privilege escalation attempt detected
2025-02-07 03:12:27 NOTICE: Large data export initiated`}
            </pre>

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
          attack chain. Each phase includes explanations, mock logs, defender insights, and
          prevention strategies.
        </p>

        <p>Use the timeline below to explore each phase of the simulated attack.</p>

        {/* Timeline */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          {phases.map((label, index) => (
            <button
              key={index}
              onClick={() => setPhase(index + 1)}
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
      </main>
    </Layout>
  );
}
