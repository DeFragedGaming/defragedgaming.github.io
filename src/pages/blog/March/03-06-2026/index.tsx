import React from "react";
import Layout from "@theme/Layout";
import AuthorHeader from "@site/src/components/AuthorHeader";
import Head from "@docusaurus/Head";

import "./blog-post.css";

export default function BruteForceSimulatorBlog() {
  return (
    <Layout>
      <Head>
        <title>Brute-Force Simulator Progress and Life in My Final Semester</title>
      </Head>

      <main className="blog-post">
        <AuthorHeader />

        <header className="blog-post-header">
          <h1>Brute-Force Simulator Progress and Life in My Final Semester</h1>
          <div className="blog-post-meta">
            <span className="blog-post-tag">Dev Log</span>
            <span className="blog-post-date">March 6, 2026</span>
            
          </div>
        </header>

        <section className="blog-post-section">
          <p className="blog-post-intro">
            The Brute-Force Simulator has evolved more in the last few weeks than it has in months. What started as a
            simple demonstration of brute-force mechanics is becoming a structured, cinematic, operator-style experience
            that mirrors how real attackers think and how real defenders learn. At the same time, life outside the
            keyboard has been just as intense I’m officially in my final semester of my BS in Cybersecurity, and
            everything is moving fast.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Evolving the Brute-Force Simulator</h2>
          <p>
            The biggest shift has been moving away from random behavior and toward a deliberate, phase-driven attack
            chain. Real brute-force operations follow a rhythm, and I wanted the simulator to reflect that. The new
            phase engine now controls:
          </p>
          <ul>
            <li>Reconnaissance and target preparation</li>
            <li>Dictionary and hybrid attack phases</li>
            <li>Mutation strategies and adaptive attempts</li>
            <li>Lockout and throttling behavior</li>
            <li>Outcome analysis tied to each phase</li>
          </ul>
          <p>
            The typing engine has also been upgraded to feel more intentional and cinematic. Commands scroll with
            purpose, output feels alive, and the entire flow finally resembles a real operator terminal instead of a
            prototype.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Technical Deep Dive: The Phase Engine</h2>
          <p>
            Under the hood, the BFS now uses a structured model that defines how each phase behaves and how the
            simulation progresses:
          </p>
          <ul>
            <li>Command sequencing</li>
            <li>Output pacing</li>
            <li>Branching logic</li>
            <li>Phase transitions</li>
            <li>Teaching notes tied to each stage</li>
          </ul>
          <p>
            This gives the simulator a sense of progression that’s both educational and immersive. It’s no longer a toy
            it’s becoming a realistic training tool.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>How This Fits Into My Portfolio</h2>
          <p>
            As I get closer to graduation, I’ve been thinking a lot about how my work represents me. The BFS is a
            perfect example of what I love building:
          </p>
          <ul>
            <li>Tools that teach</li>
            <li>Interfaces that feel intentional</li>
            <li>Realistic simulations</li>
            <li>Clean, cohesive UX with a strong identity</li>
          </ul>
          <p>
            It’s the kind of project that shows not just what I know, but how I think.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Life Lately: My Final Semester</h2>
          <p>
            Outside of development, life has been a whirlwind. I’m in my last semester of my BS in Cybersecurity, and
            it’s surreal to be this close to the finish line. Balancing school, labs, and everything else hasn’t been
            easy, but building these tools has kept me grounded. When coursework gets overwhelming, the BFS reminds me
            why I chose this field I love creating things that feel real and meaningful.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Career Goals After Graduation</h2>
          <p>As graduation gets closer, my goals are becoming clearer:</p>
          <ul>
            <li>Work in a role where I can build tools, not just use them</li>
            <li>Focus on security engineering, cyber ranges, or simulation development</li>
            <li>Keep blending creativity with technical depth</li>
            <li>Continue building educational tools that make cybersecurity more accessible</li>
          </ul>
          <p>
            I want to be somewhere that values realism, design, and teaching the same values behind this entire lab
            suite.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>What’s Next</h2>
          <p>The BFS still has more room to grow. Coming soon:</p>
          <ul>
            <li>More advanced hybrid attack phases</li>
            <li>Better visualization of mutation strategies</li>
            <li>A refined teaching panel</li>
            <li>More realistic lockout simulation</li>
            <li>A final attack summary that breaks down the entire chain</li>
          </ul>
          <p>
            This semester feels like a transition point academically, professionally, and creatively. The BFS has
            grown with me, and I’m excited to keep pushing it forward as I get closer to graduation.
          </p>
        </section>
      </main>
    </Layout>
  );
}