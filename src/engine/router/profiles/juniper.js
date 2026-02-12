const juniperProfile = {
  id: "juniper",
  name: "Juniper JunOS",
  shortName: "Juniper",
  interfacePrefix: "ge-0/0",

  makeInterfaceName(index) {
    return `ge-0/0/${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    if (nextHop) {
      return `${destination}/${mask} static via ${nextHop}`;
    }
    return `${destination}/${mask} direct`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} forwarding to ${nextHop || targetIp}`;
  },
};

export default juniperProfile;