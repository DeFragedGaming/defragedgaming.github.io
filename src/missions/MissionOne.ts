export async function MissionOne(term: any, sleep: (ms: number) => Promise<void>) {
  term.write("\r\n");
  term.write("=== MISSION ONE: SIGNAL ORIGIN TRACE ===\r\n");
  await sleep(400);

  term.write("Initializing deep-trace protocol...\r\n");
  await sleep(700);

  term.write("Routing through concealed Soviet relay pathways...\r\n");
  await sleep(900);

  term.write("Decrypting anomaly metadata...\r\n");
  await sleep(900);

  term.write("Partial origin identified: Sector 7 — Industrial Grid Node.\r\n");
  await sleep(900);

  term.write("Warning: Increased surveillance detected in this region.\r\n");
  await sleep(900);

  term.write("Proceed with caution, Operator.\r\n");
  await sleep(600);

  term.write("\r\n> ");
}
