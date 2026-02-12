const juniperProfile = {
  id: "juniper",
  name: "Juniper JunOS",
  shortName: "Juniper",
  interfacePrefix: "ge-0/0",

  interfaces: [],
  routes: [],

  makeInterfaceName(index) {
    return `ge-0/0/${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop, viaInterface } = route;
    if (nextHop) return `S ${destination}/${mask} next-hop ${nextHop}`;
    if (viaInterface) return `C ${destination}/${mask} directly connected via ${viaInterface}`;
    return `S ${destination}/${mask}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → forwarding to ${nextHop || targetIp}`;
  },
};

export default juniperProfile;