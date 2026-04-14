import React from "react";
import Layout from "@theme/Layout";
import NetworkLab from "../../../ui/network-lab";

export default function NetworkBuilderPage() {
  return (
    <Layout
      title="Network Builder Lab"
      description="Interactive IT Networking Lab"
    >
      <NetworkLab />
    </Layout>
  );
}
