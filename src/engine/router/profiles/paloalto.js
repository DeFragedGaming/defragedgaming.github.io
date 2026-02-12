const paloaltoProfile = {
  id: "paloalto",
  name: "Palo Alto PAN‑OS",
  shortName: "Palo Alto",
  interfacePrefix: "ethernet",

  interfaces: [],
  routes: [],

  makeInterfaceName(index) {
    return `ethernet${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop } = route;
    return `${destination}/${mask} → ${nextHop}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → forwarding to ${nextHop || targetIp}`;
  },
};

export default paloaltoProfile;