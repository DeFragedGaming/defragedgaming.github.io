import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

type Tool = {
  name: string;
  description: string;
  whyUseful: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  url: string;
  docsUrl?: string;
  githubUrl?: string;
};

const identityTools: Tool[] = [
  {
    name: "Keycloak",
    description:
      "Keycloak is an open-source identity and access management platform supporting SSO, OAuth2, OpenID Connect, and user federation. It provides authentication flows, MFA, role-based access control, and identity brokering.",
    whyUseful:
      "Helps learners understand modern authentication protocols and how identity providers secure applications at scale.",
    difficulty: "Intermediate",
    tags: ["IAM", "SSO", "OAuth2"],
    url: "https://www.keycloak.org/",
    githubUrl: "https://github.com/keycloak/keycloak",
  },
  {
    name: "Auth0 (Free Tier)",
    description:
      "Auth0 is a cloud-based identity-as-a-service platform offering authentication, authorization, MFA, and user management. It integrates easily with modern applications and APIs.",
    whyUseful:
      "Shows how cloud IAM platforms implement secure authentication and how identity is centralized across applications.",
    difficulty: "Beginner",
    tags: ["Authentication", "MFA", "Identity"],
    url: "https://auth0.com/",
  },
  {
    name: "Open Policy Agent (OPA)",
    description:
      "OPA is a policy engine that decouples authorization logic from applications. It uses the Rego language to define fine-grained access control policies across microservices and cloud systems.",
    whyUseful:
      "Teaches how modern systems enforce authorization consistently and securely across distributed environments.",
    difficulty: "Advanced",
    tags: ["Authorization", "Policy", "Rego"],
    url: "https://www.openpolicyagent.org/",
    githubUrl: "https://github.com/open-policy-agent/opa",
  },
  {
    name: "LDAP Account Manager",
    description:
      "LDAP Account Manager provides a web interface for managing LDAP users, groups, and permissions. It simplifies working with directory services and enterprise identity structures.",
    whyUseful:
      "Helps learners understand directory-based identity systems and how enterprise IAM is structured.",
    difficulty: "Intermediate",
    tags: ["LDAP", "Directory Services", "IAM"],
    url: "https://www.ldap-account-manager.org/",
  },
  {
    name: "Kerbrute",
    description:
      "Kerbrute is a tool for enumerating and validating Active Directory accounts via Kerberos. It is commonly used in red team assessments and identity-focused security testing.",
    whyUseful:
      "Shows how attackers abuse authentication protocols and how defenders detect enumeration attempts.",
    difficulty: "Intermediate",
    tags: ["Kerberos", "AD", "Enumeration"],
    url: "https://github.com/ropnop/kerbrute",
    githubUrl: "https://github.com/ropnop/kerbrute",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>
      <p style={{ color: "#ccc", margin: 0 }}>{tool.description}</p>

      <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
        <strong>Why it’s useful:</strong> {tool.whyUseful}
      </p>

      <p style={{ color: "#aaa", fontSize: "0.85rem" }}>
        <strong>Difficulty:</strong> {tool.difficulty}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tool.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#222",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              color: "#ccc",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
        <Link
          to={tool.url}
          style={{
            background: "#0af",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "4px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Visit Tool
        </Link>

        {tool.githubUrl && (
          <Link
            to={tool.githubUrl}
            style={{
              background: "#0af",
              color: "#000",
              padding: "6px 12px",
              borderRadius: "4px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}

export default function IdentityPage() {
  return (
    <Layout
      title="Identity & Access Tools"
      description="Tools for authentication, authorization, and identity management."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Identity & Access Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Identity and access management tools help secure authentication, authorization, and user
          lifecycle management across applications and infrastructure. These tools support modern
          protocols like OAuth2, OIDC, SAML, and Kerberos, enabling secure identity workflows.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {identityTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}