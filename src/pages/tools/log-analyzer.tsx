import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import LogAnalyzer from "../../components/LogAnalyzer/LogAnalyzer";

export default function LogAnalyzerPage() {
  return (
    <Layout>
      <Head>
        <title>Log Analyzer</title>
        <meta name="description" content="CyberTrace log analysis tool" />
      </Head>

      <main className="bg-slate-950/95 py-10 text-slate-50 min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <LogAnalyzer />
        </div>
      </main>
    </Layout>
  );
}
