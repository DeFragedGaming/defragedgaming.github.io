import React from "react";
import Layout from "@theme/Layout";
import AuthorHeader from "@site/src/components/AuthorHeader";
import Head from "@docusaurus/Head";
import "./blog-post.css";
export default function CyberTraceRoadmap() {
  return (
    
    <Layout>
      <Head>
        <title>CyberTrace: Signal Breach — Devlog & Roadmap</title>
      </Head>
      <main className="blog-post">
        <AuthorHeader />

        <article className="blog-post-container">
          <header className="blog-post-header">
            <h1>CyberTrace: Signal Breach — Devlog #1 & Roadmap</h1>
            <div className="blog-post-meta">
              <span className="blog-post-date">Devlog #1</span>
              <span className="blog-post-tag">Roadmap</span>
            </div>
          </header>

          <section className="blog-post-section">
            <p>
              CyberTrace: Signal Breach has officially entered its first public-facing
              development phase. What started as an experimental hacking-sim concept has
              evolved into a full-scale cyber-ops experience built around digital
              infiltration, signal warfare, and the corrupted underground network known as
              NullSecOS.
            </p>

            <h2>What Is CyberTrace: Signal Breach?</h2>
            <p>
              CyberTrace: Signal Breach is a stylized cyber-ops infiltration game where you
              operate inside a rogue operating system designed for covert digital warfare.
              The game blends terminal-driven infiltration, real-time signal manipulation,
              network mapping, breach escalation, and a dark glitch-heavy aesthetic.
            </p>

            <h2>Current Progress</h2>
            <ul>
              <li>CyberTrace emblem & visual identity</li>
              <li>NullSecOS terminal framework</li>
              <li>Core breach tools (prototype)</li>
              <li>Signal breach detection system</li>
            </ul>

            <h2>Official CyberTrace Roadmap</h2>

            <h3>PHASE 1 — Core Systems (Current)</h3>
            <ul>
              <li>NullSecOS terminal foundation</li>
              <li>Command interpreter</li>
              <li>Basic breach modules</li>
              <li>Node simulation</li>
              <li>Visual identity + UI theme</li>
            </ul>

            <h3>PHASE 2 — Network Layer & World Structure</h3>
            <ul>
              <li>Procedural network generation</li>
              <li>Node types & difficulty scaling</li>
              <li>Signal routing system</li>
              <li>Traceback mechanics</li>
              <li>Network map UI</li>
            </ul>

            <h3>PHASE 3 — Tools & Modules Expansion</h3>
            <ul>
              <li>20+ breach tools</li>
              <li>Encryption/decryption systems</li>
              <li>Payload injection</li>
              <li>Packet manipulation puzzles</li>
              <li>Counter-intrusion AI</li>
            </ul>

            <h3>PHASE 4 — Story & Campaign Layer</h3>
            <ul>
              <li>Introduction sequence</li>
              <li>First major breach mission</li>
              <li>Faction system</li>
              <li>Character dossiers</li>
              <li>Branching outcomes</li>
            </ul>

            <h3>PHASE 5 — Visual & Audio Polish</h3>
            <ul>
              <li>Glitch animation suite</li>
              <li>Terminal SFX</li>
              <li>Ambient ops-room audio</li>
              <li>Cinematic intro</li>
              <li>UI transitions</li>
            </ul>

            <h3>PHASE 6 — Public Demo Release</h3>
            <ul>
              <li>Playable breach loop</li>
              <li>5–7 nodes</li>
              <li>6 tools</li>
              <li>1 faction</li>
              <li>Save/load</li>
              <li>Steam/itch.io page launch</li>
            </ul>

            <h2>Closing Thoughts</h2>
            <p>
              CyberTrace: Signal Breach is shaping into a unique hybrid between a hacking
              sim, a puzzle system, and a narrative-driven cyber-ops thriller. The identity
              is locked. The tone is locked. The direction is locked. More devlogs coming
              soon.
            </p>

            <p>— Matthew, CyberTrace Studios</p>
          </section>
        </article>
      </main>
    </Layout>
  );
}
