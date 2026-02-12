import { NetworkState } from './state/networkState.js';
import { DeviceManager } from './core/deviceManager.js';
import { ConnectionManager } from './core/connectionManager.js';
import { ValidationEngine } from './core/validationEngine.js';
import { ScenarioLoader } from './state/scenarioLoader.js';

// FIXED IMPORT — THIS WAS BREAKING EVERYTHING
import { NetworkEngine } from "../network/index";

import { Logger } from "../logging/logger.js";
import DeviceConfigPanel from "../network-builder/panels/DeviceConfigPanel.js";

export function createNetworkBuilderEngine() {
  const state = new NetworkState();
  const deviceManager = new DeviceManager(state);
  const connectionManager = new ConnectionManager(state);
  const validationEngine = new ValidationEngine(state);
  const scenarioLoader = new ScenarioLoader(state, deviceManager);

  const engine = {
    state,
    deviceManager,
    connectionManager,
    validationEngine,
    scenarioLoader,
    logger: new Logger(),
    network: null,
    ui: {
      DeviceConfigPanel,
    },
  };

  deviceManager.engine = engine;
  connectionManager.engine = engine;
  validationEngine.engine = engine;
  scenarioLoader.engine = engine;

  engine.network = new NetworkEngine(engine);

  return engine;
}