import React, { useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import styles from "./styles.module.css";

export default function PhishingLab() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyze = () => {
    const analysis = runAnalysis(emailText);
    setResult(analysis);
  };

  return (
    <Layout>
      <Head>
        <title>Phishing Lab</title>
        <meta name="description" content="Analyze suspicious emails safely." />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Phishing Analysis Lab</h1>
        <p className={styles.subtitle}>
          Paste a suspicious email to detect red flags. Fully client‑side and safe.
        </p>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <h2>Email Input</h2>
            <textarea
              className={styles.textarea}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder={`From: HR <NikkiField@smxtech-careers.com>
Subject: Urgent: Action Required

Please verify your account within 24 hours...`}
            />
            <button className={styles.button} onClick={analyze}>
              Analyze Email
            </button>
          </div>

          <div className={styles.panel}>
            <h2>Results</h2>

            {!result && <p className={styles.muted}>No analysis yet.</p>}

            {result && (
              <div>
                <p>
                  <strong>Risk Level:</strong> {result.riskLevel}
                </p>
                <p>
                  <strong>Score:</strong> {result.score}
                </p>

                <h3>Reasons</h3>
                <ul>
                  {result.reasons.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <h3>Links Found</h3>
                {result.urls.length === 0 ? (
                  <p className={styles.muted}>No URLs detected.</p>
                ) : (
                  <ul>
                    {result.urls.map((u: string) => (
                      <li key={u}>
                        <code>{u}</code>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ------------------------------
   ANALYSIS ENGINE (SAFE)
--------------------------------*/

function runAnalysis(raw: string) {
  const reasons: string[] = [];
  let score = 0;

  const urls = extractUrls(raw);
  const sender = extractEmail(raw);
  const domain = sender ? sender.split("@")[1] : null;

  if (!raw.trim()) {
    return {
      riskLevel: "Low",
      score: 0,
      reasons: ["No content provided."],
      urls: [],
    };
  }

  const lower = raw.toLowerCase();

  if (lower.includes("urgent") || lower.includes("immediately")) {
    score += 2;
    reasons.push("Urgent language detected.");
  }

  if (lower.includes("verify") || lower.includes("password")) {
    score += 3;
    reasons.push("Mentions verification or credentials.");
  }

  if (domain && domain.includes("careers")) {
    score += 2;
    reasons.push("Domain contains impersonation keywords (e.g., careers).");
  }

  if (urls.length > 0) {
    score += 1;
    reasons.push("Contains external links.");
  }

  return {
    riskLevel: score >= 6 ? "High" : score >= 3 ? "Medium" : "Low",
    score,
    reasons,
    urls,
  };
}

function extractEmail(text: string) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/);
  return match ? match[0] : null;
}

function extractUrls(text: string) {
  const matches = text.match(/https?:\/\/[^\s)]+/gi);
  return matches ? Array.from(new Set(matches)) : [];
}