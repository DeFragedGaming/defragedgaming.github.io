import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function GamePage() {
  return (
    <>
      <Head>
        <title>CyberTrace Terminal</title>
        <meta name="description" content="CyberTrace OS Simulation" />
      </Head>
      <Layout>
        <BrowserOnly>
          {() => {
            const { TerminalShell } = require("../../components/TerminalShell");
            return <TerminalShell />;
          }}
        </BrowserOnly>
      </Layout>
    </>
  );
}
