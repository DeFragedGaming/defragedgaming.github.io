const vyosProfile = {
  id: "vyos",
  name: "VyOS",
  shortName: "VyOS",
  interfacePrefix: "eth",

  makeInterfaceName(index) {
    return `eth${index}`;
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

export default vyosProfile;