import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

const tools = [
  {
    name: "Network Scanner CLI",
    description: "CLI-driven reconnaissance for mapping hosts, services, and exposure points.",
    repo: "https://github.com/DeFragedGaming/network-scanner",
    docs: "https://github.com/DeFragedGaming/network-scanner#readme",
  },
  {
    name: "Log Analyzer Engine",
    description: "Parse production logs, surface anomalies, and investigate suspicious patterns quickly.",
    repo: "https://github.com/DeFragedGaming/log-analyzer",
    docs: "https://github.com/DeFragedGaming/log-analyzer#readme",
  },
  {
    name: "URL Intelligence Tool",
    description: "Inspect URLs, classify malicious patterns, and support faster threat triage.",
    repo: "https://github.com/DeFragedGaming/url-intel",
    docs: "https://github.com/DeFragedGaming/url-intel#readme",
  },
] as const;

const capabilities = [
  "Reconnaissance",
  "Log triage",
  "Threat hunting",
  "URL analysis",
  "Operational visibility",
  "Security tooling",
] as const;

export default function Ghostline() {
  return (
    <>
      <Head>
        <title>Ghostline | CyberTrace</title>
        <meta
          name="description"
          content="Ghostline is the operational toolkit hub for CyberTrace security tooling, recon, and investigation workflows."
        />
      </Head>

      <Layout title="Ghostline" description="Operational toolkit for CyberTrace security workflows.">
        <main className="min-h-screen bg-slate-950 text-slate-100">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <div className="mb-12 rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-8 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-sm">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Ghostline
                  </span>

                  <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                    Operator toolkit for cyber investigations.
                  </h1>

                  <p className="mt-4 max-w-xl text-base text-slate-300 md:text-lg">
                    Ghostline brings together CyberTrace-built security tools for reconnaissance,
                    log analysis, and fast operational decision-making in one focused toolkit.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {capabilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-cyan-300">Toolkit catalog</h2>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
                3 tools available
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <article
                  key={tool.name}
                  className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="h-10 w-10 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/30" />
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      Active
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-cyan-300">{tool.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{tool.description}</p>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={tool.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex flex-1 items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      GitHub
                    </a>

                    <a
                      href={tool.docs}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
                    >
                      Docs
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}