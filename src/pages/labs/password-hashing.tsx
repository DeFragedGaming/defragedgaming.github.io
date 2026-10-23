import React from "react";
import Layout from "@theme/Layout";

export default function PasswordHashingLab() {
  return (
    <Layout
      title="Password Hashing Lab"
      description="A CyberTrace lab for learning password hashing and secure storage."
    >
      <main className="min-h-screen px-6 py-16 text-slate-200">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            CyberTrace Labs
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white">Password Hashing Lab</h1>
          <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
              Under construction
            </span>
            <p className="mt-4 leading-7 text-slate-400">
              This lab is under construction. Guided exercises on password hashing and secure
              storage will be available here soon.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}