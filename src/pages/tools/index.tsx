import React from "react";
import Layout from "@theme/Layout";
import { toolCategories } from "../../data/toolCategories";
import ToolCategoryCard from "../../components/ToolCategoryCard";

export default function ToolsOverview() {
  return (
    <Layout
      title="CyberTrace Tools Directory"
      description="A curated collection of free cybersecurity tools organized by category."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>CyberTrace Tools Directory</h1>

        <p style={{ color: "#aaa", marginBottom: "2rem" }}>
          Explore a comprehensive collection of free cybersecurity tools used by
          penetration testers, SOC analysts, DFIR investigators, threat hunters,
          and security engineers. Each category contains curated tools with
          descriptions, links, and practical use cases.
        </p>

        {/* 3‑Column Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {toolCategories.map((category) => (
            <ToolCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </Layout>
  );
}