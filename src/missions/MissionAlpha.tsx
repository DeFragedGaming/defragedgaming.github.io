export async function MissionAlpha(
  term: any,
  sleep: (ms: number) => Promise<void>,
  onComplete?: () => void
) {
  let missionActive = true;
  let risk = 0;
  let progress = 0;

  const write = (t: string) => term.write(t);
  const line = async (t: string, d = 18) => {
    for (let i = 0; i < t.length; i++) {
      write(t[i]);
      await sleep(d + Math.random() * 12);
    }
    write("\r\n");
    await sleep(120);
  };

  const divider = async () => {
    await line("------------------------------------------------------------", 4);
  };

  let buffer = "";

  

  write("\r\n");
  await line("=== MISSION ALPHA — BLACK WINTER ===");
  await sleep(300);
  await line("Secure relay channel established.");
  await line("Routing through Soviet telecommunications grid...");
  await line("Analyzing anomaly metadata...");
  await sleep(500);
  await line("Warning: Packet timing irregularities detected.");
  await line("Warning: Embedded telemetry markers do not match known Soviet encryption standards.");
  await sleep(500);
  await line("Cross-referencing biological signature database...");
  await sleep(600);
  await line("No match found in known pathogen or weapons programs.");
  await divider();
  await line("Context:");
  await line("  Anomalous signal detected on relay channel 4B.");
  await line("  Embedded telemetry suggests biological research data where none should exist.");
  await line("  Origin fragment: GRID NODE S-14B — Siberian perimeter zone.");
  await line("  Environmental readings: sub-zero, unstable, anomalous.");
  await divider();
  await line("Available commands:");
  await line("  probe       - Low-profile signal probe");
  await line("  deeptrace   - Aggressive trace attempt (higher risk)");
  await line("  intercept   - Capture live signal traffic");
  await line("  triangulate - Narrow down anomaly origin");
  await line("  scanwide    - Wide-band scan for hidden channels");
  await line("  decrypt     - Attempt partial decryption of captured data");
  await line("  status      - Review mission status and metrics");
  await line("  memory      - Access DS&T memory fragments (unlocks later)");
  await line("  profile     - Review classified operator profile (unlocks later)");
  await line("  origin      - Review original deployment orders (unlocks later)");
  await line("  analyze     - Analyze biological telemetry for intel (unlocks later)");
  await line("  backtrace   - Reverse-route anomaly through Soviet grid (unlocks later)");
  await line("  stabilize   - Stabilize trace lock at higher risk");
  await line("  jam         - Disrupt Soviet monitoring (risky, but can help)");
  await line("  mask        - Obfuscate trace signature (defensive routine, unlocks later)");
  await line("  uplink      - Attempt to send intel to DS&T (very high risk, unlocks later)");
  await line("  abort       - Abort mission and return to terminal");
  await divider();
  write("> ");

  

  let capturedFragments: string[] = [];
  let memoryUnlocked = false;
  let profileUnlocked = false;
  let originUnlocked = false;
  let bioIntelUnlocked = false;
  let backtraceUnlocked = false;
  let uplinkEnabled = false;
  let maskUnlocked = false;
  let maskOnCooldown = false;
  let probeSuccess = false;
  let interceptSuccess = false;

  const addProgress = async (amount: number, reason?: string) => {
    progress += amount;
    if (progress > 100) progress = 100;
    if (reason) {
      await line(reason);
    }
    await line(`Trace progress: ${progress}%`);
  };

  const addRisk = async (amount: number, reason?: string) => {
    risk += amount;
    if (risk > 100) risk = 100;
    if (reason) {
      await line(reason);
    }
    await line(`Surveillance risk: ${risk}%`);
  };

  const showStatus = async () => {
    await divider();
    await line("MISSION STATUS // BLACK WINTER");
    await line(`  Trace progress: ${progress}%`);
    await line(`  Surveillance risk: ${risk}%`);
    await line(`  Captured fragments: ${capturedFragments.length}`);
    await line(`  Memory fragments: ${memoryUnlocked ? "UNLOCKED" : "LOCKED"}`);
    await line(`  Operator profile: ${profileUnlocked ? "UNLOCKED" : "LOCKED"}`);
    await line(`  Deployment origin: ${originUnlocked ? "UNLOCKED" : "LOCKED"}`);
    await line(`  Bio telemetry intel: ${bioIntelUnlocked ? "UNLOCKED" : "LOCKED"}`);
    await line(`  Backtrace capability: ${backtraceUnlocked ? "ENABLED" : "DISABLED"}`);
    await line(`  Uplink channel: ${uplinkEnabled ? "AVAILABLE" : "UNAVAILABLE"}`);
    await line(`  MASK routine: ${maskUnlocked ? (maskOnCooldown ? "COOLDOWN" : "READY") : "LOCKED"}`);
    await divider();
  };

  const tryUnlockMask = async () => {
    if (!maskUnlocked && probeSuccess && interceptSuccess && risk >= 15) {
      maskUnlocked = true;
      await line("CyberTrace defensive routine unlocked: 'mask' now available.");
      await line("Use 'mask' to obfuscate your trace signature and reduce surveillance risk.");
    }
  };

  

  const onData = async (data: string) => {
    if (!missionActive) return;

    const code = data.charCodeAt(0);

    if (code === 13) {
      write("\r\n");
      const cmd = buffer.trim().toLowerCase();
      buffer = "";

      if (!missionActive) return;

      let commandConsumed = false;

      

      if (cmd === "probe") {
        commandConsumed = true;
        await line("Running low-profile probe on relay channel 4B...");
        await sleep(600);

        if (Math.random() < 0.9) {
          await line("Probe successful. Anomaly confirmed.");
          await line("Signal exhibits non-standard packet timing and embedded telemetry markers.");
          await addProgress(8, "Low-level trace alignment improved.");
          probeSuccess = true;
          if (!memoryUnlocked && progress >= 10) {
            memoryUnlocked = true;
            await line("DS&T memory fragment flagged for retrieval. Use 'memory' to access.");
          }
          await tryUnlockMask();
        } else {
          await line("Probe detected by local monitors. Traffic anomaly logged.");
          await addRisk(8, "Soviet relay node has registered unusual activity.");
        }
      }

      else if (cmd === "deeptrace") {
        commandConsumed = true;
        await line("Initiating deep trace across concealed Soviet pathways...");
        await sleep(800);
        await addRisk(12, "Deep trace increases likelihood of detection.");

        if (Math.random() < 0.7) {
          await line("Deep trace successful. Additional routing metadata recovered.");
          await line("Trace path intersects with classified research infrastructure.");
          await addProgress(12, "Trace path refined toward GRID NODE S-14B.");
          if (!profileUnlocked && progress >= 20) {
            profileUnlocked = true;
            await line("Classified operator profile fragment available. Use 'profile' to review.");
          }
        } else {
          await line("Deep trace triggered counter-routing routines.");
          await addRisk(6, "Soviet infrastructure is attempting to obfuscate the path.");
        }
      }

      else if (cmd === "intercept") {
        commandConsumed = true;
        await line("Attempting live signal interception...");
        await sleep(900);

        if (Math.random() < 0.8) {
          const fragment = `[FRAGMENT ${capturedFragments.length + 1}] 7F A2 19 4C 00 00 4C`;
          capturedFragments.push(fragment);
          await line("Interception successful. Fragment captured:");
          await line(fragment);
          await addProgress(10, "Captured fragment improves anomaly characterization.");
          interceptSuccess = true;
          if (!bioIntelUnlocked && capturedFragments.length >= 2) {
            bioIntelUnlocked = true;
            await line("Biological telemetry pattern detected. Use 'analyze' to process.");
          }
          await tryUnlockMask();
        } else {
          await line("Interception failed. Local monitors detected unusual traffic.");
          await addRisk(10, "Relay node has flagged anomalous packet inspection.");
        }
      }

      else if (cmd === "triangulate") {
        commandConsumed = true;
        await line("Triangulating anomaly origin using multi-node correlation...");
        await sleep(800);
        await addRisk(6, "Triangulation requires active cross-node queries.");

        if (Math.random() < 0.7) {
          await line("Triangulation successful. Origin narrowed to Sector S-14B perimeter.");
          await addProgress(12, "Spatial lock on anomaly origin improved.");
          if (!backtraceUnlocked && progress >= 35) {
            backtraceUnlocked = true;
            await line("Reverse-routing capability unlocked. Use 'backtrace' to attempt origin reconstruction.");
          }
        } else {
          await line("Triangulation inconclusive. Signal distortion and noise detected.");
        }
      }

      else if (cmd === "scanwide") {
        commandConsumed = true;
        await line("Initiating wide-band scan across adjacent relay channels...");
        await sleep(900);
        await addRisk(6, "Wide-band activity may appear suspicious to local monitors.");

        if (Math.random() < 0.6) {
          await line("Hidden auxiliary channel detected: 4B-Δ.");
          await line("Channel carries intermittent bursts of compressed telemetry.");
          await addProgress(10, "Auxiliary channel integrated into trace model.");
        } else {
          await line("No additional channels identified. Noise floor elevated.");
        }
      }

      else if (cmd === "decrypt") {
        commandConsumed = true;
        if (capturedFragments.length === 0) {
          await line("No captured fragments available. Use 'intercept' first.");
        } else {
          await line("Attempting partial decryption of captured fragments...");
          await sleep(900);
          await line("Decryption incomplete. Partial content recovered:");
          await line("  - BIOSAFETY LEVEL: 4");
          await line("  - FACILITY: VECTOR INSTITUTE (NOVOSIBIRSK)");
          await line("  - PROJECT: CHERNAYA ZIMA // SEVERNAYA STRAIN");
          await addProgress(10, "Decrypted metadata confirms link to high-containment facility.");
          if (!originUnlocked && progress >= 45) {
            originUnlocked = true;
            await line("Original deployment orders flagged for recall. Use 'origin' to review.");
          }
        }
      }

      else if (cmd === "status") {
        commandConsumed = true;
        await showStatus();
      }

      

      else if (cmd === "memory") {
        commandConsumed = true;
        if (!memoryUnlocked) {
          await line("No DS&T memory fragments available yet. Continue trace operations.");
        } else {
          await divider();
          await line("DS&T MEMORY FRAGMENT // CLASSIFIED");
          await line("You were not the first candidate for this deployment.");
          await line("Two prior operators were rejected due to psychological screening failures.");
          await line("You accepted the assignment after reviewing partial intel on Soviet bioprograms.");
          await line("You were told the mission would last six months.");
          await line("You have been in-country for nearly two years.");
          await divider();
        }
      }

      else if (cmd === "profile") {
        commandConsumed = true;
        if (!profileUnlocked) {
          await line("Classified operator profile not yet accessible. Deepen trace alignment.");
        } else {
          await divider();
          await line("OPERATOR PROFILE // DS&T INTERNAL");
          await line("  Cover Identity: Telecommunications Technician");
          await line("  Placement: Western USSR Perimeter Zone");
          await line("  Agency Link: CIA Directorate of Science & Technology (DS&T)");
          await line("  Clearance: BLACK LANTERN / COMPARTMENTALIZED");
          await line("  Primary Asset: CyberTrace Prototype Interface // Field Edition");
          await line("  Extraction Status: WINDOW CLOSED // NO ACTIVE CORRIDOR");
          await divider();
        }
      }

      else if (cmd === "origin") {
        commandConsumed = true;
        if (!originUnlocked) {
          await line("Original deployment orders remain sealed. Continue decryption and trace.");
        } else {
          await divider();
          await line("DEPLOYMENT ORDERS // PROJECT SEVERNAYA");
          await line("You were deployed after DS&T intercepted anomalous telemetry from Soviet infrastructure.");
          await line("The data suggested a new class of biological agent, optimized for extreme cold.");
          await line("Internal designation: SEVERNAYA STRAIN.");
          await line("Your mission: confirm existence, characterize threat, and trace origin.");
          await line("You were informed that failure to maintain cover would result in total disavowal.");
          await divider();
        }
      }

      

      else if (cmd === "analyze") {
        commandConsumed = true;
        if (!bioIntelUnlocked) {
          await line("Insufficient biological telemetry captured. Use 'intercept' and 'decrypt' first.");
        } else {
          await divider();
          await line("BIOLOGICAL TELEMETRY ANALYSIS // SEVERNAYA STRAIN");
          await line("  Agent Type: Synthetic chimera (viral delivery, bacterial metabolism, extremophile DNA).");
          await line("  Design Goal: Persistent viability in sub-zero environments.");
          await line("  Activation: Originally temperature-gated, now exhibiting self-modifying triggers.");
          await line("  Drift: Genetic drift exceeds projected models by 340%.");
          await line("  Containment: Multiple breach alerts logged from NODE S-14B.");
          await line("Conclusion: The Soviets have lost full control of the strain.");
          await divider();
          await addProgress(15, "Biological threat characterization complete.");
        }
      }

      else if (cmd === "backtrace") {
        commandConsumed = true;
        if (!backtraceUnlocked) {
          await line("Reverse-routing capability not yet available. Improve triangulation and deeptrace results.");
        } else {
          await line("Attempting reverse-route of anomaly through Soviet grid...");
          await sleep(1000);
          await addRisk(10, "Reverse-routing leaves a detectable signature in routing tables.");

          if (Math.random() < 0.7) {
            await line("Backtrace successful. Intermediate nodes identified:");
            await line("  - REGIONAL NODE: NOVOSIBIRSK TELECOM EXCHANGE");
            await line("  - FACILITY LINK: VECTOR INSTITUTE UPLINK CHANNEL");
            await line("  - REMOTE NODE: S-14B // CLASSIFIED RESEARCH OUTPOST");
            await addProgress(18, "Trace path now firmly anchored to VECTOR and NODE S-14B.");
            if (!uplinkEnabled && progress >= 70) {
              uplinkEnabled = true;
              await line("Secure uplink window to DS&T flagged as POSSIBLE. Use 'uplink' to attempt contact.");
            }
          } else {
            await line("Backtrace disrupted by Soviet counter-routing routines.");
            await addRisk(8, "Counter-intelligence may be reviewing anomalous routing logs.");
          }
        }
      }

      else if (cmd === "stabilize") {
        commandConsumed = true;
        await line("Attempting to stabilize trace lock on NODE S-14B...");
        await sleep(900);
        await addRisk(8, "Stabilization requires persistent connection to anomaly source.");

        if (Math.random() < 0.8) {
          await line("Trace lock stabilized. Signal drift reduced.");
          await addProgress(12, "Stable lock improves long-term anomaly tracking.");
        } else {
          await line("Stabilization failed. Signal oscillation increased.");
        }
      }

      else if (cmd === "jam") {
        commandConsumed = true;
        await line("Deploying low-level interference against Soviet monitoring systems...");
        await sleep(900);
        await addRisk(10, "Jamming activity is inherently suspicious.");

        if (Math.random() < 0.6) {
          await line("Jamming successful. Local monitoring temporarily degraded.");
          await line("Short-term reduction in detection probability achieved.");
          risk -= 15;
          if (risk < 0) risk = 0;
          await line(`Surveillance risk: ${risk}%`);
        } else {
          await line("Jamming pattern detected and countered.");
          await addRisk(6, "Counter-intelligence may now be actively scanning for anomalies.");
        }
      }

      else if (cmd === "mask") {
        commandConsumed = true;
        if (!maskUnlocked) {
          await line("MASK routine not yet available. Continue trace and interception operations.");
        } else if (maskOnCooldown) {
          await line("MASK routine is recharging. Execute another action before reusing.");
        } else {
          await line("Engaging MASK routine: obfuscating trace signature and normalizing traffic patterns...");
          await sleep(900);
          const previousRisk = risk;
          risk -= 10;
          if (risk < 5) risk = 5;
          await line(`Surveillance risk reduced from ${previousRisk}% to ${risk}%.`);
          maskOnCooldown = true;
        }
      }

      else if (cmd === "uplink") {
        commandConsumed = true;
        if (!uplinkEnabled) {
          await line("No secure uplink corridor available. Backtrace and stabilize the signal further.");
        } else {
          await line("Attempting secure uplink to DS&T via concealed relay path...");
          await sleep(1200);
          await addRisk(12, "Uplink attempts are highly visible if detected.");

          if (Math.random() < 0.7) {
            await divider();
            await line("UPLINK ESTABLISHED // DS&T RESPONSE RECEIVED");
            await line("  DS&T: Your intel confirms uncontrolled drift in SEVERNAYA STRAIN.");
            await line("  DS&T: NODE S-14B appears to be a containment and denial site.");
            await line("  DS&T: You are to continue trace operations and prioritize origin confirmation.");
            await line("  DS&T: No extraction corridor currently available.");
            await divider();
            await addProgress(20, "DS&T uplink confirms strategic significance of your findings.");
          } else {
            await line("Uplink attempt failed. Path collapsed under counter-routing pressure.");
            await addRisk(10, "Failed uplink may have left detectable anomalies in traffic patterns.");
          }
        }
      }

      

      else if (cmd === "abort") {
        commandConsumed = true;
        await line("Mission aborted. Partial intel retained.");
        cleanup();
        return;
      }

      else if (cmd.length === 0) {
        // ignore empty, just reprint prompt
      }

      else {
        commandConsumed = true;
        await line("Unknown mission command.");
      }

      

      if (commandConsumed && cmd !== "mask" && maskOnCooldown) {
        maskOnCooldown = false;
      }

      

      if (risk >= 100) {
        await line("");
        await line("!!! SURVEILLANCE BREACH DETECTED !!!", 10);
        await line("Local Soviet counter-intelligence has flagged your activity.");
        await line("Routing anomalies and packet inspection patterns match your operations.");
        await sleep(800);
        await line("You are now a person of interest within Soviet internal security systems.");
        await line("Mission Alpha — BLACK WINTER: FAILED.");
        await divider();
        cleanup();
        return;
      }

      

      if (progress >= 100) {
        await line("");
        await divider();
        await line("TRACE LOCK ACHIEVED // NODE S-14B ISOLATED");
        await line("You have successfully traced the anomaly to a remote Siberian research node.");
        await line("Telemetry confirms:");
        await line("  - Facility linked to VECTOR INSTITUTE via secure uplink.");
        await line("  - SEVERNAYA STRAIN containment breaches logged.");
        await line("  - Personnel status: MULTIPLE TERMINATIONS // LOSS OF CONTACT.");
        await line("  - Environmental readings: EXTREME COLD, UNSTABLE BIOLOGICAL SIGNATURES.");
        await divider();
        await line("You are now the only confirmed source of truth regarding SEVERNAYA STRAIN.");
        await line("DS&T will either act on your intel...");
        await line("...or bury it along with you.");
        await line("Mission Alpha — BLACK WINTER: COMPLETE.");
        await divider();
        await line("DEBRIEFING: BLACK WINTER is now available.");
        await line("When ready, return to the terminal and type 'briefing' to proceed.");
        await divider();
        cleanup();
        return;
      }

      write(" ");
      return;
    }

    if (code === 127 || code === 8) {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, -1);
        write("\b \b");
      }
      return;
    }

    if (code < 32) return;

    buffer += data;
    write(data);
  };



  const listener = term.onData(onData);

  

  function cleanup() {
    if (!missionActive) return;
    missionActive = false;
    listener.dispose();
    write("\r\n");
    if (onComplete) onComplete();
  }
}
