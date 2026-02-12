import { DeviceFactory } from "../deviceFactory.js";

export class DeviceManager {
  constructor(state) {
    this.state = state;
    this.factory = new DeviceFactory();
  }

  createPC(id, x, y) {
    const pc = this.factory.createPC(id, x, y);
    this.state.addDevice(pc);
    return pc;
  }

  createRouter(id, x, y, profile = "generic") {
    const router = this.factory.createRouter(id, x, y, profile);
    this.state.addDevice(router);
    return router;
  }

  updateDevice(id, newData) {
    const existing = this.state.getDevice(id);
    if (!existing) return;

    const updated = { ...existing, ...newData };

    if (updated.type === "router") {
      updated.profile = updated.profile || "generic";
      updated.interfaces = updated.interfaces || [];
      updated.routes = updated.routes || [];
    }

    this.state.devices.set(id, updated);
  }

  moveDevice(id, x, y) {
    const device = this.state.getDevice(id);
    if (!device) return;

    this.updateDevice(id, { x, y });
  }

  createConnection(a, b) {
    this.state.addConnection(a, b);
  }

  deleteDevice(id) {
    this.state.removeDevice(id);
  }
}