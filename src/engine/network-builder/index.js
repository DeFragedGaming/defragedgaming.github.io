import { NetworkState } from './state/networkState.js';
import { DeviceManager } from './core/deviceManager.js';
import { ConnectionManager } from './core/connectionManager.js';
import { ValidationEngine } from './core/validationEngine.js';
import { ScenarioLoader } from './state/scenarioLoader.js';



export function createNetworkBuilderEngine() {
  const state = new NetworkState();
  const deviceManager = new DeviceManager(state);
  const connectionManager = new ConnectionManager(state);
  const validationEngine = new ValidationEngine(state);
  const scenarioLoader = new ScenarioLoader(state, deviceManager);

  return {
    state,
    deviceManager,
    connectionManager,
    validationEngine,
    scenarioLoader,
  };
}