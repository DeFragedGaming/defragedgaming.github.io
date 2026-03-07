import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { TerminalShell } from "../../components/TerminalShell";

export default function GamePage() {
  return (
    <>
      <Head>
        <title>CyberTrace Terminal</title>
        <meta name="description" content="CyberTrace OS Simulation" />
      </Head>
      <Layout>
        <TerminalShell />
      </Layout>
    </>
  );
}
