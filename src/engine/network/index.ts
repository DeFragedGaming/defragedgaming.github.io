import { ICMP } from "./protocols/icmp.js";
import { ARP } from "./protocols/arp.js";

export class NetworkEngine {
  engine: any;
  icmp: ICMP;
  arp: ARP;

  constructor(engine: any) {
    this.engine = engine;
    this.icmp = new ICMP(engine);
    this.arp = new ARP(engine);
  }

  // Ping wrapper
  ping(sourceId: string, targetId: string) {
    return this.icmp.ping(sourceId, targetId);
  }

  // ARP wrapper
  arpResolve(ip: string) {
    return this.arp.resolve(ip);
  }
}