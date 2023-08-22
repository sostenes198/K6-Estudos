import { getEnvironment } from './enrichers/configurationEnvironment.js';
import { getSleepTimeFunction } from './enrichers/configurationSleepTime.js';
import { getExecutor } from './enrichers/executors/configurationExecutor.js';
import { getM2MToken } from './enrichers/configurationM2MToken.js';
import { getK6Options } from './configurationK6Options.js';
import { getApiOptions } from './configurationApiOptions.js';

export function getConfig() {
	const environment = getEnvironment();
	const executor = getExecutor();
	const sleepTimeFunction = getSleepTimeFunction(executor.runSleepTimeFunctionInScenarios);
	const m2mToken = getM2MToken();
	const k6Options = getK6Options(environment, executor);
	const apiOptions = getApiOptions(m2mToken);

	return {
		environment,
		sleepTimeFunction,
		k6Options,
		apiOptions		
	};
}
