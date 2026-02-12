export function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + Number(oct), 0);
}

export function inSameSubnet(ip1: string, ip2: string, mask: string): boolean {
  const maskInt = ipToInt(mask);
  return (ipToInt(ip1) & maskInt) === (ipToInt(ip2) & maskInt);
}