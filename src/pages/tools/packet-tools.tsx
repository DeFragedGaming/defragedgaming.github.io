import React from "react";
import Layout from "@theme/Layout";
import ToolCard from "../../components/ToolDirectoryCard";

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

const packetTools: Tool[] = [
  {
    name: "Wireshark",
    description:
      "Wireshark is the most widely used graphical packet analyzer. It captures, decodes, and visualizes network traffic across hundreds of protocols. It supports filtering, coloring rules, and deep inspection.",
    whyUseful:
      "Essential for learning how protocols behave on the wire and for investigating suspicious network activity.",
    difficulty: "Intermediate",
    tags: ["Packets", "Protocols", "GUI"],
    url: "https://www.wireshark.org/",
  },
  {
    name: "tcpdump",
    description:
      "tcpdump is a command-line packet capture tool available on most Unix-like systems. It supports powerful BPF filters and is ideal for capturing traffic on servers or headless systems.",
    whyUseful:
      "Teaches low-level packet capture and filtering — critical skills for network forensics and troubleshooting.",
    difficulty: "Intermediate",
    tags: ["CLI", "Capture", "Filtering"],
    url: "https://www.tcpdump.org/",
  },
  {
    name: "Tshark",
    description:
      "Tshark is the command-line version of Wireshark. It provides the same protocol decoding capabilities but is optimized for automation, scripting, and remote analysis.",
    whyUseful:
      "Great for automated packet analysis, scripting workflows, and working on remote servers without a GUI.",
    difficulty: "Advanced",
    tags: ["CLI", "Automation", "Decoding"],
    url: "https://www.wireshark.org/docs/man-pages/tshark.html",
  },
  {
    name: "Zeek (formerly Bro)",
    description:
      "Zeek is a powerful network security monitoring framework that transforms raw traffic into structured logs. It focuses on behavioral analysis rather than signatures.",
    whyUseful:
      "Shows how high-level network logs are generated from raw packets — foundational for threat hunting and NSM.",
    difficulty: "Advanced",
    tags: ["NSM", "Logs", "Behavioral Analysis"],
    url: "https://zeek.org/",
  },
  {
    name: "Scapy",
    description:
      "Scapy is a Python-based packet crafting and manipulation tool. It allows creating, sending, sniffing, and decoding packets across many protocols.",
    whyUseful:
      "Perfect for learning how packets are constructed and how attackers craft custom traffic for testing or exploitation.",
    difficulty: "Advanced",
    tags: ["Packet Crafting", "Python", "Testing"],
    url: "https://scapy.net/",
    githubUrl: "https://github.com/secdev/scapy",
  },
];

export default function PacketToolsPage() {
  return (
    <Layout
      title="Packet Tools"
      description="Tools for packet capture, analysis, crafting, and network forensics."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Packet Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Packet tools help analysts capture, inspect, and manipulate network traffic. These tools
          support protocol analysis, network forensics, troubleshooting, and security research by
          revealing exactly what happens on the wire.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {packetTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}