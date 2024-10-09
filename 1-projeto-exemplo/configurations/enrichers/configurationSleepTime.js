import { fail, sleep } from 'k6';
import { envs } from '../base/envs.js';

export function getSleepTimeFunction(runSleepFunction) {
	const sleepTime = getSleepTime();

	if (runSleepFunction === true)
		return function () {
			sleep(sleepTime);
		};

	return function () {};
}

function getSleepTime() {
	if (envs.sleepTime === undefined) return 0.5;
	if (envs.sleepTime !== undefined && isNaN(envs.sleepTime)) fail('__ENV.SLEEP_TIME deve ser um número.');

	return Number(envs.sleepTime);
}
