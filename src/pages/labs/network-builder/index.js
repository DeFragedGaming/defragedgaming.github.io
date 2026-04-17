import React, { useState } from "react";
import Layout from "@theme/Layout";

function LeftPanel() {
  const section = {
    marginBottom: "1rem",
    borderBottom: "1px solid #1f2937",
    paddingBottom: "0.75rem"
  };

  const title = {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#e5e7eb",
    marginBottom: "0.25rem"
  };

  const item = {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginBottom: "0.15rem"
  };

  return (
    <div
      style={{
        width: "280px",
        background: "#020617",
        borderRight: "1px solid #1f2937",
        color: "#e5e7eb",
        padding: "1rem",
        overflowY: "auto"
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>
        Network Builder Reference
      </h2>

      <div style={section}>
        <div style={title}>Devices</div>
        <div style={item}>net add-device &lt;name&gt; &lt;role&gt;</div>
        <div style={item}>roles: router | switch | host</div>
        <div style={item}>example: net add-device r1 router</div>
      </div>

      <div style={section}>
        <div style={title}>Interfaces</div>
        <div style={item}>net add-if &lt;device&gt; &lt;ifname&gt;</div>
        <div style={item}>example: net add-if r1 eth0</div>
        <div style={item}>net set-ip &lt;device&gt; &lt;ifname&gt; &lt;cidr&gt;</div>
        <div style={item}>example: net set-ip r1 eth0 10.0.0.1/24</div>
      </div>

      <div style={section}>
        <div style={title}>Links</div>
        <div style={item}>net connect &lt;dev1&gt; &lt;if1&gt; &lt;dev2&gt; &lt;if2&gt;</div>
        <div style={item}>example: net connect r1 eth0 s1 eth0</div>
      </div>

      <div style={section}>
        <div style={title}>Inspection</div>
        <div style={item}>net show devices</div>
        <div style={item}>net show if &lt;device&gt;</div>
        <div style={item}>example: net show if r1</div>
      </div>

      <div style={section}>
        <div style={title}>Connectivity</div>
        <div style={item}>net ping &lt;srcDevice&gt; &lt;dstIP&gt;</div>
        <div style={item}>example: net ping r1 10.0.0.2</div>
      </div>
    </div>
  );
}

function TerminalPanel({ output, onCommand }) {
  const [cmd, setCmd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = cmd.trim();
    if (!trimmed) return;
    onCommand(trimmed);
    setCmd("");
  };

  return (
    <div
      style={{
        flex: 1,
        background: "#020617",
        color: "#e5e7eb",
        padding: "1rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          marginBottom: "0.75rem",
          border: "1px solid #1f2937",
          padding: "0.5rem",
          background: "#020617"
        }}
      >
        {output.length === 0 ? (
          <div style={{ color: "#64748b" }}>net: ready for commands</div>
        ) : (
          output.map((line, i) => <div key={i}>{line}</div>)
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            background: "#020617",
            border: "1px solid #334155",
            color: "#e5e7eb",
            fontFamily: "monospace",
            fontSize: "0.85rem"
          }}
        />
      </form>
    </div>
  );
}

function RightPanel({ lastResult }) {
  return (
    <div
      style={{
        width: "280px",
        background: "#020617",
        borderLeft: "1px solid #1f2937",
        color: "#e5e7eb",
        padding: "1rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2 style={{ marginBottom: "0.75rem", fontSize: "1rem" }}>
        Command Result
      </h2>
      {lastResult ? (
        <>
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
              color: lastResult.ok ? "#4ade80" : "#f97373"
            }}
          >
            {lastResult.ok ? "SUCCESS" : "FAIL"}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.8rem",
              whiteSpace: "pre-wrap"
            }}
          >
            {lastResult.message}
          </div>
        </>
      ) : (
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
          No command executed yet.
        </div>
      )}
    </div>
  );
}

function BottomPanel({ errors }) {
  return (
    <div
      style={{
        height: "140px",
        background: "#020617",
        borderTop: "1px solid #1f2937",
        color: "#fca5a5",
        padding: "0.75rem",
        fontFamily: "monospace",
        fontSize: "0.8rem",
        overflowY: "auto"
      }}
    >
      {errors.length === 0 ? (
        <div style={{ color: "#64748b" }}>no errors</div>
      ) : (
        errors.map((e, i) => <div key={i}>{e}</div>)
      )}
    </div>
  );
}

export default function NetworkBuilderPage() {
  const [devices, setDevices] = useState([]);
  const [links, setLinks] = useState([]);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [errors, setErrors] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const appendOutput = (line) =>
    setTerminalOutput((prev) => [...prev, line]);

  const appendError = (line) =>
    setErrors((prev) => [...prev, line]);

  const findDevice = (name) =>
    devices.find((d) => d.name === name);

  const updateDevice = (updated) =>
    setDevices((prev) => prev.map((d) => (d.name === updated.name ? updated : d)));

  const handleCommand = (raw) => {
    appendOutput(`$ ${raw}`);
    const tokens = raw.split(/\s+/);
    if (tokens[0] !== "net") {
      const msg = "command must start with 'net'";
      appendError(msg);
      setLastResult({ ok: false, message: msg });
      return;
    }

    if (tokens.length === 1) {
      const msg = "missing subcommand";
      appendError(msg);
      setLastResult({ ok: false, message: msg });
      return;
    }

    const sub = tokens[1];

    if (sub === "add-device") {
      if (tokens.length !== 4) {
        const msg = "usage: net add-device <name> <role>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const name = tokens[2];
      const role = tokens[3];
      if (!["router", "switch", "host"].includes(role)) {
        const msg = "role must be router | switch | host";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      if (findDevice(name)) {
        const msg = `device '${name}' already exists`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const dev = {
        name,
        role,
        interfaces: {}
      };
      setDevices((prev) => [...prev, dev]);
      const msg = `device added: ${name} (${role})`;
      appendOutput(msg);
      setLastResult({ ok: true, message: msg });
      return;
    }

    if (sub === "add-if") {
      if (tokens.length !== 4) {
        const msg = "usage: net add-if <device> <ifname>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const devName = tokens[2];
      const ifname = tokens[3];
      const dev = findDevice(devName);
      if (!dev) {
        const msg = `device not found: ${devName}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      if (dev.interfaces[ifname]) {
        const msg = `interface already exists: ${devName} ${ifname}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const updated = {
        ...dev,
        interfaces: {
          ...dev.interfaces,
          [ifname]: { ip: null, peer: null }
        }
      };
      updateDevice(updated);
      const msg = `interface added: ${devName} ${ifname}`;
      appendOutput(msg);
      setLastResult({ ok: true, message: msg });
      return;
    }

    if (sub === "set-ip") {
      if (tokens.length !== 5) {
        const msg = "usage: net set-ip <device> <ifname> <cidr>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const devName = tokens[2];
      const ifname = tokens[3];
      const cidr = tokens[4];
      const dev = findDevice(devName);
      if (!dev) {
        const msg = `device not found: ${devName}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const iface = dev.interfaces[ifname];
      if (!iface) {
        const msg = `interface not found: ${devName} ${ifname}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const updated = {
        ...dev,
        interfaces: {
          ...dev.interfaces,
          [ifname]: { ...iface, ip: cidr }
        }
      };
      updateDevice(updated);
      const msg = `ip set: ${devName} ${ifname} ${cidr}`;
      appendOutput(msg);
      setLastResult({ ok: true, message: msg });
      return;
    }

    if (sub === "connect") {
      if (tokens.length !== 6) {
        const msg = "usage: net connect <dev1> <if1> <dev2> <if2>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const d1 = tokens[2];
      const i1 = tokens[3];
      const d2 = tokens[4];
      const i2 = tokens[5];

      const dev1 = findDevice(d1);
      const dev2 = findDevice(d2);
      if (!dev1) {
        const msg = `device not found: ${d1}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      if (!dev2) {
        const msg = `device not found: ${d2}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const if1 = dev1.interfaces[i1];
      const if2 = dev2.interfaces[i2];
      if (!if1) {
        const msg = `interface not found: ${d1} ${i1}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      if (!if2) {
        const msg = `interface not found: ${d2} ${i2}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }

      const linkId = `${d1}:${i1}<->${d2}:${i2}`;
      if (links.find((l) => l.id === linkId)) {
        const msg = `link already exists: ${linkId}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }

      const updated1 = {
        ...dev1,
        interfaces: {
          ...dev1.interfaces,
          [i1]: { ...if1, peer: { device: d2, iface: i2 } }
        }
      };
      const updated2 = {
        ...dev2,
        interfaces: {
          ...dev2.interfaces,
          [i2]: { ...if2, peer: { device: d1, iface: i1 } }
        }
      };

      setDevices((prev) =>
        prev.map((d) =>
          d.name === updated1.name ? updated1 : d.name === updated2.name ? updated2 : d
        )
      );
      setLinks((prev) => [
        ...prev,
        { id: linkId, a: { device: d1, iface: i1 }, b: { device: d2, iface: i2 } }
      ]);

      const msg = `link created: ${d1} ${i1} <-> ${d2} ${i2}`;
      appendOutput(msg);
      setLastResult({ ok: true, message: msg });
      return;
    }

    if (sub === "show") {
      if (tokens.length < 3) {
        const msg = "usage: net show devices | net show if <device>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const what = tokens[2];
      if (what === "devices") {
        if (devices.length === 0) {
          const msg = "no devices";
          appendOutput(msg);
          setLastResult({ ok: true, message: msg });
          return;
        }
        devices.forEach((d) => {
          appendOutput(`${d.name}\t${d.role}`);
        });
        setLastResult({ ok: true, message: "listed devices" });
        return;
      }
      if (what === "if") {
        if (tokens.length !== 4) {
          const msg = "usage: net show if <device>";
          appendError(msg);
          setLastResult({ ok: false, message: msg });
          return;
        }
        const devName = tokens[3];
        const dev = findDevice(devName);
        if (!dev) {
          const msg = `device not found: ${devName}`;
          appendError(msg);
          setLastResult({ ok: false, message: msg });
          return;
        }
        const names = Object.keys(dev.interfaces);
        if (names.length === 0) {
          const msg = `no interfaces on ${devName}`;
          appendOutput(msg);
          setLastResult({ ok: true, message: msg });
          return;
        }
        names.forEach((n) => {
          const iface = dev.interfaces[n];
          const ip = iface.ip || "-";
          const peer = iface.peer
            ? `${iface.peer.device}:${iface.peer.iface}`
            : "-";
          appendOutput(`${devName} ${n}\tip=${ip}\tpeer=${peer}`);
        });
        setLastResult({ ok: true, message: `listed interfaces for ${devName}` });
        return;
      }
      const msg = `unknown show target: ${what}`;
      appendError(msg);
      setLastResult({ ok: false, message: msg });
      return;
    }

    if (sub === "ping") {
      if (tokens.length !== 4) {
        const msg = "usage: net ping <srcDevice> <dstIP>";
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }
      const srcName = tokens[2];
      const dstIp = tokens[3];
      const src = findDevice(srcName);
      if (!src) {
        const msg = `device not found: ${srcName}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }

      let dstDevice = null;
      devices.forEach((d) => {
        Object.values(d.interfaces).forEach((iface) => {
          if (iface.ip && iface.ip.split("/")[0] === dstIp) {
            dstDevice = d;
          }
        });
      });

      if (!dstDevice) {
        const msg = `no interface with ip ${dstIp}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }

      const directLink = links.find(
        (l) =>
          (l.a.device === srcName && l.b.device === dstDevice.name) ||
          (l.b.device === srcName && l.a.device === dstDevice.name)
      );

      if (!directLink) {
        const msg = `no direct link between ${srcName} and ${dstDevice.name}`;
        appendError(msg);
        setLastResult({ ok: false, message: msg });
        return;
      }

      appendOutput(`PING ${dstIp} from ${srcName}: success`);
      setLastResult({
        ok: true,
        message: `ping ${dstIp} from ${srcName} -> ${dstDevice.name}: success`
      });
      return;
    }

    const msg = `unknown subcommand: ${sub}`;
    appendError(msg);
    setLastResult({ ok: false, message: msg });
  };

  return (
    <Layout title="Network Builder" description="CyberTrace Network Builder Lab">
      <div
        style={{
          height: "calc(100vh - 60px)",
          width: "100%",
          background: "#020617",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            padding: "0.75rem 1.5rem",
            borderBottom: "1px solid #1f2937",
            background: "#020617",
            color: "#e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.95rem"
          }}
        >
          <div style={{ fontWeight: 600 }}>CyberTrace Labs</div>
          <div style={{ color: "#64748b" }}>Network Builder — Linux‑style net CLI</div>
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <LeftPanel />
          <TerminalPanel output={terminalOutput} onCommand={handleCommand} />
          <RightPanel lastResult={lastResult} />
        </div>

        <BottomPanel errors={errors} />
      </div>
    </Layout>
  );
}
