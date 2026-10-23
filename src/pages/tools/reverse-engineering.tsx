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

const reverseEngineeringTools: Tool[] = [
  {
    name: "Ghidra",
    description:
      "Ghidra is a free, open-source reverse engineering suite developed by the NSA. It includes a powerful decompiler, disassembler, and analysis framework that supports many architectures and file formats. Its collaborative features and extensibility make it suitable for both beginners and advanced analysts.",
    whyUseful:
      "Provides a professional-grade RE environment without licensing restrictions, making it ideal for learning binary analysis and malware reverse engineering.",
    difficulty: "Advanced",
    tags: ["Decompiler", "Disassembly", "Static Analysis"],
    url: "https://ghidra-sre.org/",
    githubUrl: "https://github.com/NationalSecurityAgency/ghidra",
  },
  {
    name: "IDA Free",
    description:
      "IDA Free is the free version of the Interactive Disassembler, one of the most widely used tools in the reverse engineering community. It provides high-quality disassembly, graph views, and analysis capabilities for several architectures.",
    whyUseful:
      "Helps learners understand assembly-level analysis and how disassemblers interpret binary instructions and control flow.",
    difficulty: "Advanced",
    tags: ["Disassembler", "Static Analysis"],
    url: "https://hex-rays.com/ida-free/",
  },
  {
    name: "Binary Ninja (Demo)",
    description:
      "Binary Ninja is a modern reverse engineering platform featuring an intuitive interface, powerful intermediate language (BNIL), and automated analysis. The demo version allows exploration of its workflow and capabilities.",
    whyUseful:
      "Shows how modern RE tools simplify analysis through structured views, IL-based reasoning, and clean UI design.",
    difficulty: "Advanced",
    tags: ["Reverse Engineering", "Intermediate Language", "Analysis"],
    url: "https://binary.ninja/",
  },
  {
    name: "Cutter (Rizin GUI)",
    description:
      "Cutter is a graphical interface built on top of the Rizin reverse engineering framework. It provides disassembly, decompilation, debugging, and visualization features in an accessible, open-source package.",
    whyUseful:
      "Great for learners who want a free, GUI-driven RE tool with strong community support and extensibility.",
    difficulty: "Intermediate",
    tags: ["Open Source", "GUI", "Disassembly"],
    url: "https://cutter.re/",
    githubUrl: "https://github.com/rizinorg/cutter",
  },
  {
    name: "Detect It Easy (DIE)",
    description:
      "Detect It Easy identifies packers, compilers, and file signatures for Windows binaries. It helps determine how a binary was built and whether it is packed, obfuscated, or otherwise modified.",
    whyUseful:
      "Useful for triage and understanding how malware authors hide code through packing and obfuscation techniques.",
    difficulty: "Beginner",
    tags: ["Packer Detection", "Windows", "Triage"],
    url: "https://github.com/horsicq/Detect-It-Easy",
    githubUrl: "https://github.com/horsicq/Detect-It-Easy",
  },
];

export default function ReverseEngineeringPage() {
  return (
    <Layout
      title="Reverse Engineering Tools"
      description="Tools for binary analysis, disassembly, decompilation, and malware investigation."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Reverse Engineering Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Reverse engineering tools help analysts understand how software behaves at a low level.
          These tools support disassembly, decompilation, debugging, and structural analysis of
          binaries. They are essential for malware analysis, vulnerability research, and software
          internals exploration.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {reverseEngineeringTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}