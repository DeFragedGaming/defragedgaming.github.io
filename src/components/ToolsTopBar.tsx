import React from "react";
import Link from "@docusaurus/Link";

export default function ToolsTopBar() {
  return (
    <div className="w-full bg-slate-900/80 backdrop-blur border-b border-slate-800 py-3 mb-6">
      <div className="mx-auto max-w-6xl px-4 flex items-center gap-6 text-slate-200 text-sm">
        <Link className="hover:text-cyan-400 transition" to="/tools">
          All Tools
        </Link>
        <Link className="hover:text-cyan-400 transition" to="/tools/hash-playground">
          Hashing Playground
        </Link>
        <Link className="hover:text-cyan-400 transition" to="/tools/network-builder">
          Network Builder
        </Link>
      </div>
    </div>
  );
}