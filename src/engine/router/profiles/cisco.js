const ciscoProfile = {
  id: "cisco",
  name: "Cisco IOS",
  shortName: "Cisco",
  interfacePrefix: "GigabitEthernet",

  makeInterfaceName(index) {
    return `GigabitEthernet0/${index}`;
  },

  formatInterfaceLabel(iface) {
    return `${iface.name} (${iface.ip || "unassigned"})`;
  },

  formatRoute(route) {
    const { destination, mask, nextHop, viaInterface } = route;
    if (nextHop) {
      return `S ${destination}/${mask} via ${nextHop}`;
    }
    if (viaInterface) {
      return `C ${destination}/${mask} is directly connected, ${viaInterface}`;
    }
    return `S ${destination}/${mask}`;
  },

  formatRoutingLog({ routerName, ifaceName, nextHop, targetIp }) {
    return `${routerName} ${ifaceName} → forwarding to ${nextHop || targetIp}`;
  },
};

export default ciscoProfile;