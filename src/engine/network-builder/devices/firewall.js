export function createFirewall(id, name = "Firewall") {
  return {
    id,
    type: "firewall",
    name,
    x: 100,
    y: 100,

    interfaces: [
      { name: "inside", ip: null, connectedTo: null },
      { name: "outside", ip: null, connectedTo: null },
      { name: "dmz", ip: null, connectedTo: null },
    ],

    rules: [
        // Example rule format
    ],

    nat: {
      portForwards: [], 
    },
  };
}