import React, { useState } from "react";

export default function PacketParserPage() {
  const [hex, setHex] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  function parsePacket() {
    try {
      const bytes = hex
        .replace(/\s+/g, "")
        .match(/.{1,2}/g)
        ?.map((b) => parseInt(b, 16));

      if (!bytes) {
        setOutput(["Invalid hex input"]);
        return;
      }

      const results: string[] = [];

      // Basic Ethernet header parsing
      if (bytes.length >= 14) {
        const dest = bytes.slice(0, 6).map((b) => b.toString(16).padStart(2, "0")).join(":");
        const src = bytes.slice(6, 12).map((b) => b.toString(16).padStart(2, "0")).join(":");
        const ethType = (bytes[12] << 8) | bytes[13];

        results.push(`Destination MAC: ${dest}`);
        results.push(`Source MAC: ${src}`);
        results.push(`EtherType: 0x${ethType.toString(16)}`);
      }

      setOutput(results.length ? results : ["Packet too short to parse."]);
    } catch {
      setOutput(["Error parsing packet."]);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Packet Parser</h1>
      <p>Enter raw hex bytes (e.g., <code>ff ff ff ff ff ff 00 11 22 33 44 55 08 00</code>).</p>

      <textarea
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="Enter hex bytes..."
        style={{ width: "100%", height: "200px", padding: "10px" }}
      />

      <button onClick={parsePacket} style={{ marginTop: "1rem" }}>
        Parse Packet
      </button>

      <h2 style={{ marginTop: "2rem" }}>Parsed Output</h2>
      <ul>
        {output.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}