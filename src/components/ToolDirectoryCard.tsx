import React from "react";
import Link from "@docusaurus/Link";

export type ToolDirectoryEntry = {
  name: string;
  description: string;
  whyUseful: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  url: string;
  docsUrl?: string;
  githubUrl?: string;
};

type ToolDirectoryCardProps = {
  tool: ToolDirectoryEntry;
};

export default function ToolDirectoryCard({ tool }: ToolDirectoryCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]">
      <div>
        <h2 className="text-xl font-semibold text-cyan-300">{tool.name}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{tool.description}</p>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        <strong className="text-slate-200">Why it’s useful:</strong> {tool.whyUseful}
      </p>

      <p className="text-sm text-slate-400">
        <strong className="text-slate-200">Difficulty:</strong>{" "}
        <span className="text-cyan-200">{tool.difficulty}</span>
      </p>

      <div className="flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <Link
          to={tool.url}
          className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Visit Tool
        </Link>
        {tool.docsUrl && (
          <Link
            to={tool.docsUrl}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
          >
            Docs
          </Link>
        )}
        {tool.githubUrl && (
          <Link
            to={tool.githubUrl}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
          >
            GitHub
          </Link>
        )}
      </div>
    </article>
  );
}
