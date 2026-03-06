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
    <div
      className={`
        p-6 rounded-xl border transition
        ${active
          ? "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          : "border-slate-700 opacity-70"}
        bg-slate-900/40
      `}
    >
      <h3 className="text-xl font-semibold mb-2 text-cyan-300">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>

      {active && link ? (
        <Link className="button button--primary" to={link}>
          Start Lab
        </Link>
      ) : (
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-slate-700 text-slate-300">
          Coming Soon
        </span>
      )}
    </div>
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
            link="/labs/mock-bruteforce"
            active
          />

          <LabCard
            title="Network Builder Lab"
            description="Interactive IT & Networking Basics lab. Build networks, configure devices, and validate connectivity."
            link="/labs/network-builder"
            active
          />

          <LabCard
            title="Password Hashing Lab"
            description="Explore hashing algorithms, salts, and secure password storage."
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
            description="Build a DMZ, configure firewall rules, and validate secure access."
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