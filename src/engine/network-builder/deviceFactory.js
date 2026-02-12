import { listRouterProfiles } from "../router/profiles/index.js";

function randomMac() {
  return (
    "AA:AA:AA:" +
    [...Array(3)]
      .map(() =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0")
      )
      .join(":")
      .toUpperCase()
  );
}

export class DeviceFactory {
  constructor() {
    // always fetch fresh profiles to avoid stale/undefined
    this.getProfiles = () => {
      const profiles = listRouterProfiles();
      return Array.isArray(profiles) ? profiles : [];
    };
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
    const profiles = this.getProfiles();
    const profile =
      profiles.find((p) => p.id === profileId) ||
      profiles.find((p) => p.id === "generic") ||
      null;

    const ifaceName =
      profile && typeof profile.makeInterfaceName === "function"
        ? profile.makeInterfaceName(0)
        : "eth0";

    return {
      id,
      type: "router",
      name: id.toUpperCase(),
      x,
      y,
      profile: profile ? profile.id : "generic",
      interfaces: [
        {
          name: ifaceName,
          ip: "",
          subnetMask: "",
          mac: randomMac(),
        },
      ],
      routes: [],
    };
  }
}