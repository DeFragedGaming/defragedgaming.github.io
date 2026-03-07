import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export function TerminalShell() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const term = new Terminal({
      theme: {
        background: "#020617",
        foreground: "#e5e7eb",
        cursor: "#38bdf8"
      },
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 14,
      cursorBlink: true
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    if (containerRef.current) {
      term.open(containerRef.current);
      fit.fit();
    }

    term.write("CYBERTRACE OS v0.1\r\n");
    term.write("AUTH LEVEL: TIER-0\r\n");
    term.write("\r\n");
    term.write("> ");

    const resize = () => fit.fit();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      term.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "480px", background: "#020617", border: "1px solid #1f2937" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

