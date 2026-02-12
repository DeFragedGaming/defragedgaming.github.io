

export function parseCidr(cidr) {
  if (!cidr || !cidr.includes('/')) return null;
  const [ip, prefixStr] = cidr.split('/');
  const prefix = Number(prefixStr);
  if (!isValidIp(ip) || Number.isNaN(prefix) || prefix < 0 || prefix > 32) {
    return null;
  }
  return { ip, prefix };
}

export function isValidIp(ip) {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = Number(p);
    return !Number.isNaN(n) && n >= 0 && n <= 255;
  });
}

export function ipToInt(ip) {
  if (!isValidIp(ip)) return null;
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0);
}

export function intToIp(int) {
  return [
    (int >>> 24) & 0xff,
    (int >>> 16) & 0xff,
    (int >>> 8) & 0xff,
    int & 0xff,
  ].join('.');
}

export function getNetworkAddress(ip, prefix) {
  const ipInt = ipToInt(ip);
  if (ipInt === null) return null;
  const mask = prefixToMask(prefix);
  return intToIp(ipInt & mask);
}

export function getBroadcastAddress(ip, prefix) {
  const ipInt = ipToInt(ip);
  if (ipInt === null) return null;
  const mask = prefixToMask(prefix);
  const inverted = ~mask >>> 0;
  return intToIp(ipInt | inverted);
}

export function prefixToMask(prefix) {
  return prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
}

export function isIpInSubnet(ip, cidr) {
  const parsed = parseCidr(cidr);
  if (!parsed) return false;
  const ipInt = ipToInt(ip);
  const netInt = ipToInt(parsed.ip);
  const mask = prefixToMask(parsed.prefix);
  return (ipInt & mask) === (netInt & mask);
}