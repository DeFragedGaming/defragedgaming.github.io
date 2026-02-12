
export class NetworkState {
  constructor() {
    this.devices = new Map();      
    this.connections = [];        
    this.scenario = null;          
  }

  reset() {
    this.devices.clear();
    this.connections = [];
    this.scenario = null;
  }

  setScenario(scenario) {
    this.scenario = scenario;
  }

  addDevice(device) {
    this.devices.set(device.id, device);
  }

  removeDevice(deviceId) {
    this.devices.delete(deviceId);
    this.connections = this.connections.filter(
      (c) =>
        c.from.deviceId !== deviceId &&
        c.to.deviceId !== deviceId
    );
  }

  getDevice(deviceId) {
    return this.devices.get(deviceId) || null;
  }

  getAllDevices() {
    return Array.from(this.devices.values());
  }

  addConnection(connection) {
    this.connections.push(connection);
  }

  removeConnection(predicate) {
    this.connections = this.connections.filter((c) => !predicate(c));
  }

  getConnections() {
    return this.connections;
  }
}