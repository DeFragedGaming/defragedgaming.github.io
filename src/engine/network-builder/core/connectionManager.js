

export class ConnectionManager {
  constructor(networkState) {
    this.state = networkState;
  }

  
  addConnection(from, to) {
    
    if (from.deviceId === to.deviceId) return;

    const connection = { from, to };
    this.state.addConnection(connection);
  }

  
  removeConnection(predicate) {
    this.state.removeConnection(predicate);
  }

  removeConnectionByDevices(deviceA, deviceB) {
    this.removeConnection((c) => {
      const pair = [c.from.deviceId, c.to.deviceId];
      return pair.includes(deviceA) && pair.includes(deviceB);
    });
  }

  getConnections() {
    return this.state.getConnections();
  }

  getConnectionsForDevice(deviceId) {
    return this.state
      .getConnections()
      .filter(
        (c) =>
          c.from.deviceId === deviceId || c.to.deviceId === deviceId
      );
  }
}