export function createWirelessAP(id, name = "Wireless AP") {
  return {
    id,
    type: "wireless-ap",
    name,
    x: 100,
    y: 100,

    uplink: { port: "uplink", connectedTo: null },

    ssid: "CyberTraceWiFi",
    security: "WPA2",
    vlan: 1,
  };
}