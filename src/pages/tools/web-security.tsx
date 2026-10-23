import React from "react";
import Layout from "@theme/Layout";
import ToolCard from "../../components/ToolDirectoryCard";

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

const webTools: Tool[] = [
  {
    name: "OWASP ZAP",
    description:
      "OWASP ZAP is an open-source web application security scanner designed for finding vulnerabilities in web apps. It includes automated scanning, intercepting proxy capabilities, fuzzing, and passive analysis.",
    whyUseful:
      "Ideal for learning common web vulnerabilities and understanding how automated scanners identify weaknesses.",
    difficulty: "Beginner",
    tags: ["Scanner", "Proxy", "OWASP"],
    url: "https://www.zaproxy.org/",
    githubUrl: "https://github.com/zaproxy/zaproxy",
  },
  {
    name: "Burp Suite Community Edition",
    description:
      "Burp Suite Community Edition provides a powerful intercepting proxy, repeater, and manual testing tools for web application security. It is widely used by penetration testers and bug bounty hunters.",
    whyUseful:
      "Teaches how to intercept, modify, and replay HTTP requests — core skills for web pentesting.",
    difficulty: "Intermediate",
    tags: ["Proxy", "Manual Testing", "Web Security"],
    url: "https://portswigger.net/burp/communitydownload",
  },
  {
    name: "Ffuf",
    description:
      "Ffuf is a fast web fuzzing tool used for discovering directories, files, parameters, and virtual hosts. It is highly customizable and optimized for speed.",
    whyUseful:
      "Shows how enumeration reveals hidden attack surfaces and how fuzzing uncovers misconfigurations.",
    difficulty: "Intermediate",
    tags: ["Fuzzing", "Enumeration", "CLI"],
    url: "https://github.com/ffuf/ffuf",
    githubUrl: "https://github.com/ffuf/ffuf",
  },
  {
    name: "Nikto",
    description:
      "Nikto is a classic web server scanner that checks for outdated software, misconfigurations, and known vulnerabilities. It provides quick baseline assessments of web servers.",
    whyUseful:
      "Great for beginners learning how web servers expose risk through outdated components and insecure defaults.",
    difficulty: "Beginner",
    tags: ["Scanner", "Web Server", "Vulnerabilities"],
    url: "https://github.com/sullo/nikto",
    githubUrl: "https://github.com/sullo/nikto",
  },
  {
    name: "Postman",
    description:
      "Postman is an API testing platform that supports request crafting, authentication workflows, and automated testing. It is widely used for API security testing and development.",
    whyUseful:
      "Helps learners understand API behavior, authentication flows, and how attackers probe API endpoints.",
    difficulty: "Beginner",
    tags: ["API", "Testing", "Automation"],
    url: "https://www.postman.com/",
  },
];

export default function WebSecurityPage() {
  return (
    <Layout
      title="Web Application Security Tools"
      description="Tools for testing and securing web applications and APIs."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Web Application Security Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Web application security tools help identify vulnerabilities in websites and APIs. These
          tools support scanning, fuzzing, manual testing, and analysis of HTTP traffic to uncover
          weaknesses in authentication, input validation, and server configuration.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {webTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
