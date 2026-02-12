import cisco from "./cisco";
import juniper from "./juniper";
import mikrotik from "./mikrotik";
import fortinet from "./fortinet";
import paloalto from "./paloalto";
import ubiquiti from "./ubiquiti";
import vyos from "./vyos";
import generic from "./generic";

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