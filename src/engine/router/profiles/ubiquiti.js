const ubiquitiProfile = {
  id: "ubiquiti",
  name: "Ubiquiti EdgeOS",
  shortName: "Ubiquiti",
  interfacePrefix: "eth",

  interfaces: [],
  routes: [],

  makeInterfaceName(index) {
    return `eth${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    return `${destination}/${mask} via ${nextHop}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → forwarding to ${nextHop || targetIp}`;
  },
};

export default ubiquitiProfile;