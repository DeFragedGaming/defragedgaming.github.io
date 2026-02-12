

import { isValidIp, parseCidr, isIpInSubnet } from './ipUtils.js';


export class ValidationEngine {
  constructor(networkState) {
    this.state = networkState;
  }

  validate() {
    const issues = [];

    this.validateDeviceIps(issues);
    this.validateGateways(issues);
    

    return {
      passed: issues.length === 0,
      issues,
    };
  }

  validateDeviceIps(issues) {
    const devices = this.state.getAllDevices();

    for (const device of devices) {
      if (!device.interfaces) continue;

      for (const iface of device.interfaces) {
        if (!iface.ip) continue;

        const parsed = parseCidr(iface.ip);
        if (!parsed) {
          issues.push({
            type: 'ip_config',
            deviceId: device.id,
            message: `Invalid IP/CIDR on ${device.name} ${iface.name}: ${iface.ip}`,
          });
        } else if (!isValidIp(parsed.ip)) {
          issues.push({
            type: 'ip_config',
            deviceId: device.id,
            message: `Invalid IP address on ${device.name} ${iface.name}: ${parsed.ip}`,
          });
        }
      }
    }
  }

  validateGateways(issues) {
    const devices = this.state.getAllDevices();

    for (const device of devices) {
      if (device.type !== 'workstation') continue;
      if (!device.gateway || !device.ip) continue;

      const parsed = parseCidr(device.ip);
      if (!parsed) continue;

      const sameSubnet = isIpInSubnet(device.gateway, device.ip);
      if (!sameSubnet) {
        issues.push({
          type: 'gateway',
          deviceId: device.id,
          message: `Gateway ${device.gateway} is not in the same subnet as ${device.name} (${device.ip})`,
        });
      }
    }
  }
}