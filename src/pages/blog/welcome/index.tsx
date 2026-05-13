import React from "react";
import Layout from "@theme/Layout";
import AuthorHeader from "@site/src/components/AuthorHeader";
import Head from "@docusaurus/Head";
import "./blog-post.css";

export default function WelcomeBlog() {
  return (
    <Layout>
        <Head>
        <title>Welcome to the CyberTrace Blog</title>
      </Head>

      <main className="blog-post">
        <AuthorHeader />

        <header className="blog-post-header">
          <h1>Welcome to the CyberTrace Blog</h1>
          <div className="blog-post-meta">
            <span className="blog-post-tag">Updated</span>
            <span className="blog-post-date">May 2026</span>
          </div>
        </header>

        <section className="blog-post-section">
          <p className="blog-post-intro">
            Welcome to the CyberTrace Blog, where I capture my journey through the development of the CyberTrace platform, the lab work that goes into it, and the engineering choices made throughout the way.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Why This Blog Exists</h2>
          <p>
            CyberTrace began as a personal experiment; a place where I could create the tools I wished existed during my learning journey in cybersecurity. As time passed, CyberTrace evolved to become an entire ecosystem of labs, utilities, and write-ups, transforming the study of security from theory to practice.
          </p>
          <p>
            Here is the place where I write about the process. No fancy marketing stuff.
            No fluffy business speak. Only the engineering reality, security
            concepts, and achievements – the late-night epiphanies, the design
            decisions that make the difference, the failures that require starting
            over, and the hard work of creating CyberTrace from scratch. Here you can
            find all the truth about CyberTrace development, testing and the
            platform itself.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>What You’ll See Here</h2>
          <ul>
            <li>Dev logs documenting lab development</li>
            <li>Breakdowns of design decisions and architecture</li>
            <li>Cybersecurity fundamentals explained simply</li>
            <li>Behind‑the‑scenes updates on the CyberTrace platform</li>
            <li>Reflections on the learning process and the state of cybersecurity education</li>
            <li>Game design systems, mechanics, and player experience</li>

          </ul>
        </section>

        <section className="blog-post-section">
          <h2>Where CyberTrace Is Going</h2>
          <p>
            The objective is to develop a set of tools that are thoughtful, educational, and realistic — combining both creativity and technical expertise. CyberTrace is an evolving process, as is my blog.
          </p>
          <p>
            Whether you’re here for the labs, the engineering breakdowns, or the
            cybersecurity insights, I’m glad you’re along for the ride.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Thanks for Being Here</h2>
          <p>
            There’s a lot coming soon new labs, new write‑ups, and deeper
            dives into the systems behind CyberTrace. This is just the
            beginning.
          </p>
        </section>
      </main>
    </Layout>
  );
}