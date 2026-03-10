export async function MissionBeta(
  term: any,
  sleep: (ms: number) => Promise<void>,
  onComplete?: () => void
) {
  let active = true;

  const write = (t: string) => term.write(t);
  const line = async (t: string, d = 18) => {
    for (let i = 0; i < t.length; i++) {
      write(t[i]);
      await sleep(d + Math.random() * 10);
    }
    write("\r\n");
    await sleep(120);
  };

  write("\r\n");
  await line("=== MISSION BETA — NODE ZERO ===");
  await line("This mission is not yet implemented.");
  await line("Returning to terminal...");
  write("\r\n");

  if (active) {
    active = false;
    if (onComplete) onComplete();
  }
}