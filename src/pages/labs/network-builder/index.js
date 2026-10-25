import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

const starterDevices = [
  {
    name: "router1",
    role: "router",
    interfaces: {
      eth0: { ip: "192.168.10.1/24", peer: { device: "switch1", iface: "eth0" } },
      eth1: { ip: "192.168.20.1/24", peer: null },
    },
  },
  {
    name: "switch1",
    role: "switch",
    interfaces: {
      eth0: { ip: null, peer: { device: "router1", iface: "eth0" } },
      eth1: { ip: null, peer: { device: "host1", iface: "eth0" } },
    },
  },
  {
    name: "host1",
    role: "host",
    interfaces: {
      eth0: { ip: "192.168.10.10/24", peer: { device: "switch1", iface: "eth1" } },
    },
  },
];

const starterLinks = [
  { id: "router1:eth0<->switch1:eth0", a: { device: "router1", iface: "eth0" }, b: { device: "switch1", iface: "eth0" } },
  { id: "switch1:eth1<->host1:eth0", a: { device: "switch1", iface: "eth1" }, b: { device: "host1", iface: "eth0" } },
];

const starterCommands = [
  "net add-device router1 router",
  "net add-device switch1 switch",
  "net add-device host1 host",
  "net add-if router1 eth0",
  "net add-if switch1 eth0",
  "net add-if switch1 eth1",
  "net add-if host1 eth0",
  "net set-ip router1 eth0 192.168.10.1/24",
  "net set-ip host1 eth0 192.168.10.10/24",
  "net connect router1 eth0 switch1 eth0",
  "net connect switch1 eth1 host1 eth0",
];

function isValidCidr(value) {
  const match = value.match(/^(\d{1,3}\.){3}\d{1,3}\/(\d|[12]\d|3[0-2])$/);
  if (!match) return false;
  const address = value.split("/")[0].split(".");
  return address.every((octet) => Number(octet) <= 255);
}

function getInterface(device, name) {
  return device?.interfaces?.[name];
}

function ipv4ToNumber(address) {
  return address.split(".").reduce((result, octet) => ((result << 8) | Number(octet)) >>> 0, 0);
}

function isSameSubnet(cidrA, cidrB) {
  const [ipA, prefixA] = cidrA.split("/");
  const [ipB, prefixB] = cidrB.split("/");
  const prefix = Math.min(Number(prefixA), Number(prefixB));
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return (ipv4ToNumber(ipA) & mask) === (ipv4ToNumber(ipB) & mask);
}

function hasLayer2Path(source, destination, devices, links) {
  const queue = [source];
  const visited = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (current === destination) return true;
    if (visited.has(current)) continue;
    visited.add(current);
    const currentDevice = devices.find((device) => device.name === current);
    if (current !== source && currentDevice?.role !== "switch") continue;
    links.forEach((link) => {
      if (link.a.device === current && !visited.has(link.b.device)) queue.push(link.b.device);
      if (link.b.device === current && !visited.has(link.a.device)) queue.push(link.a.device);
    });
  }
  return false;
}

export default function NetworkBuilderPage() {
  const [devices, setDevices] = useState([]);
  const [links, setLinks] = useState([]);
  const [transcript, setTranscript] = useState([
    { kind: "system", text: "CYBERTRACE NETWORK LAB // LOCAL SIMULATION" },
    { kind: "system", text: "Build a small LAN. Type help to see available commands." },
  ]);
  const [command, setCommand] = useState("");
  const [errors, setErrors] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [transcript]);

  function write(lines, kind = "output") {
    const normalized = Array.isArray(lines) ? lines : [lines];
    setTranscript((current) => [
      ...current,
      ...normalized.map((text) => ({ kind, text })),
    ]);
  }

  function execute(rawCommand) {
    const raw = rawCommand.trim().replace(/\s+/g, " ");
    if (!raw) return;
    const tokens = raw.split(" ");
    const [root, sub, ...args] = tokens;
    const normalized = raw.toLowerCase();
    const result = (ok, message, extra = []) => {
      const lines = [...extra, message];
      write(`$ ${raw}`, "command");
      write(lines, ok ? "output" : "error");
      setLastResult({ ok, message });
      if (!ok) setErrors((count) => count + 1);
    };
    const findDevice = (name) => devices.find((device) => device.name === name);

    if (normalized === "help") {
      write(`$ ${raw}`, "command");
      write([
        "DEVICE COMMANDS",
        "  net add-device <name> <router|switch|host>",
        "  net add-if <device> <interface>",
        "  net set-ip <device> <interface> <address/prefix>",
        "  net connect <device> <interface> <device> <interface>",
        "INSPECT AND TEST",
        "  net show devices",
        "  net show if <device>",
        "  net ping <source-device> <destination-ip>",
        "  net clear",
        "Use Load starter topology to build a sample LAN, then inspect and test it.",
      ]);
      setLastResult({ ok: true, message: "Command reference displayed." });
      setCommand("");
      return;
    }

    if (normalized === "net clear") {
      setTranscript([]);
      setLastResult({ ok: true, message: "Terminal cleared." });
      setCommand("");
      return;
    }

    if (root !== "net") {
      result(false, "Commands must start with 'net'. Type help for usage.");
    } else if (sub === "add-device") {
      const [name, role] = args;
      if (args.length !== 2) result(false, "Usage: net add-device <name> <router|switch|host>");
      else if (!/^[a-z][a-z0-9-]{0,14}$/i.test(name)) result(false, "Use a name of 1–15 letters, numbers, or hyphens; it must start with a letter.");
      else if (!["router", "switch", "host"].includes(role)) result(false, "Role must be router, switch, or host.");
      else if (findDevice(name)) result(false, `Device '${name}' already exists.`);
      else {
        setDevices((current) => [...current, { name, role, interfaces: {} }]);
        result(true, `Added ${name} as a ${role}.`);
      }
    } else if (sub === "add-if") {
      const [name, ifaceName] = args;
      const device = findDevice(name);
      if (args.length !== 2) result(false, "Usage: net add-if <device> <interface>");
      else if (!device) result(false, `Device '${name}' was not found.`);
      else if (!/^[a-z][a-z0-9]{0,7}\d*$/i.test(ifaceName)) result(false, "Use a short interface name such as eth0 or lan1.");
      else if (device.interfaces[ifaceName]) result(false, `Interface '${ifaceName}' already exists on ${name}.`);
      else {
        setDevices((current) => current.map((item) => item.name === name
          ? { ...item, interfaces: { ...item.interfaces, [ifaceName]: { ip: null, peer: null } } }
          : item));
        result(true, `Added interface ${name}:${ifaceName}.`);
      }
    } else if (sub === "set-ip") {
      const [name, ifaceName, cidr] = args;
      const device = findDevice(name);
      const iface = getInterface(device, ifaceName);
      if (args.length !== 3) result(false, "Usage: net set-ip <device> <interface> <address/prefix>");
      else if (!iface) result(false, `Interface '${ifaceName}' was not found on ${name}.`);
      else if (!isValidCidr(cidr)) result(false, "Invalid IPv4 CIDR. Example: 192.168.10.10/24.");
      else {
        setDevices((current) => current.map((item) => item.name === name
          ? { ...item, interfaces: { ...item.interfaces, [ifaceName]: { ...iface, ip: cidr } } }
          : item));
        result(true, `Set ${name}:${ifaceName} to ${cidr}.`);
      }
    } else if (sub === "connect") {
      const [deviceA, ifaceAName, deviceB, ifaceBName] = args;
      const aDevice = findDevice(deviceA);
      const bDevice = findDevice(deviceB);
      const a = getInterface(aDevice, ifaceAName);
      const b = getInterface(bDevice, ifaceBName);
      if (args.length !== 4) result(false, "Usage: net connect <device> <interface> <device> <interface>");
      else if (deviceA === deviceB) result(false, "Connect interfaces on two different devices.");
      else if (!a || !b) result(false, "Both devices and interfaces must exist before connecting them.");
      else if (a.peer || b.peer) result(false, "One of those interfaces is already connected. Disconnect it before reusing it.");
      else {
        const id = `${deviceA}:${ifaceAName}<->${deviceB}:${ifaceBName}`;
        setDevices((current) => current.map((item) => {
          if (item.name === deviceA) return { ...item, interfaces: { ...item.interfaces, [ifaceAName]: { ...a, peer: { device: deviceB, iface: ifaceBName } } } };
          if (item.name === deviceB) return { ...item, interfaces: { ...item.interfaces, [ifaceBName]: { ...b, peer: { device: deviceA, iface: ifaceAName } } } };
          return item;
        }));
        setLinks((current) => [...current, { id, a: { device: deviceA, iface: ifaceAName }, b: { device: deviceB, iface: ifaceBName } }]);
        result(true, `Connected ${deviceA}:${ifaceAName} ↔ ${deviceB}:${ifaceBName}.`);
      }
    } else if (sub === "show" && args[0] === "devices") {
      if (devices.length === 0) result(true, "No devices yet. Add one with net add-device <name> <role>.");
      else result(true, `${devices.length} device(s) configured.`, devices.map((device) => `${device.name.padEnd(16)} ${device.role}  ${Object.keys(device.interfaces).length} interface(s)`));
    } else if (sub === "show" && args[0] === "if") {
      const name = args[1];
      const device = findDevice(name);
      if (args.length !== 2) result(false, "Usage: net show if <device>");
      else if (!device) result(false, `Device '${name}' was not found.`);
      else {
        const interfaces = Object.entries(device.interfaces);
        result(true, interfaces.length ? `Interfaces on ${name}:` : `No interfaces configured on ${name}.`, interfaces.map(([ifaceName, iface]) => `${ifaceName.padEnd(8)} ${iface.ip || "unassigned".padEnd(18)} peer=${iface.peer ? `${iface.peer.device}:${iface.peer.iface}` : "-"}`));
      }
    } else if (sub === "ping") {
      const [sourceName, destinationIp] = args;
      const source = findDevice(sourceName);
      const destination = devices.find((device) => Object.values(device.interfaces).some((iface) => iface.ip?.split("/")[0] === destinationIp));
      if (args.length !== 2) result(false, "Usage: net ping <source-device> <destination-ip>");
      else if (!source) result(false, `Source device '${sourceName}' was not found.`);
      else if (!destination) result(false, `No interface is configured with ${destinationIp}.`);
      else if (source.name === destination.name) result(true, `Reply from ${destinationIp}: destination is local to ${sourceName}.`);
      else {
        const hasLink = hasLayer2Path(sourceName, destination.name, devices, links);
        const sourceIfaces = Object.values(source.interfaces).filter((iface) => iface.ip && iface.peer);
        const targetIface = Object.values(destination.interfaces).find((iface) => iface.ip?.split("/")[0] === destinationIp);
        const sameSubnet = targetIface?.ip && sourceIfaces.some((sourceIface) => isSameSubnet(sourceIface.ip, targetIface.ip));
        if (!hasLink) result(false, `No Layer 2 path connects ${sourceName} to ${destination.name}. Check the links in your topology.`);
        else if (!sameSubnet) result(false, "Devices are linked but not in the same simulated IPv4 subnet; check their interface addresses and prefixes.");
        else result(true, `Reply from ${destinationIp}: bytes=32 time<1ms TTL=64  (simulated)`);
      }
    } else {
      result(false, `Unknown command '${sub || ""}'. Type help for available commands.`);
    }
    setCommand("");
    setHistory((current) => [...current, raw]);
    setHistoryIndex(-1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    execute(command);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setCommand(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next < history.length ? next : -1);
      setCommand(next < history.length ? history[next] : "");
    }
  }

  function loadStarterTopology() {
    setDevices(starterDevices);
    setLinks(starterLinks);
    setLastResult({ ok: true, message: "Starter LAN loaded. Try net show devices, net show if host1, and net ping host1 192.168.10.1." });
    write([
      "$ lab load starter-lan",
      "Loaded a router, switch, and host with two Ethernet links.",
      "Host host1: 192.168.10.10/24  →  Router router1: 192.168.10.1/24",
      "Try: net ping host1 192.168.10.1",
    ]);
  }

  function resetLab() {
    setDevices([]);
    setLinks([]);
    setTranscript([
      { kind: "system", text: "CYBERTRACE NETWORK LAB // LOCAL SIMULATION" },
      { kind: "system", text: "Workspace reset. Type help to see available commands." },
    ]);
    setErrors(0);
    setLastResult(null);
    setHistory([]);
    setHistoryIndex(-1);
    setCommand("");
    inputRef.current?.focus();
  }

  return (
    <Layout
      title="Network Builder Lab"
      description="Build and test a simulated network topology using an interactive workspace and network CLI."
    >
      <main className={styles.lab}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>CYBERTRACE LABS / NETWORKING</span>
              <h1>Network Builder</h1>
              <p>
                Assemble a small network, configure interfaces, and test connectivity.
                Use the terminal to build from scratch or load a starter LAN and explore
                how its devices fit together.
              </p>
            </div>
            <span className={styles.localBadge}><span /> SANDBOX</span>
          </header>

          <div className={styles.toolbar}>
            <div className={styles.toolbarStatus}>
              <span><strong>{devices.length}</strong> devices</span>
              <span><strong>{links.length}</strong> links</span>
              <span className={errors ? styles.warning : styles.ready}>
                <strong>{errors}</strong> command errors
              </span>
            </div>
            <div className={styles.toolbarActions}>
              <button type="button" className={styles.primaryButton} onClick={loadStarterTopology}>Load starter LAN</button>
              <button type="button" className={styles.secondaryButton} onClick={resetLab}>Reset workspace</button>
            </div>
          </div>

          <div className={styles.workspace}>
            <section className={styles.panel} aria-labelledby="topology-title">
              <div className={styles.panelHeader}>
                <div><span className={styles.eyebrow}>LIVE WORKSPACE</span><h2 id="topology-title">Topology</h2></div>
                <span className={styles.countBadge}>LOCAL SIMULATION</span>
              </div>
              {devices.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon} aria-hidden="true">◇</div>
                  <h3>Your workspace is ready</h3>
                  <p>Add a router, switch, and host with terminal commands—or load a starter LAN to inspect a working example.</p>
                  <button type="button" className={styles.textButton} onClick={loadStarterTopology}>Load the starter topology →</button>
                </div>
              ) : (
                <div className={styles.topology}>
                  <div className={styles.deviceGrid}>
                    {devices.map((device) => (
                      <article className={styles.deviceCard} key={device.name}>
                        <div className={`${styles.deviceGlyph} ${styles[`glyph_${device.role}`]}`} aria-hidden="true">
                          {device.role === "router" ? "R" : device.role === "switch" ? "S" : "H"}
                        </div>
                        <div className={styles.deviceHeading}>
                          <strong>{device.name}</strong>
                          <span>{device.role}</span>
                        </div>
                        <div className={styles.interfaces}>
                          {Object.entries(device.interfaces).length === 0
                            ? <span className={styles.unconfigured}>No interfaces configured</span>
                            : Object.entries(device.interfaces).map(([name, iface]) => (
                              <div className={styles.interfaceRow} key={name}>
                                <span>{name}</span>
                                <code>{iface.ip || "unassigned"}</code>
                                <small>{iface.peer ? `↔ ${iface.peer.device}:${iface.peer.iface}` : "not connected"}</small>
                              </div>
                            ))}
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className={styles.linkSummary} aria-label="Network links">
                    <strong>Physical links</strong>
                    {links.length === 0 ? (
                      <span>No links yet. Connect interfaces with <code>net connect</code>.</span>
                    ) : links.map((link) => (
                      <span key={link.id}>
                        <code>{link.a.device}:{link.a.iface}</code>
                        <b aria-hidden="true">⟷</b>
                        <code>{link.b.device}:{link.b.iface}</code>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <aside className={styles.sideColumn}>
              <section className={styles.panel} aria-labelledby="result-title">
                <div className={styles.panelHeader}>
                  <div><span className={styles.eyebrow}>LATEST COMMAND</span><h2 id="result-title">Command result</h2></div>
                </div>
                {lastResult ? (
                  <div className={`${styles.resultBox} ${lastResult.ok ? styles.resultSuccess : styles.resultError}`}>
                    <strong>{lastResult.ok ? "SUCCESS" : "CHECK COMMAND"}</strong>
                    <p>{lastResult.message}</p>
                  </div>
                ) : (
                  <p className={styles.muted}>Results and validation feedback appear here.</p>
                )}
              </section>
              <section className={styles.panel} aria-labelledby="reference-title">
                <div className={styles.panelHeader}>
                <div><span className={styles.eyebrow}>COMMAND REFERENCE</span><h2 id="reference-title">Try the starter LAN</h2></div>
                </div>
                <ol className={styles.commandReference}>
                <li><span>01</span><code>net show devices</code></li>
                <li><span>02</span><code>net show if host1</code></li>
                <li><span>03</span><code>net ping host1 192.168.10.1</code></li>
                </ol>
                <p className={styles.referenceNote}>Load the starter LAN above to try these commands, then reset it and build your own topology.</p>
              </section>
            </aside>
          </div>

          <section className={styles.terminalPanel} aria-labelledby="terminal-title">
            <div className={styles.panelHeader}>
              <div><span className={styles.eyebrow}>INTERACTIVE CLI</span><h2 id="terminal-title">Network terminal</h2></div>
              <button type="button" className={styles.textButton} onClick={() => execute("help")}>Command help</button>
            </div>
            <div className={styles.terminal} ref={terminalRef} role="log" aria-label="Network terminal output" aria-live="polite">
              {transcript.map((entry, index) => (
                <div className={`${styles.terminalLine} ${styles[`line_${entry.kind}`]}`} key={`${index}-${entry.text}`}>
                  {entry.kind === "command" && <span className={styles.prompt}>net@cybertrace:~$ </span>}
                  {entry.kind !== "command" && entry.kind !== "system" && <span className={styles.marker}>{entry.kind === "error" ? "!" : "›"}</span>}
                  <span>{entry.text}</span>
                </div>
              ))}
            </div>
            <form className={styles.commandForm} onSubmit={(event) => { event.preventDefault(); execute(command); }}>
              <label className={styles.prompt} htmlFor="network-command">net@cybertrace:~$</label>
              <input
                id="network-command"
                ref={inputRef}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Enter a network command…"
                aria-label="Enter a network command"
              />
              <button type="submit" disabled={!command.trim()}>Run</button>
            </form>
            <p className={styles.terminalHint}>Enter to run · ↑ / ↓ command history · Commands affect this local simulation only.</p>
          </section>

          <footer className={styles.footer}>
            <span>TRAINING SANDBOX</span>
            <span>No external network access · Reset clears the workspace</span>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
