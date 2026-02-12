import { listRouterProfiles } from "../router/profiles/index.js";


function randomMac() {
  return "AA:AA:AA:" + [...Array(3)]
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0"))
    .join(":")
    .toUpperCase();
}

export class DeviceFactory {
  constructor() {
    this.routerProfiles = listRouterProfiles();
  }

  createPC(id, x, y) {
    return {
      id,
      type: "pc",
      name: id.toUpperCase(),
      x,
      y,
      ip: "",
      subnetMask: "",
      gateway: "",
      mac: randomMac(),
    };
  }

  createRouter(id, x, y, profileId = "generic") {
    const profile = this.routerProfiles.find((p) => p.id === profileId);

    return {
      id,
      type: "router",
      name: id.toUpperCase(),
      x,
      y,
      profile: profile ? profile.id : "generic",
      interfaces: [
        {
          name: profile.makeInterfaceName(0),
          ip: "",
          subnetMask: "",
          mac: randomMac(),
        },
      ],
      routes: [],
    };
  }
}