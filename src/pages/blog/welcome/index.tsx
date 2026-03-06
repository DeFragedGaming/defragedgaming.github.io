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
            <span className="blog-post-tag">Update</span>
            <span className="blog-post-date">February 2026</span>
          </div>
        </header>

        <section className="blog-post-section">
          <p className="blog-post-intro">
            Welcome to the CyberTrace Blog the place where I document the
            process of building the CyberTrace platform, the labs behind it, and
            the engineering decisions that shape everything along the way.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>Why This Blog Exists</h2>
          <p>
            CyberTrace started as a personal experiment a space to build tools
            I wish existed when I was learning cybersecurity. Over time, it’s
            grown into a full ecosystem of labs, utilities, and write‑ups
            designed to make security hands‑on instead of theoretical.
          </p>
          <p>
            This blog is where I share the journey. Not polished marketing. Not
            corporate fluff. Just real engineering, real security concepts, and
            real progress.
          </p>
        </section>

        <section className="blog-post-section">
          <h2>What You’ll See Here</h2>
          <ul>
            <li>Dev logs documenting lab development</li>
            <li>Breakdowns of design decisions and architecture</li>
            <li>Cybersecurity fundamentals explained simply</li>
            <li>Behind‑the‑scenes updates on the CyberTrace platform</li>
          </ul>
        </section>

        <section className="blog-post-section">
          <h2>Where CyberTrace Is Going</h2>
          <p>
            My goal is to build a suite of tools that feel intentional,
            educational, and realistic something that blends creativity with
            technical depth. CyberTrace is still evolving, and this blog will
            grow with it.
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