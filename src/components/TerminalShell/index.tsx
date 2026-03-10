import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { MissionAlpha } from "../../missions/MissionAlpha";
import { MissionDebriefBlackWinter } from "../../missions/MissionDebriefBlackWinter";
import { MissionBeta } from "../../missions/MissionBeta";

export function TerminalShell() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let missionActive = false;
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

    const resize = () => fit.fit();
    window.addEventListener("resize", resize);

    let introDone = false;
    let waitingForOperatorId = false;
    let operatorId = "";
    let inputBuffer = "";
    let interactive = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const typeChar = async (ch: string, baseDelay: number) => {
      term.write(ch);
      const jitter = Math.floor(Math.random() * 15);
      await sleep(baseDelay + jitter);
    };

    const typeLine = async (line: string, baseDelay: number) => {
      for (let i = 0; i < line.length; i++) {
        await typeChar(line[i], baseDelay);
      }
      term.write("\r\n");
      await sleep(200 + Math.random() * 200);
    };

    const flickerLine = async (line: string) => {
      await typeLine(line, 12);
      await sleep(80);
    };

    const bootSequence = async () => {
      await typeLine("[FIELD NODE REACTIVATION SEQUENCE]", 28);
      await typeLine("Power routing through concealed line...", 30);
      await typeLine("Decrypting dormant memory banks...", 30);
      await typeLine("Reinitializing covert interface hardware...", 30);
      await flickerLine("STATUS: ONLINE");
      term.write("\r\n");
      await typeLine("CyberTrace Prototype Interface // Field Edition", 20);
      await typeLine("Version: 0.1 (Classified // DS&T Internal)", 20);
      term.write("\r\n");
      await typeLine("OPERATOR ID REQUIRED:", 32);
      waitingForOperatorId = true;
      term.write("> ");
    };

    const briefingSequence = async () => {
      await typeLine("Authenticating...", 30);
      await typeLine("Cross-referencing deep-cover credentials...", 30);
      await typeLine("Verifying embedded identity profile...", 30);
      await flickerLine("Identity confirmed.");
      term.write("\r\n");
      await typeLine("Welcome back, Operator.", 30);
      await typeLine("Your node has been reactivated after 217 days of enforced dormancy.", 30);
      term.write("\r\n");
      await typeLine("FIELD BRIEFING // COLD WAR THEATER", 20);
      term.write("\r\n");
      await typeLine("Location: Western USSR Perimeter Zone", 30);
      await typeLine("Cover Identity: Telecommunications Technician", 30);
      await typeLine("Agency Link: CIA Directorate of Science & Technology (DS&T)", 30);
      await typeLine("Operational Status: Deep Cover // Enemy Homeland", 30);
      term.write("\r\n");
      await typeLine("You are currently embedded within Soviet civilian infrastructure.", 30);
      await typeLine("Your presence is unacknowledged. Your extraction window is closed.", 30);
      await typeLine("Maintain absolute operational silence.", 30);
      term.write("\r\n");
      await typeLine("Unusual signal activity detected across local relay stations.", 30);
      await typeLine("Patterns do not match Soviet encryption standards.", 30);
      await typeLine("Source appears foreign, unauthorized, and highly concealed.", 30);
      term.write("\r\n");
      await typeLine("Soviet counter-intelligence has not yet detected the breach.", 30);
      await typeLine("If they do, your cover will not hold.", 30);
      term.write("\r\n");
      await typeLine("Your task is to trace the intrusion vector and identify the origin.", 30);
      await typeLine("Do not trigger surveillance sweeps.", 30);
      await typeLine("Do not alter local traffic patterns.", 30);
      await typeLine("Do not expose the CyberTrace prototype.", 30);
      term.write("\r\n");
      await typeLine("Proceed with caution, Operator.", 30);
      term.write("\r\n");
      await flickerLine("> Awaiting command...");
      interactive = true;
      term.write("\r\n> ");
    };

    const runCommand = async (cmd: string) => {
      switch (cmd) {
        case "help":
          term.write(
            "Available commands:\r\n" +
            "  scan   - Run a signal sweep across local relay stations\r\n" +
            "  trace  - Follow the detected intrusion vector\r\n" +
            "  decode - Analyze intercepted signal fragments\r\n" +
            "  status - Display operator and node status\r\n" +
            "  logs   - View recent intercepted transmissions\r\n" +
            "  clear  - Clear the terminal\r\n" +
            "  help   - Show this command list\r\n"
          );
          break;

        case "scan":
          term.write("Running signal sweep...\r\n");
          await sleep(600);
          term.write("Analyzing frequency bands...\r\n");
          await sleep(800);
          term.write("Anomaly detected on relay channel 4B.\r\n");
          break;

        case "trace":
          term.write("Attempting to trace intrusion vector...\r\n");
          await sleep(700);
          term.write("Routing through concealed pathways...\r\n");
          await sleep(900);
          term.write("Partial success: Vector leads deeper into Soviet grid.\r\n");
          break;

        case "decode":
          term.write("Beginning cipher analysis...\r\n");
          await sleep(900);
          term.write("Decoding incomplete. Fragment recovered:\r\n");
          term.write("[REDACTED SIGNAL FRAGMENT]\r\n");
          await sleep(900);
          term.write("\r\nAuto‑initiating Mission Alpha...\r\n");
          await sleep(900);
          

          missionActive = true;

          await MissionAlpha(term, sleep, () => {
            missionActive = false; 
        
        
          });

        break;
        
        case "briefing":
          term.write("Initiating debriefing...\r\n");
          await sleep(600);
          missionActive = true;
          await MissionDebriefBlackWinter(term, sleep, () => {
          missionActive = false;
          term.write(" ");
      });
        break;

        case "nodezero":
          term.write("Accessing deep Soviet subsystem NODE ZERO...\r\n");
          await sleep(600);
          missionActive = true;
          await MissionBeta(term, sleep, () => {
          missionActive = false;
          term.write(" ");
      });
        break;

        case "status":
          term.write("Operator Status:\r\n");
          term.write(`  ID: ${operatorId}\r\n`);
          term.write("  Cover: Telecommunications Technician\r\n");
          term.write("  Location: Western USSR Perimeter Zone\r\n");
          term.write("  Node Integrity: Stable\r\n");
          break;

        case "logs":
          term.write("Intercepted Transmissions:\r\n");
          term.write("  [1] Unknown burst transmission detected.\r\n");
          term.write("  [2] Pattern mismatch with Soviet encryption.\r\n");
          term.write("  [3] Possible foreign intrusion.\r\n");
          break;

        case "clear":
          term.clear();
          break;

        default:
          term.write("Unknown command. Type 'help' for a list.\r\n");
          break;
      }
    };

    const handleKey = async (data: string) => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        term.write("\r\n");
        const trimmed = inputBuffer.trim();

        if (waitingForOperatorId) {
          operatorId = trimmed;
          waitingForOperatorId = false;
          inputBuffer = "";
          await briefingSequence();
          return;
        }

        if (interactive) {
          if (trimmed.length === 0) {
            term.write("> ");
            inputBuffer = "";
            return;
          }

          await runCommand(trimmed);
          term.write("> ");
          inputBuffer = "";
          return;
        }

        inputBuffer = "";
        return;
      }

      if (code === 127 || code === 8) {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      if (code < 32) return;

      inputBuffer += data;
      term.write(data);
    };

    term.onData((d) => {
  if (!introDone) return;
  if (missionActive) return; 
  handleKey(d);
});


    (async () => {
      introDone = true;
      await bootSequence();
    })();

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
