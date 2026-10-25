import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

type LabCardProps = {
  title: string;
  description: string;
  link?: string;
  active?: boolean;
};

function LabCard({ title, description, link, active = false }: LabCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-xl border bg-slate-900/60 p-6 transition duration-200 ${
        active
          ? "border-cyan-500/25 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
          : "border-slate-800 opacity-75"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-sm font-bold text-cyan-300">
          {title.slice(0, 1)}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
            active
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-slate-700 bg-slate-800 text-slate-400"
          }`}
        >
          {active ? "Available" : "Coming soon"}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-cyan-300">{title}</h2>
      <p className="mt-3 mb-6 flex-1 text-sm leading-6 text-slate-400">{description}</p>

      {active && link ? (
        <Link
          className="inline-flex w-fit items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 no-underline transition hover:bg-cyan-400"
          to={link}
        >
          Open lab <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      ) : (
        <span className="text-sm font-medium text-slate-500">In development</span>
      )}
    </article>
  );
}

export default function LabsOverview() {
  return (
    <Layout>
      <Head>
        <title>CyberTrace Labs</title>
        <meta
          name="description"
          content="Hands‑on, interactive labs designed to teach real‑world cybersecurity and IT fundamentals."
        />
      </Head>

      <div className="px-6 py-16 max-w-6xl mx-auto text-slate-200">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">
            CyberTrace Labs
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Hands‑on, interactive labs designed to teach real‑world cybersecurity and IT fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <LabCard
            title="Mock Brute‑Force Simulation"
            description="Analyze authentication logs, detect brute‑force attempts, and learn defensive strategies."
            link="/labs/mock-bruteforce-lab"
            active
          />

          <LabCard
            title="Network Builder Lab"
            description="Build a simulated router-switch-host topology, configure IPv4 interfaces, and test LAN connectivity with an interactive network CLI."
            link="/labs/network-builder"
            active
          />

          <LabCard
            title="Password Hashing Lab"
            description="Compare fast hashes with salted password hashing, verify a demo password, and review secure storage practices."
            link="/labs/password-hashing"
            active
          />

          <LabCard
            title="Log Investigation Lab"
            description="Analyze logs, trace attacker activity, and identify indicators of compromise."
          />

          <LabCard
            title="VLAN Segmentation Lab"
            description="Configure VLANs, trunk ports, and segmentation rules."
          />

          <LabCard
            title="DMZ & Firewall Rules Lab"
            description="Harden a fictional perimeter policy with least-privilege rules, ordered evaluation, and simulated traffic checks."
            link="/labs/dmz-firewall"
            active
          />

          <LabCard
            title="Troubleshooting Scenarios"
            description="Diagnose broken networks and apply real‑world troubleshooting techniques."
          />

          <LabCard
            title="Phishing Lab"
            description="Analyze suspicious emails and detect red flags."
            link="/labs/phishing-lab"
            active
          />

        </div>
      </div>
    </Layout>
  );
}