export class NetworkState {
  constructor() {
    this.devices = new Map([
      [
        "pc1",
        {
          id: "pc1",
          name: "PC1",
          x: 200,
          y: 200,
          ip: "192.168.1.10",
          subnetMask: "255.255.255.0",
          gateway: null,
          mac: "AA:AA:AA:AA:AA:01",
        },
      ],
      [
        "pc2",
        {
          id: "pc2",
          name: "PC2",
          x: 500,
          y: 300,
          ip: "192.168.1.20",
          subnetMask: "255.255.255.0",
          gateway: null,
          mac: "AA:AA:AA:AA:AA:02",
        },
      ],
    ]);

    this.connections = [];
    this.scenario = null;
  }

  reset() {
    this.connections = [];
    this.scenario = null;
  }

  getDevice(deviceId) {
    return this.devices.get(deviceId) || null;
  }

  addDevice(device) {
    this.devices.set(device.id, device);
  }

  removeDevice(deviceId) {
    this.devices.delete(deviceId);
    this.connections = this.connections.filter(
      (c) => c.from !== deviceId && c.to !== deviceId
    );
  }

  getAllDevices() {
    return Array.from(this.devices.values());
  }

  addConnection(fromId, toId) {
    // prevent duplicates and self-connections
    if (fromId === toId) return;
    if (
      this.connections.some(
        (c) =>
          (c.from === fromId && c.to === toId) ||
          (c.from === toId && c.to === fromId)
      )
    ) {
      return;
    }

    this.connections.push({ from: fromId, to: toId });
  }

  removeConnection(fromId, toId) {
    this.connections = this.connections.filter(
      (c) => !(c.from === fromId && c.to === toId)
    );
  }

  getConnections() {
    return this.connections;
  }
}