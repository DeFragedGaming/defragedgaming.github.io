export interface DeviceConfig {
  id: string;
  name: string;
  ip: string | null;
  subnetMask: string | null;
  gateway: string | null;
  mac: string;
  connections: string[];
}