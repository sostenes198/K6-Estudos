import { fail } from 'k6';
import { envs } from '../../../base/envs.js';

export const executorPerVuIterations = 'per-vu-iterations';

const params = parseExecutorParams();

export function getExecutorPerVuInterations() {	
	validateRequiredEnvs();

	return {
		configuration: {
			executor: executorPerVuIterations,
			vus: params.vus,
			iterations: params.iterations,
			maxDuration: getMaxDuration(params),
		},
		extraTags: getExtraTags(),
		runSleepTimeFunctionInScenarios: true,
	};
}

function parseExecutorParams() {
	try {
		return JSON.parse(envs.executorParamsPerVuIterations);
	} catch (e) {
		return '';
	}
}

function validateRequiredEnvs() {
	if (typeof params !== 'object') fail('__ENV.EXECUTOR_PARAMS_PER_VU_ITERATIONS é obrigatório e deve ser um objeto exemplo: {"vus":1,"iterations":1,"maxDuration":"3h30m"}.');

	if (params.vus === undefined) fail('vus é obrigatório.');
	if (isNaN(params.vus)) fail('vus deve ser um número.');

	if (params.iterations === undefined) fail('iterations é obrigatório.');
	if (isNaN(params.iterations)) fail('iterations deve ser um número.');
}

function getMaxDuration(params) {
	if (params.maxDuration !== undefined) return params.maxDuration;

	return '3h30m';
}

function getExtraTags() {
	return {
		executor: executorPerVuIterations,
		vus: params.vus,
		iterations: params.iterations,
	};
}
