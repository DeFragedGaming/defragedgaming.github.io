export class NetworkState {
  constructor() {
    this.devices = new Map([
      [
        "pc1",
        {
          id: "pc1",
          type: "pc",
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
          type: "pc",
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

  getDeviceByIp(ip) {
    for (const device of this.devices.values()) {
      if (device.ip === ip) return device;
      if (device.type === "router") {
        for (const iface of device.interfaces || []) {
          if (iface.ip === ip) return device;
        }
      }
    }
    return null;
  }

  addDevice(device) {
    if (device.type === "router") {
      device.profile = device.profile || "generic";
      device.interfaces = device.interfaces || [];
      device.routes = device.routes || [];
    }

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