import React, { useState } from "react";

export default function LogAnalyzerPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);

  function analyze() {
    const lines = input.split("\n");
    const findings: string[] = [];

    for (const line of lines) {
      if (line.includes("error") || line.includes("ERROR")) {
        findings.push(`❗ Error detected: ${line}`);
      }
      if (line.includes("failed") || line.includes("FAIL")) {
        findings.push(`⚠️ Failure detected: ${line}`);
      }
      if (line.includes("login") && line.includes("failed")) {
        findings.push(`🔐 Failed login attempt: ${line}`);
      }
    }

    if (findings.length === 0) {
      findings.push("No issues detected.");
    }

    setResults(findings);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Log Analyzer</h1>
      <p>Paste logs below and click Analyze.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste logs here..."
        style={{ width: "100%", height: "200px", padding: "10px" }}
      />

      <button onClick={analyze} style={{ marginTop: "1rem" }}>
        Analyze Logs
      </button>

      <h2 style={{ marginTop: "2rem" }}>Results</h2>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}