

export class DeviceManager {
  constructor(networkState) {
    this.state = networkState;
  }

  createDevice(deviceConfig) {
    this.state.addDevice({
      ...deviceConfig,
      x: deviceConfig.x ?? 100,
      y: deviceConfig.y ?? 100,
    });
  }

  updateDevice(deviceId, updates) {
    const device = this.state.getDevice(deviceId);
    if (!device) return;

    const updated = {
      ...device,
      ...updates,
    };

    this.state.addDevice(updated);
  }

  moveDevice(deviceId, x, y) {
  const device = this.state.getDevice(deviceId);
  if (!device) return;

  device.x = x;
  device.y = y;
}


  deleteDevice(deviceId) {
    this.state.removeDevice(deviceId);
  }

  getDevice(deviceId) {
    return this.state.getDevice(deviceId);
  }

  getDevices() {
    return this.state.getAllDevices();
  }
}