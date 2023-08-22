import { fail } from 'k6';
import { envs } from '../../../base/envs.js';

export const executorConstantArrivalRate = 'constant-arrival-rate';

const params = parseExecutorParams();

export function getExecutorConstantArrivalRate() {	
	validateRequiredEnvs();

	return {
		configuration: {
			executor: executorConstantArrivalRate,
			duration: params.duration,
			rate: params.tps,
			preAllocatedVUs: params.preAllocatedVus,
			timeUnit: getTimeUnit(),
			maxVUs: params.maxVus,
		},
		extraTags: getExtraTags(),
		runSleepTimeFunctionInScenarios: false,
	};
}

function parseExecutorParams() {
	try {
		return JSON.parse(envs.executorParamsConstantArrivalRate);
	} catch (e) {
		return '';
	}
}

function validateRequiredEnvs() {
	if (typeof params !== 'object') fail('__ENV.EXECUTOR_PARAMS_CONSTANT_ARRIVAL_RATE é obrigatório e deve ser um objeto exemplo: {"duration":"1m","tps":100,"preAllocatedVUs":100, "maxVus": 200}.');

	if (params.duration === undefined) fail('duration é obrigatório');

	if (params.tps === undefined) fail('tps é obrigatório');
	if (isNaN(params.tps)) fail('tps deve ser um número.');

	if (params.preAllocatedVus === undefined) fail('preAllocatedVus é obrigatório');
	if (isNaN(params.preAllocatedVus)) fail('preAllocatedVus deve ser um número.');

	if (params.maxVus === undefined) fail('maxVus é obrigatório');
	if (isNaN(params.maxVus)) fail('maxVus deve ser um número.');
}

function getTimeUnit() {
	return '1s';
}

function getExtraTags() {
	return {
		executor: executorConstantArrivalRate,
		duration: params.duration,
		rate: params.tps,
	};
}
