export function createWorkstation(id, name = "Workstation") {
  return {
    id,
    type: "workstation",
    name,
    x: 100,
    y: 100,

    ip: null,       
    gateway: null,  
    dns: null,      

    dhcp: true,   
  };
}