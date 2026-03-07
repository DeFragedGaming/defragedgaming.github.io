import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

export default function DocsLanding() {
  return (
    <>
      <Head>
        <title>CyberTrace Documentation</title>
        <meta name="description" content="CyberTrace Docs" />
      </Head>
      <Layout>
      <main className="w-full px-8 py-20 max-w-7xl mx-auto text-slate-200">

        {/* HERO */}
        <div className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            CyberTrace Documentation
          </h1>

          <p className="text-slate-400 max-w-2xl">
            Operator access granted. This hub contains system architecture,
            intelligence reports, reference material, and interactive modules
            powering the CyberTrace platform.
          </p>

          <div className="mt-6 flex gap-6 text-sm text-slate-500">
            <span className="px-3 py-1 bg-slate-900/40 border border-slate-800 rounded">
              System Status: <span className="text-sky-400">Stable</span>
            </span>
            <span className="px-3 py-1 bg-slate-900/40 border border-slate-800 rounded">
              Integrity: <span className="text-green-400">Verified</span>
            </span>
            <span className="px-3 py-1 bg-slate-900/40 border border-slate-800 rounded">
              Last Sync: 2m ago
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <ModuleCard
            title="Projects"
            desc="Core systems, architecture, and major builds."
            href="/projects"
          />

          <ModuleCard
            title="Writeups"
            desc="Threat intelligence, research notes, and walkthroughs."
            href="/writeups"
          />

          <ModuleCard
            title="Notes"
            desc="Reference material, field notes, and study resources."
            href="/notes"
          />

          <ModuleCard
            title="Tools"
            desc="Operator utilities and interactive platform features."
            href="/tools"
          />

          <ModuleCard
            title="Labs"
            desc="Hands‑on cybersecurity environments and simulations."
            href="/labs"
          />

        </div>
      </main>
      </Layout>
    </>
  );
}

function ModuleCard({ title, desc, href }) {
  return (
    <a
      href={href}
      className="block p-6 bg-slate-900/40 border border-slate-800 rounded-lg
                 hover:border-sky-500 hover:bg-slate-900/60 transition group"
    >
      <h2 className="text-xl font-semibold mb-2 group-hover:text-sky-400">
        {title}
      </h2>
      <p className="text-slate-400">{desc}</p>
    </a>
  );
}
