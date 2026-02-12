import React from "react";
import NetworkBuilderApp from "../../../components/NetworkBuilder/NetworkBuilderApp";
import Layout from '@theme/Layout';

export default function NetworkBuilderPage() {
  return (
    <Layout
      title="Network Builder"
      description="Interactive IT & Networking Basics Lab"
    >
      <div style={{ padding: "20px" }}>
        <h1>Network Builder</h1>
        <p>Interactive IT & Networking Basics Lab</p>
        <NetworkBuilderApp />
      </div>
    </Layout>
  );
}