const mikrotikProfile = {
  id: "mikrotik",
  name: "MikroTik RouterOS",
  shortName: "MikroTik",
  interfacePrefix: "ether",

  makeInterfaceName(index) {
    return `ether${index + 1}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    if (nextHop) {
      return `${destination}/${mask} via ${nextHop}`;
    }
    return `${destination}/${mask} reachable`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → next hop ${nextHop || targetIp}`;
  },
};

export default mikrotikProfile;