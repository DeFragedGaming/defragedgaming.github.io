import React from "react";
import Layout from "@theme/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen bg-slate-950 text-slate-100">

        {/* HERO */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              CyberTrace
            </h1>

            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Security Engineering • Pentesting • Cyber Tool Development  
            </p>

            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              A personal cybersecurity portfolio and a growing suite of interactive tools,
              built to explore, teach, and simulate real‑world security concepts.
            </p>

            <div className="mt-10">
              <a
                href="/tools"
                className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.4)] transition"
              >
                Explore Tools
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT / PORTFOLIO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-6">
            About CyberTrace
          </h2>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-slate-300 leading-relaxed">
              CyberTrace is a personal cybersecurity engineering project focused on
              building hands‑on tools, labs, and simulations.  
              It blends practical security engineering, pentesting concepts, and
              interactive learning experiences — all designed and developed by a
              single creator under the CyberTrace identity.
            </p>

            <p className="mt-4 text-slate-400">
              The goal is simple: create tools that feel real, look premium, and help
              others understand how security systems behave in the wild.
            </p>
          </div>
        </section>

        {/* FEATURED TOOLS */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-8">
            Featured Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Hash Playground */}
            <a
              href="/tools/hash-playground"
              className="group bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-400/60 transition shadow-lg hover:shadow-cyan-500/20"
            >
              <h3 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200">
                Hashing & Encoding Playground
              </h3>
              <p className="mt-2 text-slate-400">
                Explore hashing, encoding, and transformations in real time with a
                premium neon UI.
              </p>
            </a>

            {/* Log Analyzer */}
            <a
              href="/tools/log-analyzer"
              className="group bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-purple-400/60 transition shadow-lg hover:shadow-purple-500/20"
            >
              <h3 className="text-xl font-semibold text-purple-300 group-hover:text-purple-200">
                Log Analyzer
              </h3>
              <p className="mt-2 text-slate-400">
                Paste logs, filter by level, search patterns, and analyze events with
                a clean cyber‑dashboard interface.
              </p>
            </a>

            {/* Placeholder for future tools */}
            <div className="group bg-slate-900/40 border border-slate-800 rounded-xl p-6 opacity-50 cursor-not-allowed">
              <h3 className="text-xl font-semibold text-slate-500">
                Coming Soon
              </h3>
              <p className="mt-2 text-slate-600">
                More CyberTrace tools are in development.
              </p>
            </div>

          </div>
        </section>

      </main>
    </Layout>
  );
}