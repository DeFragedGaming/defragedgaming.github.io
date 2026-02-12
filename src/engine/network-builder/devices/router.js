export function createRouter(id, name = "Router") {
  return {
    id,
    type: "router",
    name,
    x: 100,
    y: 100,

    interfaces: [
      { name: "G0/0", ip: null, connectedTo: null },
      { name: "G0/1", ip: null, connectedTo: null },
    ],

    routingTable: [], 
    dhcp: {
      enabled: false,
      range: null, 
    },
    nat: {
      enabled: false,
      inside: null,
      outside: null,
    },
  };
}