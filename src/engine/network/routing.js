import { getRouterProfile } from "../router/profiles/index.js";

export class RoutingEngine {
  constructor(engine) {
    this.engine = engine;
  }

  /**
   * Main entry point for routing a packet.
   * Handles:
   * - Local delivery
   * - Gateway forwarding
   * - Multi-hop routing
   * - TTL decrement
   */
  routePacket(packet) {
    const source = this.engine.state.getDevice(packet.sourceId);
    const target = this.engine.state.getDevice(packet.targetId);

    if (!source || !target) {
      return { success: false, reason: "Invalid source or target" };
    }

    // If same subnet → direct ARP + deliver
    if (this.isSameSubnet(source, target)) {
      return {
        success: true,
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

    // Otherwise → must use gateway
    if (!source.gateway) {
      return { success: false, reason: "No gateway configured" };
    }

    const gateway = this.engine.state.getDeviceByIp(source.gateway);
    if (!gateway) {
      return { success: false, reason: "Gateway unreachable" };
    }

    // Begin multi-hop routing
    return this.forwardThroughNetwork(source, target);
  }

  /**
   * Multi-hop routing loop.
   * Walks router → router → router until destination is reached.
   */
  forwardThroughNetwork(source, target) {
    let current = source;
    let ttl = 64;
    const hops = [];

    while (ttl > 0) {
      ttl--;

      // If current is the target → done
      if (current.id === target.id) {
        return { success: true, hops };
      }

      // Determine next hop
      const nextHop = this.findNextHop(current, target);

      if (!nextHop) {
        return { success: false, reason: "No route found", hops };
      }

      hops.push({
        type: "router-hop",
        from: current.id,
        to: nextHop.id,
        via: nextHop.interfaceName,
      });

      current = nextHop;
    }

    return { success: false, reason: "TTL expired", hops };
  }

  /**
   * Determine next hop for a device.
   * PCs → use gateway
   * Routers → use routing table
   */
  findNextHop(device, target) {
    if (device.type === "pc") {
      return this.resolveGateway(device);
    }

    if (device.type === "router") {
      return this.resolveRouterRoute(device, target);
    }

    return null;
  }

  /**
   * PC gateway resolution
   */
  resolveGateway(pc) {
    if (!pc.gateway) return null;
    return this.engine.state.getDeviceByIp(pc.gateway);
  }

  /**
   * Router route resolution using:
   * - Longest prefix match
   * - Vendor profile formatting
   */
  resolveRouterRoute(router, target) {
    const profile = getRouterProfile(router.profile);
    const targetIp = target.ip;

    let bestRoute = null;
    let bestMask = 0;

    for (const route of router.routes || []) {
      if (this.ipInSubnet(targetIp, route.destination, route.mask)) {
        const maskBits = this.maskToBits(route.mask);
        if (maskBits > bestMask) {
          bestMask = maskBits;
          bestRoute = route;
        }
      }
    }

    if (!bestRoute) return null;

    // Determine next hop device
    const nextHopIp = bestRoute.nextHop || targetIp;
    const nextHopDevice = this.engine.state.getDeviceByIp(nextHopIp);

    if (!nextHopDevice) return null;

    return {
      id: nextHopDevice.id,
      interfaceName: profile.interfacePrefix,
    };
  }

  /**
   * Utility: check if two devices share a subnet
   */
  isSameSubnet(a, b) {
    return this.ipInSubnet(b.ip, a.ip, a.subnetMask);
  }

  /**
   * Utility: IP in subnet check
   */
  ipInSubnet(ip, networkIp, mask) {
    const ipInt = this.ipToInt(ip);
    const netInt = this.ipToInt(networkIp);
    const maskInt = this.ipToInt(mask);
    return (ipInt & maskInt) === (netInt & maskInt);
  }

  /**
   * Convert dotted IP to integer
   */
  ipToInt(ip) {
    return ip
      .split(".")
      .map((x) => parseInt(x, 10))
      .reduce((acc, oct) => (acc << 8) + oct, 0);
  }

  /**
   * Convert mask to number of bits
   */
  maskToBits(mask) {
    return mask
      .split(".")
      .map((x) => parseInt(x, 10).toString(2))
      .join("")
      .split("1").length - 1;
  }
}