export function createServer(id, name = "Server") {
  return {
    id,
    type: "server",
    name,
    x: 100,
    y: 100,

    ip: null,
    gateway: null,

    services: {
      http: false,
      dns: false,
      ssh: false,
    },
  };
}