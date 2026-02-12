import React from "react";
import NetworkBuilderApp from "../../../components/NetworkBuilder/NetworkBuilderApp";
import Layout from '@theme/Layout';

import { createNetworkBuilderEngine } from "../../../engine/network-builder/index.js";

export default function NetworkBuilderPage() {
  const engine = createNetworkBuilderEngine();

  return (
    <Layout
      title="Network Builder"
      description="Interactive IT & Networking Basics Lab"
    >
      <div style={{ padding: "20px" }}>
        <h1>Network Builder</h1>
        <p>Interactive IT & Networking Basics Lab</p>

        <NetworkBuilderApp engine={engine} />
      </div>
    </Layout>
  );
}