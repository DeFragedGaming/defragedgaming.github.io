import { getRouterProfile } from "../router/profiles/index.js";

export class Logger {
  constructor() {
    this.entries = [];
  }

  log(type, message, data = {}) {
    const entry = {
      timestamp: Date.now(),
      type,
      message,
      data,
    };

    this.entries.push(entry);
  }

  clear() {
    this.entries = [];
  }

  getAll() {
    return this.entries;
  }

  // -----------------------------
  // ROUTING LOG HELPERS
  // -----------------------------

  logRoutingHop(router, hop) {
    const profile = getRouterProfile(router.profile);

    const formatted = profile.formatRoutingLog({
      routerName: router.name,
      ifaceName: hop.via || "unknown",
      nextHop: hop.nextHop || null,
      targetIp: hop.targetIp || "",
    });

    this.log("ROUTING", formatted, {
      router: router.id,
      hop,
    });
  }

  logRoutingFailure(reason, hopData = {}) {
    this.log("ROUTING_FAIL", `Routing failed: ${reason}`, hopData);
  }

  logIcmp(message, data = {}) {
    this.log("ICMP", message, data);
  }

  logArp(message, data = {}) {
    this.log("ARP", message, data);
  }

  // -----------------------------
  // HIGH-LEVEL LOGGING ENTRYPOINTS
  // -----------------------------

  logPingResult(result) {
    if (!result.success) {
      this.log("PING_FAIL", result.message, { hops: result.hops });
      return;
    }

    this.log("PING_SUCCESS", result.message, { hops: result.hops });

    // Log each hop
    for (const hop of result.hops) {
      if (hop.type === "router-hop") {
        this.log("PING_HOP", `Hop: ${hop.from} → ${hop.to}`, hop);
      }
    }
  }
}