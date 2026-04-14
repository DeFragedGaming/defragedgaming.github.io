import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="CyberTrace Projects" />
      </Head>
      <Layout>
        <div style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
          <h1 style={{ color: "#e5e7eb" }}>Projects</h1>

          <div
            style={{
              border: "1px solid #1f2937",
              padding: "1.5rem",
              background: "#0f172a",
              marginTop: "1.5rem"
            }}
          >
            <h3 style={{ margin: 0, color: "#e5e7eb" }}>CyberTrace Terminal Game</h3>
            <p style={{ color: "#94a3b8" }}>Interactive CyberTrace OS simulation</p>
            <Link
              to="/game"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Launch
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #1f2937",
              padding: "1.5rem",
              background: "#0f172a",
              marginTop: "1.5rem"
            }}
          >
            <h3 style={{ margin: 0, color: "#e5e7eb" }}>BlackSpire: Depths of the Core</h3>
            <p style={{ color: "#94a3b8" }}>
              A dark‑fantasy mining RPG prototype set in the cursed depths beneath the BlackSpire.
            </p>
            <a
              href="https://cybertrace.itch.io/blackspire-depths"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Play on itch.io
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
