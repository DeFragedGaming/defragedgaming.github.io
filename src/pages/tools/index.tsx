import React from "react";
import Layout from "@theme/Layout";

export default function ToolsOverview() {
  return (
    <Layout title="CyberTrace Tools" description="Browser-based cybersecurity tools for hands-on learning.">
      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>CyberTrace Tools</h1>

        <p>
          CyberTrace offers a range of actual, browser-based cybersecurity tools, each designed for hands-on, browser-based learning, exploring, and developing. 
          CyberTrace tools are modeled on actual operating workflows used by cybersecurity professionals, penetration testers, security analysts, and incident responders.
        </p>

        <p>
          Each individual tool is developed to provide guidance in key security principles via direct manipulation. Rather than requiring cumbersome installations, access to privileged system resources, or additional infrastructure, each individual utility functions solely inside a browser.
          It is via such a model that CyberTrace is able to offer exploration and understanding, making security principles accessible to beginners while still offering depth for more advanced individuals.
        </p>

        <hr style={{ margin: "2rem 0" }} />

        <h2>Hashing and Encoding Tools</h2>
        <p>
          These tools allow users to realize what happens to data when it is processed through a hash function and encoding schemes. Learners can see what happens to data when a small change is made to the input data. 
          All of this relates to one-way functions, entropy, and collision resistance. 
          By experimenting with real algorithms and real-time calculation, users can get a better understanding of what is happening to data and the security benefits of many modern technologies.
        </p>
        <ul>
          <li><strong>Hashing and Encoding Playground</strong> — Explore hashing algorithms, encodings, and data transformations in real time.</li>
        </ul>

        <h2>Log Analysis Tools</h2>
        <p>
          Log analysis is one of the most crucial skills in defensive security. These tools demonstrate the workflows from a security operation center for learners to find unusual behavior, anomalies within authentication, and early indicators of compromise.
          Working with realistic log formats and patterns allows users to develop the ability to trace activity across systems, to correlate events, and to delineate normal operations from malicious behavior. 
          This hands-on exposure builds the analytical mindset necessary for threat detection, incident response, and continuous monitoring roles.
        </p>
        <ul>
          <li><strong>Log Analyzer</strong> — Paste logs and analyze patterns, suspicious events, and authentication anomalies.</li>
        </ul>

        <h2>Network and Packet Tools</h2>
        <p>
          Understanding network traffic is vital in the process of threat hunting, intrusion detection, and incident responses. 
          It provides the following tools that introduce the structure of network packets, headers, and protocols in a safe, browser-contained environment. 
          With this tool, one can understand the level of information sharing between networks and how attackers exploit information-sharing vulnerabilities. 
          One can be able to understand network traffic and communicate with the network with the right confidence.

        </p>
        <ul>
          <li><strong>Packet Parser</strong> — Break down raw packet data into readable fields to understand network behavior.</li>
        </ul>

        <h2>Future Tools</h2>
        <p>
          This is how CyberTrace is built to expand. The following is a handpicked list of actual tools utilized by penetration testers, SOC analysts, and others in their line of duty. While these
          security engineers, and incident responders. These are types of utilities that are planned for expansion in the future.
        </p>

        <h3>Reconnaissance and Scanning</h3>
        <ul>
          <li>Nmap — Network discovery and port scanning.</li>
          <li>Masscan — High-speed internet-scale port scanning.</li>
          <li>Amass — External asset discovery and enumeration.</li>
          <li>Shodan — Search engine for internet-connected devices.</li>
          <li>WhatWeb — Web fingerprinting and technology detection.</li>
        </ul>

        <h3>Web Application and API Testing</h3>
        <ul>
          <li>Burp Suite — Web application security testing platform.</li>
          <li>OWASP ZAP — Open-source web application scanner.</li>
          <li>Postman — API testing and workflow automation.</li>
          <li>Ffuf — Fast web fuzzing for directories and parameters.</li>
          <li>Nikto — Web server vulnerability scanning.</li>
        </ul>

        <h3>Password and Credential Tools</h3>
        <ul>
          <li>Hashcat — GPU-accelerated password auditing.</li>
          <li>John the Ripper — Password recovery and auditing.</li>
          <li>Hydra — Network login testing and credential validation.</li>
          <li>KeePassXC — Secure credential storage for testing environments.</li>
        </ul>

        <h3>Endpoint and Host Security</h3>
        <ul>
          <li>Sysinternals Suite — Windows diagnostics and forensic utilities.</li>
          <li>OSQuery — SQL-based endpoint visibility and monitoring.</li>
          <li>Velociraptor — Endpoint forensics and incident response.</li>
          <li>Wazuh — Open-source SIEM and endpoint monitoring.</li>
        </ul>

        <h3>SOC, SIEM, and Log Analysis</h3>
        <ul>
          <li>Splunk — Enterprise log aggregation and analysis.</li>
          <li>Elastic Security — Log ingestion, search, and detection.</li>
          <li>Graylog — Log management and alerting.</li>
          <li>CrowdStrike Falcon — Endpoint detection and response.</li>
          <li>Microsoft Defender for Endpoint — Enterprise endpoint protection and telemetry.</li>
        </ul>

        <h3>Cloud Security</h3>
        <ul>
          <li>AWS Security Hub — Cloud security posture management.</li>
          <li>Microsoft Sentinel — Cloud-native SIEM and SOAR.</li>
          <li>Prowler — Multi-cloud security auditing.</li>
          <li>ScoutSuite — Cloud security posture assessment.</li>
        </ul>

        <h3>Threat Intelligence and Hunting</h3>
        <ul>
          <li>MISP — Threat intelligence sharing platform.</li>
          <li>VirusTotal — File, URL, and hash reputation analysis.</li>
          <li>YARA — Pattern matching for malware and threat hunting.</li>
        </ul>

        <h3>Network and Packet Analysis</h3>
        <ul>
          <li>Wireshark — Packet capture and analysis.</li>
          <li>tcpdump — Command-line packet capture.</li>
          <li>Zeek — Network security monitoring and protocol analysis.</li>
        </ul>

        <h3>Security Engineering and Automation</h3>
        <ul>
          <li>Terraform — Infrastructure as code for secure deployments.</li>
          <li>Ansible — Automated configuration and hardening.</li>
          <li>Vault — Secrets management and encryption.</li>
          <li>OpenVAS — Vulnerability scanning platform.</li>
        </ul>

        <hr style={{ margin: "2rem 0" }} />

        <p>
          These represent the overall security environment and types of capabilities that CyberTrace hopes to provide.
          into the browser in future releases. They give learners an idea of what professionals use in real
          Environments and help understand the competencies being developed via the platform.
        </p>
      </main>
    </Layout>
  );
}