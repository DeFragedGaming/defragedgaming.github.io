const genericProfile = {
  id: "generic",
  name: "Generic Router",
  shortName: "Generic",
  interfacePrefix: "if",

  makeInterfaceName(index) {
    return `if${index + 1}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    if (nextHop) {
      return `${destination}/${mask} via ${nextHop}`;
    }
    return `${destination}/${mask}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} forwarding to ${nextHop || targetIp}`;
  },
};

export default genericProfile;