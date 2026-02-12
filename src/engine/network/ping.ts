import { DeviceConfig } from "./deviceTypes";
import { inSameSubnet } from "./ipUtils";

export function ping(source: DeviceConfig, target: DeviceConfig): string {
  if (!source.ip || !source.subnetMask) {
    return "Ping failed: source device missing IP configuration.";
  }

  if (!target.ip) {
    return "Ping failed: target device missing IP configuration.";
  }

  if (inSameSubnet(source.ip, target.ip, source.subnetMask)) {
    return "Ping successful!";
  }

  return "Ping failed: devices are not in the same subnet.";
}