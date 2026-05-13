import React from "react";
import Layout from "@theme/Layout";
import AuthorHeader from "@site/src/components/AuthorHeader";
import Head from "@docusaurus/Head";
import "./blog-post.css";

export default function HashingPlaygroundBlog() {
  return (
    <Layout>
      <Head>
        <title>Cybersecurity Fundamentals: Hashing</title>
      </Head>

      <main className="blog-post">
        <AuthorHeader />

        <header className="blog-post-header">
          <h1>Cybersecurity Fundamentals: Hashing</h1>
          <div className="blog-post-meta">
            <span className="blog-post-tag">Lab</span>
            <span className="blog-post-date">May 2026</span>
            <span className="blog-post-read">3 min read</span>
          </div>
        </header>

        <p className="blog-post-intro">
          Hashing is one of the most fundamental concepts in cybersecurity.
          The CyberTrace Hashing Playground demonstrates how hashing, salting,
          stretching, and storage formats work in real systems and how attackers
          analyze weak configurations.
        </p>

        <section className="blog-post-section">
          <h2>What Is Hashing?</h2>
          <p>
            Hashing transforms input data into a fixed‑length, irreversible digest.
            A secure hash function is deterministic, irreversible, and exhibits the
            avalanche effect small changes in input produce drastically different
            outputs.
          </p>
          <p>
            In the Hashing Playground, you can experiment with different passwords
            and instantly see how the digest changes. This helps you understand why
            hashing is used instead of storing raw passwords.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Why Password Hashing Matters</h2>
          <p>
            If a database is compromised, attackers should never gain access to
            real passwords. Secure systems store a hash, a salt, the algorithm,
            and the iteration count. The lab demonstrates how each of these
            components affects security and how attackers interpret them.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Salting: Breaking Rainbow Tables</h2>
          <p>
            A salt is a random value added to the password before hashing.
            Without salts, identical passwords produce identical hashes. The lab
            shows how salts prevent large‑scale precomputed attacks and why unique
            per‑user salts are essential.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Key Stretching: Slowing Down Attackers</h2>
          <p>
            Attackers use GPUs and ASICs to brute‑force hashes. Key stretching
            increases the computational cost of each guess. The lab lets you adjust
            iteration counts and observe how attacker difficulty changes in real
            time.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Storage Records</h2>
          <p>
            Real systems store password hashes in a structured format that includes
            the algorithm, iteration count, salt, and final digest:
          </p>

          <pre className="blog-post-code">
            algorithm$iterations$salt$hash
          </pre>

          <p>
            The Hashing Playground generates this exact format so you can see what
            an attacker sees when they obtain a credential database.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Attacker Perspective</h2>
          <p>
            One of the most unique features of the lab is the attacker console.
            It reacts dynamically to weak configurations missing salts, low
            iteration counts, and legacy algorithms helping you understand how
            attackers evaluate password storage.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Defender Perspective</h2>
          <p>
            The defender panel mirrors real‑world engineering decisions: selecting
            algorithms, generating salts, tuning iteration counts, and balancing
            performance with security. Every change teaches you how modern password
            storage is designed.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Phase System</h2>
          <p>The lab is divided into five phases:</p>
          <ul>
            <li>Fundamentals</li>
            <li>Salting</li>
            <li>Stretching</li>
            <li>Storage</li>
            <li>Attacks</li>
          </ul>
          <p>
            Each phase includes a headline, description, attacker focus, defender
            objective, and key observations.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Why This Lab Exists</h2>
          <p>
            Most hashing tutorials are too shallow or too academic. The CyberTrace
            Hashing Playground provides real hashing, real iteration costs, real
            attacker logic,            and real storage formats making it a practical learning
            tool for anyone studying cybersecurity.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Final Thoughts</h2>
          <p>
            Hashing is foundational to cybersecurity. This lab gives you a
            hands‑on, attacker‑aware way to learn it. Experiment with salts,
            algorithms, and iteration counts to see how each decision affects
            security.
          </p>
        </section>
      </main>
    </Layout>
  );
}
