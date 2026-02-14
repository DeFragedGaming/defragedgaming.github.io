import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function BlogPostPage({ content: BlogPost }) {
  const { metadata } = BlogPost;
  const { title, description, authors } = metadata;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="px-6 py-20 max-w-5xl mx-auto text-slate-200">
        <h1 className="text-4xl font-bold mb-6 text-cyan-400">{title}</h1>

        <div className="text-slate-400 mb-12 text-sm">
          <span>{metadata.formattedDate}</span>
          {metadata.readingTime && (
            <span className="ml-3">
              {Math.ceil(metadata.readingTime)} min read
            </span>
          )}
        </div>

        {authors && authors.length > 0 && (
          <div className="flex items-center gap-4 mb-12 p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
            {authors[0].imageURL && (
              <img
                src={authors[0].imageURL}
                alt={authors[0].name}
                className="w-14 h-14 rounded-full border border-cyan-500/30"
              />
            )}
            <div>
              <div className="text-cyan-300 font-semibold">{authors[0].name}</div>
              {authors[0].title && (
                <div className="text-slate-400 text-sm">{authors[0].title}</div>
              )}
            </div>
          </div>
        )}

        <div className="border border-cyan-500/20 rounded-xl p-10 bg-slate-900/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
          <article className="prose prose-invert prose-slate max-w-none">
            <BlogPost />
          </article>
        </div>
      </div>
    </Layout>
  );
}