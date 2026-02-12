

export class ScenarioLoader {
  constructor(networkState, deviceManager) {
    this.state = networkState;
    this.deviceManager = deviceManager;
  }

  loadScenario(scenario) {
    this.state.reset();
    this.state.setScenario({
      id: scenario.id,
      name: scenario.name,
      description: scenario.description,
      objectives: scenario.objectives || [],
    });

    
    (scenario.devices || []).forEach((deviceConfig) => {
      this.deviceManager.createDevice(deviceConfig);
    });

    
    (scenario.connections || []).forEach((conn) => {
      this.state.addConnection(conn);
    });
  }
}