export function createSwitch(id, name = "Switch") {
  return {
    id,
    type: "switch",
    name,
    x: 100,
    y: 100,

    ports: [
      { port: 1, mode: "access", vlan: 1, connectedTo: null },
      { port: 2, mode: "access", vlan: 1, connectedTo: null },
      { port: 3, mode: "access", vlan: 1, connectedTo: null },
      { port: 4, mode: "trunk", vlan: null, connectedTo: null },
    ],

    vlans: [
      { id: 1, name: "Default" },
    ],

    macTable: [],
  };
}