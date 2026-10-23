import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

type Project = {
  name: string;
  description: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
  status?: string;
};

const projects: Project[] = [
  {
    name: "CyberTrace Terminal Game",
    description:
      "Interactive CyberTrace OS simulation. Being replaced with a new version; see CyberTrace: Signal Breach for updates.",
    href: "/game",
    linkLabel: "Launch",
  },
  {
    name: "BlackSpire: Depths of the Core",
    description:
      "A dark-fantasy mining RPG prototype set in the cursed depths beneath the BlackSpire.",
    href: "https://cybertrace.itch.io/blackspire-depths",
    linkLabel: "Play on itch.io",
    external: true,
  },
  {
    name: "BlackSpire: Voxel of the Abyss",
    description:
      "Under active development: a dark voxel survival RPG set in procedurally generated environments.",
    href: "https://cybertrace.itch.io/blackspire-voxel-of-the-abyss",
    linkLabel: "View development updates",
    external: true,
  },
  {
    name: "CyberTrace: Signal Breach",
    description: "Under active development.",
    status: "Itch link coming soon",
  },
  {
    name: "Untitled Project",
    description: "Description coming soon.",
    status: "No link yet",
  },
  {
    name: "Untitled Project",
    description: "Description coming soon.",
    status: "No link yet",
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | CyberTrace</title>
        <meta
          name="description"
          content="Explore games and software projects from CyberTrace."
        />
      </Head>
      <Layout title="Projects" description="Games and software projects from CyberTrace.">
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 text-slate-200">
          <header className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              CyberTrace
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white">Projects</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Games, experiments, and software in development.
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={`${project.name}-${index}`}
                className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition duration-200 hover:border-cyan-500/40"
              >
                <h2 className="text-xl font-semibold text-cyan-300">{project.name}</h2>
                <p className="mt-3 flex-1 leading-6 text-slate-400">
                  {project.description}
                </p>

                {project.href ? (
                  project.external ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      {project.linkLabel}
                    </a>
                  ) : (
                    <Link
                      to={project.href}
                      className="mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      {project.linkLabel}
                    </Link>
                  )
                ) : (
                  <span className="mt-6 text-sm text-slate-500">
                    {project.status}
                  </span>
                )}
              </article>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
}
