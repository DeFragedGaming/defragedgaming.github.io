import cisco from "./cisco.js";
import juniper from "./juniper.js";
import mikrotik from "./mikrotik.js";
import fortinet from "./fortinet.js";
import paloalto from "./paloalto.js";
import ubiquiti from "./ubiquiti.js";
import vyos from "./vyos.js";
import generic from "./generic.js";

const profiles = {
  cisco,
  juniper,
  mikrotik,
  fortinet,
  paloalto,
  ubiquiti,
  vyos,
  generic,
};

export function getRouterProfile(id = "generic") {
  return profiles[id] || profiles.generic;
}

export function listRouterProfiles() {
  return Object.values(profiles);
}

export default profiles;