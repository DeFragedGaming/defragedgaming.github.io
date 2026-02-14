import React, { useState, useMemo } from "react";
import { parseLogs } from "./LogParser";

export default function LogAnalyzer() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [parsed, setParsed] = useState([]);
  const [view, setView] = useState("list");

  const handleRun = () => {
    const result = parseLogs(input);
    setParsed(result);
  };

  const filtered = useMemo(() => {
    return parsed.filter((entry) => {
      if (levelFilter !== "ALL" && entry.level !== levelFilter) return false;
      if (search && !entry.raw.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [parsed, search, levelFilter]);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/80 p-6 shadow-[0_0_80px_rgba(15,23,42,0.9)] ring-1 ring-cyan-500/20 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)]" />

      <div className="flex flex-col gap-3 border-b border-slate-800/80 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80"></p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-50">Log Analyzer</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">Analyze logs in real time with filtering, search, and format detection.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Input Logs</span>
              <button
                type="button"
                onClick={() => setInput("")}
                className="text-xs text-slate-400 hover:text-cyan-300"
              >
                Clear
              </button>
            </div>
            <textarea
              className="min-h-[200px] flex-1 resize-none rounded-lg border border-slate-800 bg-slate-950/90 p-3 text-sm text-slate-100 outline-none ring-0 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/60"
              placeholder="Paste logs here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300"
              >
                <option value="ALL">All Levels</option>
                <option value="INFO">Info</option>
                <option value="WARN">Warn</option>
                <option value="ERROR">Error</option>
                <option value="DEBUG">Debug</option>
              </select>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300"
              />
            </div>

            <button
              type="button"
              onClick={handleRun}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.8)] transition hover:brightness-110"
            >
              Analyze
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1.5 text-xs rounded-lg border ${
                  view === "list"
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                    : "border-slate-700 bg-slate-900 text-slate-300"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setView("timeline")}
                className={`px-3 py-1.5 text-xs rounded-lg border ${
                  view === "timeline"
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                    : "border-slate-700 bg-slate-900 text-slate-300"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 max-h-[500px] overflow-y-auto">
            {view === "list" && (
              <div className="flex flex-col gap-2">
                {filtered.map((entry, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-2 text-xs font-mono ${
                      entry.level === "ERROR"
                        ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
                        : entry.level === "WARN"
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                        : entry.level === "INFO"
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                        : entry.level === "DEBUG"
                        ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                        : "border-slate-700 bg-slate-900 text-slate-300"
                    }`}
                  >
                    {entry.raw}
                  </div>
                ))}
              </div>
            )}

            {view === "timeline" && (
              <div className="relative flex flex-col gap-6 pl-6">
                {filtered.map((entry, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <div className="text-xs font-mono text-slate-300">{entry.raw}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}