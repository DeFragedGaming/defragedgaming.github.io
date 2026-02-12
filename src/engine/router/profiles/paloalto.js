const paloAltoProfile = {
  id: "paloalto",
  name: "Palo Alto PAN-OS",
  shortName: "Palo Alto",
  interfacePrefix: "ethernet1",

  makeInterfaceName(index) {
    return `ethernet1/${index + 1}`;
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

export default paloAltoProfile;