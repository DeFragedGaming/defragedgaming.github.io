import React from "react";
import Layout from "@theme/Layout";

type Tool = {
  name: string;
  description: string;
  whyUseful: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  url: string;
  docsUrl?: string;
  githubUrl?: string;
};

const cryptoStegoTools: Tool[] = [
  {
    name: "Steghide",
    description:
      "Steghide is a classic steganography tool that hides data inside images and audio files using passphrase‑based encryption.",
    whyUseful:
      "Great for learning how attackers conceal payloads inside media files and how defenders extract hidden content.",
    difficulty: "Beginner",
    tags: ["Steganography", "Images", "Audio"],
    url: "https://steghide.sourceforge.net/",
  },
  {
    name: "zsteg",
    description:
      "zsteg is a powerful tool for detecting hidden data in PNG and BMP files using LSB and other stego techniques.",
    whyUseful:
      "Shows how subtle pixel‑level manipulations can embed hidden messages and how analysts detect them.",
    difficulty: "Intermediate",
    tags: ["PNG", "LSB", "Forensics"],
    url: "https://github.com/zed-0xff/zsteg",
    githubUrl: "https://github.com/zed-0xff/zsteg",
  },
  {
    name: "Stegsolve",
    description:
      "Stegsolve is a Java‑based image analysis tool that provides color plane inspection, bit‑layer viewing, and XOR analysis.",
    whyUseful:
      "Helps learners visually inspect images for anomalies and hidden data — a common CTF and DFIR skill.",
    difficulty: "Intermediate",
    tags: ["Images", "Analysis", "Visualization"],
    url: "https://github.com/zardus/ctf-tools/tree/master/stegsolve",
    githubUrl: "https://github.com/zardus/ctf-tools",
  },
  {
    name: "OutGuess",
    description:
      "OutGuess is a universal steganography tool that hides data in JPEG images while preserving statistical properties.",
    whyUseful:
      "Demonstrates how attackers embed data in lossy formats and how forensic analysts extract it.",
    difficulty: "Advanced",
    tags: ["JPEG", "Steganography", "CLI"],
    url: "https://github.com/crorvick/outguess",
    githubUrl: "https://github.com/crorvick/outguess",
  },
  {
    name: "Cryptool",
    description:
      "Cryptool is an educational cryptography suite that includes cipher demos, stego exercises, and visualization tools.",
    whyUseful:
      "Perfect for learning classical and modern crypto concepts, brute‑forcing, and stego basics.",
    difficulty: "Beginner",
    tags: ["Crypto", "Education", "Stego"],
    url: "https://www.cryptool.org/en/",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>
      <p style={{ color: "#ccc", margin: 0 }}>{tool.description}</p>

      <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
        <strong>Why it’s useful:</strong> {tool.whyUseful}
      </p>

      <p style={{ color: "#aaa", fontSize: "0.85rem" }}>
        <strong>Difficulty:</strong> {tool.difficulty}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tool.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#222",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              color: "#ccc",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#0af",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "4px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Visit Tool
        </a>

        {tool.githubUrl && (
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0af",
              color: "#000",
              padding: "6px 12px",
              borderRadius: "4px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export default function CryptoStegoPage() {
  return (
    <Layout
      title="Cryptography & Steganography Tools"
      description="Tools for hiding, detecting, and analyzing concealed data in images, audio, and files."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Cryptography & Steganography Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Crypto‑Stego tools help analysts understand how data is hidden inside files and how
          encryption, encoding, and steganography techniques are used by attackers and defenders.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {cryptoStegoTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}