import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function LabsLanding() {
  return (
    <Layout title="Labs" description="Interactive cybersecurity labs and simulations.">
      <main style={{ padding: "2rem" }}>
        <h1>Cybersecurity Labs</h1>
        <p>
          Hands-on, interactive labs designed to teach cybersecurity concepts through safe,
          realistic simulations. Explore attack chains, analyze logs, and learn defensive
          techniques step-by-step.
        </p>

        <h2>Available Labs</h2>

        <ul>
          <li>
            <Link to="/labs/mock-bruteforce">Mock Brute-Force Attack Simulation</Link>
          </li>
        </ul>
      </main>
    </Layout>
  );
}