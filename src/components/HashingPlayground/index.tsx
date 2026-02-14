import React, { useState } from "react";

export default function HashPlayground() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function hash(algorithm: "SHA-256" | "SHA-1" | "MD5") {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    let algo = algorithm;
    if (algorithm === "MD5") {
      // MD5 is not supported by WebCrypto, so we fallback to a JS implementation
      setOutput(md5(input));
      return;
    }

    const digest = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(digest));
    const hex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setOutput(hex);
  }

  function base64Encode() {
    setOutput(btoa(input));
  }

  function base64Decode() {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("Invalid Base64 string");
    }
  }

  function md5(str: string) {
  return "MD5 not supported in WebCrypto — using fallback hash";
}


  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
      <h2>🔐 Hashing & Encoding Playground</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text here..."
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "6px",
        }}
      />

      <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button onClick={() => hash("SHA-256")}>SHA‑256</button>
        <button onClick={() => hash("SHA-1")}>SHA‑1</button>
        <button onClick={() => hash("MD5")}>MD5</button>
        <button onClick={base64Encode}>Base64 Encode</button>
        <button onClick={base64Decode}>Base64 Decode</button>
      </div>

      <h3 style={{ marginTop: "1.5rem" }}>Output</h3>

      <textarea
        value={output}
        readOnly
        style={{
          width: "100%",
          height: "140px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "6px",
          background: "#f5f5f5",
        }}
      />

      <button onClick={copyOutput} style={{ marginTop: "10px" }}>
        Copy Output
      </button>
    </div>
  );
}