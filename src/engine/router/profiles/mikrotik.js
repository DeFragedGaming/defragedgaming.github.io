const mikrotikProfile = {
  id: "mikrotik",
  name: "MikroTik RouterOS",
  shortName: "MikroTik",
  interfacePrefix: "ether",

  interfaces: [],
  routes: [],

  makeInterfaceName(index) {
    return `ether${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    return `${destination}/${mask} via ${nextHop}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → routing to ${nextHop || targetIp}`;
  },
};

export default mikrotikProfile;