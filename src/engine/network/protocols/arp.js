import { logEvent } from "../../logging/logger";

export class ARP {
  constructor(engine) {
    this.engine = engine;
  }

  /**
   * Resolve MAC for a given IP.
   * Works for:
   * - PCs
   * - Routers (any interface)
   */
  resolve(ip) {
    const devices = this.engine.state.getAllDevices();

    for (const dev of devices) {
      if (dev.type === "pc") {
        if (dev.ip === ip) return dev.mac;
      }

      if (dev.type === "router") {
        for (const iface of dev.interfaces || []) {
          if (iface.ip === ip) return iface.mac;
        }
      }
    }

    return null;
  }
}