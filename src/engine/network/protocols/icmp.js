import { arpLookup, sendArpRequest } from "./arp";
import { logEvent } from "../../logging/logger";

import { RoutingEngine } from "../routing.js";

export class ICMP {
  constructor(engine) {
    this.engine = engine;
    this.routing = new RoutingEngine(engine);
  }

  /**
   * Main ping entry point
   */
  ping(sourceId, targetId) {
    const source = this.engine.state.getDevice(sourceId);
    const target = this.engine.state.getDevice(targetId);

    if (!source || !target) {
      return {
        success: false,
        message: "Invalid source or target",
        hops: [],
      };
    }

    // Direct same-subnet ping
    if (this.routing.isSameSubnet(source, target)) {
      return {
        success: true,
        message: `Reply from ${target.ip}: bytes=32 time<1ms TTL=64`,
        hops: [
          {
            type: "direct",
            from: source.id,
            to: target.id,
            via: "local-subnet",
          },
        ],
      };
    }

    // Multi-hop routing
    const result = this.routing.routePacket({
      sourceId,
      targetId,
    });

    if (!result.success) {
      return {
        success: false,
        message: `Destination host unreachable (${result.reason})`,
        hops: result.hops,
      };
    }

    return {
      success: true,
      message: `Reply from ${target.ip}: bytes=32 time=${1 + result.hops.length}ms TTL=64`,
      hops: result.hops,
    };
  }
}