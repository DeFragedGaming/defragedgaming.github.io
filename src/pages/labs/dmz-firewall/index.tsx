import React, { FormEvent, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

type Asset = "Internet" | "DMZ Web" | "App API" | "Database" | "Staff" | "Admin VPN";
type Scope = "Any" | "Internet" | "DMZ" | "DMZ Web" | "Internal" | "App API" | "Database" | "Staff" | "Admin VPN";
type Service = "Any" | "HTTPS (TCP/443)" | "SSH (TCP/22)" | "API (TCP/8443)" | "PostgreSQL (TCP/5432)" | "SMB (TCP/445)" | "DNS (UDP/53)";
type Action = "ALLOW" | "DENY";

type FirewallRule = {
  id: string;
  name: string;
  source: Scope;
  destination: Scope;
  service: Service;
  action: Action;
};

type TrafficCheck = {
  id: string;
  title: string;
  source: Asset;
  destination: Asset;
  service: Exclude<Service, "Any">;
  expected: Action;
  rationale: string;
};

type CheckResult = {
  action: Action;
  matchedRule: string;
  passed: boolean;
};

const initialRules: FirewallRule[] = [
  { id: "rule-1", name: "Block direct internet access to internal", source: "Internet", destination: "Internal", service: "Any", action: "DENY" },
  { id: "rule-2", name: "Temporary public access to DMZ", source: "Internet", destination: "DMZ", service: "Any", action: "ALLOW" },
  { id: "rule-3", name: "Temporary DMZ access to internal", source: "DMZ", destination: "Internal", service: "Any", action: "ALLOW" },
  { id: "rule-4", name: "Temporary unrestricted internal egress", source: "Internal", destination: "Internet", service: "Any", action: "ALLOW" },
];

const trafficChecks: TrafficCheck[] = [
  {
    id: "public-https",
    title: "Public website",
    source: "Internet",
    destination: "DMZ Web",
    service: "HTTPS (TCP/443)",
    expected: "ALLOW",
    rationale: "The public web service should be reachable over encrypted web traffic.",
  },
  {
    id: "public-ssh",
    title: "Public administration attempt",
    source: "Internet",
    destination: "DMZ Web",
    service: "SSH (TCP/22)",
    expected: "DENY",
    rationale: "Administrative access must not be exposed to the public internet.",
  },
  {
    id: "web-api",
    title: "Web tier to application API",
    source: "DMZ Web",
    destination: "App API",
    service: "API (TCP/8443)",
    expected: "ALLOW",
    rationale: "The web tier needs one approved application service, not broad internal access.",
  },
  {
    id: "web-database",
    title: "Web tier to database",
    source: "DMZ Web",
    destination: "Database",
    service: "PostgreSQL (TCP/5432)",
    expected: "DENY",
    rationale: "The public-facing web server must not connect directly to the internal database.",
  },
  {
    id: "staff-https",
    title: "Staff web browsing",
    source: "Staff",
    destination: "Internet",
    service: "HTTPS (TCP/443)",
    expected: "ALLOW",
    rationale: "Staff can use approved encrypted web traffic for routine work.",
  },
  {
    id: "staff-smb",
    title: "Staff file-sharing egress",
    source: "Staff",
    destination: "Internet",
    service: "SMB (TCP/445)",
    expected: "DENY",
    rationale: "Unrestricted file-sharing traffic should not leave the organization.",
  },
  {
    id: "internet-staff",
    title: "Direct public access to staff network",
    source: "Internet",
    destination: "Staff",
    service: "HTTPS (TCP/443)",
    expected: "DENY",
    rationale: "The internet cannot initiate connections directly into the internal network.",
  },
];

const scopeOptions: Scope[] = ["Any", "Internet", "DMZ", "DMZ Web", "Internal", "App API", "Database", "Staff", "Admin VPN"];
const serviceOptions: Service[] = ["Any", "HTTPS (TCP/443)", "SSH (TCP/22)", "API (TCP/8443)", "PostgreSQL (TCP/5432)", "SMB (TCP/445)", "DNS (UDP/53)"];

function assetZone(asset: Asset) {
  if (asset === "Internet") return "Internet";
  if (asset === "DMZ Web") return "DMZ";
  if (asset === "Admin VPN") return "Admin VPN";
  return "Internal";
}

function scopeMatches(scope: Scope, asset: Asset) {
  if (scope === "Any") return true;
  if (scope === asset) return true;
  if (scope === "DMZ") return assetZone(asset) === "DMZ";
  if (scope === "Internal") return assetZone(asset) === "Internal";
  return false;
}

function evaluateTraffic(rules: FirewallRule[], check: TrafficCheck): CheckResult {
  const matchedRule = rules.find((rule) =>
    scopeMatches(rule.source, check.source)
    && scopeMatches(rule.destination, check.destination)
    && (rule.service === "Any" || rule.service === check.service),
  );
  const action = matchedRule?.action ?? "DENY";

  return {
    action,
    matchedRule: matchedRule?.name ?? "Implicit default deny",
    passed: action === check.expected,
  };
}

export default function DmzFirewallLab() {
  const [rules, setRules] = useState(initialRules);
  const [results, setResults] = useState<Record<string, CheckResult>>({});
  const [source, setSource] = useState<Scope>("Internet");
  const [destination, setDestination] = useState<Scope>("DMZ Web");
  const [service, setService] = useState<Service>("HTTPS (TCP/443)");
  const [action, setAction] = useState<Action>("ALLOW");
  const [nextRuleId, setNextRuleId] = useState(initialRules.length + 1);
  const passedCount = Object.values(results).filter((result) => result.passed).length;
  const allPassed = trafficChecks.every((check) => results[check.id]?.passed);

  function addRule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rule: FirewallRule = {
      id: `rule-${nextRuleId}`,
      name: `${action} ${source} → ${destination} · ${service}`,
      source,
      destination,
      service,
      action,
    };
    setRules((current) => [...current, rule]);
    setNextRuleId((current) => current + 1);
    setResults({});
  }

  function removeRule(id: string) {
    setRules((current) => current.filter((rule) => rule.id !== id));
    setResults({});
  }

  function runCheck(check: TrafficCheck) {
    setResults((current) => ({ ...current, [check.id]: evaluateTraffic(rules, check) }));
  }

  function runAllChecks() {
    setResults(Object.fromEntries(trafficChecks.map((check) => [check.id, evaluateTraffic(rules, check)])));
  }

  function resetPolicy() {
    setRules(initialRules);
    setResults({});
    setSource("Internet");
    setDestination("DMZ Web");
    setService("HTTPS (TCP/443)");
    setAction("ALLOW");
    setNextRuleId(initialRules.length + 1);
  }

  return (
    <Layout
      title="DMZ & Firewall Rules Lab"
      description="Harden a simulated DMZ firewall policy using ordered, least-privilege rules and traffic tests."
    >
      <main className={styles.lab}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>CYBERTRACE LABS / NETWORK DEFENSE</span>
              <h1>DMZ &amp; Firewall Rules</h1>
              <p>
                Harden a fictional perimeter policy. Replace broad access with
                least-privilege rules, then run traffic checks to see how the
                firewall evaluates each flow.
              </p>
            </div>
            <span className={styles.simulationBadge}><span /> LOCAL SIMULATION</span>
          </header>

          <section className={styles.summaryBar} aria-label="Policy status">
            <div><span>POLICY</span><strong>EDGE-FW-01</strong></div>
            <div><span>RULES</span><strong>{rules.length} + default deny</strong></div>
            <div><span>CHECKS PASSED</span><strong>{passedCount} / {trafficChecks.length}</strong></div>
            <div><span>MODE</span><strong className={styles.mode}>SIMULATED</strong></div>
          </section>

          <section className={styles.panel} aria-labelledby="topology-title">
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>SCENARIO NETWORK</span>
                <h2 id="topology-title">Protect the internal network</h2>
              </div>
              <span className={styles.smallBadge}>NO REAL TRAFFIC</span>
            </div>
            <div className={styles.topology} aria-label="Internet connects to the DMZ web server, which can reach the application API; staff and database are internal">
              <div className={`${styles.networkNode} ${styles.externalNode}`}>
                <span className={styles.nodeLabel}>UNTRUSTED</span>
                <strong>Internet</strong>
                <small>Public clients</small>
              </div>
              <span className={styles.connector} aria-hidden="true">⇄</span>
              <div className={`${styles.networkNode} ${styles.dmzNode}`}>
                <span className={styles.nodeLabel}>DMZ · 172.20.10.0/24</span>
                <strong>DMZ Web</strong>
                <small>172.20.10.10</small>
              </div>
              <span className={styles.connector} aria-hidden="true">⇄</span>
              <div className={`${styles.networkNode} ${styles.internalNode}`}>
                <span className={styles.nodeLabel}>INTERNAL · 10.20.0.0/16</span>
                <strong>App API</strong>
                <small>10.20.10.20</small>
              </div>
              <div className={styles.internalAssets}>
                <span>Database <strong>10.20.20.15</strong></span>
                <span>Staff <strong>10.20.30.0/24</strong></span>
              </div>
            </div>
            <p className={styles.topologyNote}>
              Policy objective: publish only the web service, allow only the web-to-API dependency,
              and deny unsolicited or unnecessary access by default.
            </p>
          </section>

          <div className={styles.objectives}>
            <section className={styles.panel} aria-labelledby="mission-title">
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.eyebrow}>YOUR MISSION</span>
                  <h2 id="mission-title">Tighten the baseline policy</h2>
                </div>
                <span className={styles.smallBadge}>7 VALIDATION CHECKS</span>
              </div>
              <ol className={styles.missionList}>
                <li>Remove temporary rules that allow any service through a boundary.</li>
                <li>Allow Internet → DMZ Web only for HTTPS.</li>
                <li>Allow DMZ Web → App API only for the API service.</li>
                <li>Allow Staff → Internet only for HTTPS; preserve default deny for everything else.</li>
              </ol>
              <div className={styles.rulePrinciples}>
                <strong>How evaluation works</strong>
                <p>Rules are checked from top to bottom. The first matching rule decides the action. If nothing matches, the firewall denies the traffic.</p>
              </div>
            </section>

            <section className={styles.panel} aria-labelledby="rules-title">
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.eyebrow}>EDGE-FW-01 / INBOUND + EGRESS</span>
                  <h2 id="rules-title">Ordered firewall policy</h2>
                </div>
                <button type="button" className={styles.resetButton} onClick={resetPolicy}>Reset policy</button>
              </div>
              <div className={styles.ruleTableWrap}>
                <table className={styles.ruleTable}>
                  <thead>
                    <tr><th>#</th><th>Action</th><th>Source</th><th>Destination</th><th>Service</th><th><span className={styles.visuallyHidden}>Rule actions</span></th></tr>
                  </thead>
                  <tbody>
                    {rules.map((rule, index) => (
                      <tr key={rule.id}>
                        <td className={styles.ruleNumber}>{String(index + 1).padStart(2, "0")}</td>
                        <td><span className={`${styles.actionBadge} ${rule.action === "ALLOW" ? styles.allow : styles.deny}`}>{rule.action}</span></td>
                        <td>{rule.source}</td>
                        <td>{rule.destination}</td>
                        <td>{rule.service}</td>
                        <td>
                          <button type="button" className={styles.removeButton} onClick={() => removeRule(rule.id)} aria-label={`Remove rule ${index + 1}: ${rule.name}`}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className={styles.defaultRule}>
                      <td>{String(rules.length + 1).padStart(2, "0")}</td>
                      <td><span className={`${styles.actionBadge} ${styles.deny}`}>DENY</span></td>
                      <td colSpan={3}>Any → Any · any service (implicit)</td>
                      <td>Locked</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <form className={styles.ruleForm} onSubmit={addRule}>
                <div className={styles.formHeading}>
                  <strong>Add a policy rule</strong>
                  <span>New rules are appended above the implicit default deny.</span>
                </div>
                <div className={styles.formGrid}>
                  <label>
                    Source
                    <select value={source} onChange={(event) => setSource(event.target.value as Scope)}>
                      {scopeOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                  <label>
                    Destination
                    <select value={destination} onChange={(event) => setDestination(event.target.value as Scope)}>
                      {scopeOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                  <label>
                    Service
                    <select value={service} onChange={(event) => setService(event.target.value as Service)}>
                      {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                  <label>
                    Action
                    <select value={action} onChange={(event) => setAction(event.target.value as Action)}>
                      <option value="ALLOW">ALLOW</option>
                      <option value="DENY">DENY</option>
                    </select>
                  </label>
                  <button type="submit" className={styles.addButton}>Add rule</button>
                </div>
              </form>
            </section>
          </div>

          <section className={styles.panel} aria-labelledby="checks-title">
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>POLICY VALIDATION</span>
                <h2 id="checks-title">Run simulated traffic checks</h2>
              </div>
              <button type="button" className={styles.runAllButton} onClick={runAllChecks}>Run all checks</button>
            </div>
            <div className={styles.checkGrid}>
              {trafficChecks.map((check) => {
                const result = results[check.id];
                return (
                  <article className={styles.checkCard} key={check.id}>
                    <div className={styles.checkHeading}>
                      <h3>{check.title}</h3>
                      {result && (
                        <span className={`${styles.resultBadge} ${result.passed ? styles.resultPass : styles.resultFail}`}>
                          {result.passed ? "PASS" : "REVIEW"}
                        </span>
                      )}
                    </div>
                    <p className={styles.flow}>{check.source} <span aria-hidden="true">→</span> {check.destination}<br /><strong>{check.service}</strong></p>
                    <p className={styles.rationale}>{check.rationale}</p>
                    {result && (
                      <p className={`${styles.resultDetail} ${result.passed ? styles.goodText : styles.badText}`} role="status">
                        {result.action} · {result.matchedRule}
                      </p>
                    )}
                    <button type="button" className={styles.checkButton} onClick={() => runCheck(check)}>
                      {result ? "Run again" : "Test traffic"}
                    </button>
                  </article>
                );
              })}
            </div>
            {allPassed && (
              <div className={styles.successBanner} role="status" aria-live="polite">
                <strong>Policy checks passed.</strong>
                <span>Public access is scoped, the DMZ has a limited application path, internal egress is restricted, and unmatched traffic is denied.</span>
              </div>
            )}
          </section>

          <section className={styles.learningPanel} aria-labelledby="takeaways-title">
            <span className={styles.eyebrow}>DEFENSE TAKEAWAYS</span>
            <h2 id="takeaways-title">A safer perimeter starts with explicit intent</h2>
            <div className={styles.learningGrid}>
              <p><strong>Least privilege</strong>Permit only the source, destination, and service needed for a documented business function.</p>
              <p><strong>Segment the DMZ</strong>A public-facing service should not have broad access to internal hosts or data stores.</p>
              <p><strong>Validate after changes</strong>Test both expected access and traffic that should remain blocked; review rule order and logs.</p>
            </div>
            <p className={styles.safetyNote}>This is an educational simulation. It does not configure a real firewall, send packets, or change network access.</p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
