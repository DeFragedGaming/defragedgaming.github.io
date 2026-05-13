import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

function BlogCard({ title, description, date, link, tag }) {
  const normalizedLink = `/blog/${link.replace(/^\//, '')}`;

  return (
    <div
      className="
        p-6 rounded-xl border bg-slate-900/40 transition
        border-cyan-500/20 hover:border-cyan-400
        hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
      "
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400">{date}</span>
        {tag && (
          <span className="px-2 py-1 text-[10px] rounded bg-slate-700 text-slate-300">
            {tag}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-cyan-300">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>

      <Link className="button button--primary" to={normalizedLink}>
        Read More
      </Link>
    </div>
  );
}

export default function BlogHome() {
  return (
    <Layout>
      <Head>
        <title>CyberTrace Blog</title>
        <meta
          name="description"
          content="Updates, dev logs, cybersecurity insights, and behind‑the‑scenes posts from the CyberTrace project."
        />
      </Head>

      <div className="px-6 py-16 max-w-6xl mx-auto text-slate-200">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">
            CyberTrace Blog
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dev logs, platform updates, cybersecurity insights, and behind‑the‑scenes posts from the CyberTrace project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <BlogCard
            title="Welcome to the CyberTrace Blog"
            description="A quick overview of what this blog will cover, why it exists, and what’s coming next."
            date="Feb 2026"
            link="/welcome"
            tag="Update"
          />

          <BlogCard
            title="Building the Network Builder Lab"
            description="A breakdown of the architecture, challenges, and design decisions behind the Network Builder Lab."
            date="Coming Soon"
            link="network-builder-devlog"
            tag="Dev Log"
          />

          <BlogCard
            title="Cybersecurity Fundamentals: Hashing"
            description="A beginner‑friendly explanation of hashing, salts, and why password storage matters."
            date="May 2026"
            link="May/05-13-2026"
            tag="Cybersecurity"
          />

          <BlogCard
            title="Brute-Force Simulator Progress and Life in My Final Semester"
            date="March 2026"
            tag="Dev Log"
            description="A deep dive into the BFS improvements, the new phase engine, and a personal update as I enter my final semester of my BS in Cybersecurity."
            link="March/03-06-2026"

          />

        </div>
      </div>
    </Layout>
  );
}