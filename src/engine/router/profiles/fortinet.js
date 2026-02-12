const fortinetProfile = {
  id: "fortinet",
  name: "Fortinet FortiOS",
  shortName: "Fortinet",
  interfacePrefix: "port",

  interfaces: [],
  routes: [],

  makeInterfaceName(index) {
    return `port${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    return `S ${destination}/${mask} via ${nextHop}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → forwarding to ${nextHop || targetIp}`;
  },
};

export default fortinetProfile;