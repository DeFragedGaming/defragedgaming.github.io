import React from "react";
import Link from "@docusaurus/Link";

export default function ToolCategoryCard({ category }) {
  const Icon = category.icon || (() => null);

  return (
    <Link
      to={`/tools/${category.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "8px",
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "0.2s",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Icon width={32} height={32} />
          </div>

          <h3 style={{ margin: 0 }}>{category.name}</h3>
          <p style={{ color: "#aaa", marginTop: "8px" }}>
            {category.description}
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          {category.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#222",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#ccc",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}