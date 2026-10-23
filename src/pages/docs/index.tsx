import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

const sections = [
  {
    eyebrow: "Build",
    title: "Projects",
    description:
      "Explore CyberTrace projects, experiments, and the ideas behind the builds.",
    href: "/projects",
    linkLabel: "View projects",
  },
  {
    eyebrow: "Learn",
    title: "Writeups",
    description:
      "Read practical walkthroughs, research, and cybersecurity learning material.",
    href: "/docs/writeups",
    linkLabel: "Read the writeups",
  },
  {
    eyebrow: "Reference",
    title: "Notes",
    description:
      "Find concise cybersecurity notes, methodology, and useful references.",
    href: "/docs/notes",
    linkLabel: "Explore notes",
  },
  {
    eyebrow: "Explore",
    title: "Tools",
    description:
      "Open the tool directory and discover interactive utilities and curated resources.",
    href: "/tools",
    linkLabel: "Open tools directory",
  },
  {
    eyebrow: "Practice",
    title: "Labs",
    description:
      "Build hands-on skills with guided cybersecurity and networking exercises.",
    href: "/labs",
    linkLabel: "Choose a lab",
  },
] as const;

export default function DocsLanding() {
  return (
    <>
      <Head>
        <title>Documentation | CyberTrace</title>
        <meta
          name="description"
          content="Browse CyberTrace project documentation, cybersecurity notes, writeups, tools, and hands-on labs."
        />
      </Head>

      <Layout
        title="Documentation"
        description="CyberTrace documentation, references, and learning resources."
      >
        <main className="min-h-screen px-6 py-14 text-slate-200 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-900/70 p-7 shadow-[0_0_32px_rgba(34,211,238,0.08)] sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
              />
              <div className="relative max-w-3xl">
                <span className="inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  CyberTrace Knowledge Base
                </span>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Documentation, built to help you find your next step.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Browse project information, practical writeups, and reference notes—or jump
                  straight into a tool or hands-on lab.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/docs/intro"
                    className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Read the overview
                  </Link>
                  <Link
                    to="/labs"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
                  >
                    Explore labs
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="docs-sections-heading">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Browse by topic
                  </p>
                  <h2
                    id="docs-sections-heading"
                    className="mt-2 text-2xl font-bold text-white sm:text-3xl"
                  >
                    Find what you need
                  </h2>
                </div>
                <p className="max-w-lg text-sm leading-6 text-slate-400">
                  Choose a section to explore its documentation and related resources.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section, index) => (
                  <Link
                    key={section.title}
                    to={section.href}
                    className="group flex min-h-52 flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-inherit no-underline transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-slate-900 hover:text-inherit hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        {section.eyebrow}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-400"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-100 transition group-hover:text-cyan-200">
                      {section.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                      {section.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      {section.linkLabel}
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}
