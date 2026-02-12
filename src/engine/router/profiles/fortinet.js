const fortinetProfile = {
  id: "fortinet",
  name: "Fortinet FortiOS",
  shortName: "Fortinet",
  interfacePrefix: "port",

  makeInterfaceName(index) {
    return `port${index + 1}`;
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
    return `${routerName} ${ifaceName} forwarding packet to ${nextHop || targetIp}`;
  },
};

export default fortinetProfile;