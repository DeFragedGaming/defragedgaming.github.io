export async function MissionDebriefBlackWinter(
  term: any,
  sleep: (ms: number) => Promise<void>,
  onComplete?: () => void
) {
  let active = true;
  let buffer = "";

  const write = (t: string) => term.write(t);
  const line = async (t: string, d = 18) => {
    for (let i = 0; i < t.length; i++) {
      write(t[i]);
      await sleep(d + Math.random() * 10);
    }
    write("\r\n");
    await sleep(120);
  };

  const divider = async () => {
    await line("------------------------------------------------------------", 4);
  };

  

  write("\r\n");
  await line("[RECORDING START — DS&T CHANNEL 7B]");
  await sleep(300);
  await line("Timestamp: 00:00:03");
  await line("Source: Directorate of Science & Technology (DS&T)");
  await line("Subject: OPERATOR DEBRIEF — BLACK WINTER");
  await divider();

  await line("DS&T: Operator, your transmission from Mission Alpha has been received.");
  await line("DS&T: This debriefing will reconstruct your actions and assess your stability.");
  await line("DS&T: Acknowledge to proceed.");
  write("> ");

 
  const waitForAcknowledge = async (cmd: string) => {
    if (cmd === "acknowledge" || cmd === "ack") {
      await line("");
      await line("[00:00:12] Acknowledgement received.");
      await divider();
      return true;
    }
    return false;
  };

  

  const runDebrief = async () => {
    await line("DS&T: Beginning reconstruction of your mission telemetry.");
    await sleep(500);

    await line("[STATIC] Reassembling packet logs...");
    await sleep(600);

    await line("[00:00:19] TRACE PATH: VECTOR INSTITUTE → NODE S-14B");
    await line("[00:00:21] BIOLOGICAL SIGNATURE: SEVERNAYA STRAIN (UNCONTROLLED)");
    await line("[00:00:23] PERSONNEL STATUS: MULTIPLE TERMINATIONS");
    await divider();

    await line("DS&T: Operator, describe your emotional state during the anomaly event.");
    await line("DS&T: Your response will be added to your psychological profile.");
    write("> ");
  };

  

  let psychResponseCaptured = false;

  const capturePsychResponse = async (cmd: string) => {
    if (!psychResponseCaptured && cmd.length > 0) {
      psychResponseCaptured = true;

      await line("");
      await line("[00:00:37] SUBJECT RESPONSE LOGGED.");
      await line("DS&T: Noted.");
      await divider();

      await line("DS&T: Finalizing debriefing transcript...");
      await sleep(800);

      await line("[STATIC] Reconstructing classified fragments...");
      await sleep(600);

      await line("[00:00:44] REDACTED MATERIAL:");
      await line("  ████████████████████████████████████████████████████");
      await line("  ███████ OPERATOR ███████ UNAUTHORIZED CONTACT ██████");
      await line("  ███████ VECTOR FACILITY ███████ BREACH █████████████");
      await divider();

      await line("DS&T: Operator, your next assignment is ready.");
      await line("DS&T: Access to deeper Soviet infrastructure has been granted.");
      await line("DS&T: When prepared, enter the following command:");
      await line("");
      await line("                nodezero");
      await line("");
      await divider();

      cleanup();
      return true;
    }
    return false;
  };

  

  const onData = async (data: string) => {
    if (!active) return;

    const code = data.charCodeAt(0);

    if (code === 13) {
      write("\r\n");
      const cmd = buffer.trim().toLowerCase();
      buffer = "";

      
      if (!psychResponseCaptured) {
        const ack = await waitForAcknowledge(cmd);
        if (ack) {
          await runDebrief();
          return;
        }
      }

     
      if (!psychResponseCaptured) {
        const done = await capturePsychResponse(cmd);
        if (done) return;
      }

      write("> ");
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
    if (!active) return;
    active = false;
    listener.dispose();
    write("\r\n");
    if (onComplete) onComplete();
  }
}
