import { fail } from 'k6';
import { getExecutorPerVuInterations, executorPerVuIterations } from './executors/executorPerVuInterations.js';
import { getExecutorConstantArrivalRate, executorConstantArrivalRate } from './executors/executorConstantArrivalRate.js';
import { envs } from '../../base/envs.js';

export function getExecutor() {
	validateRequireExecutor();
	return internalGetExecutor(envs.executorType.toLowerCase());
}

function validateRequireExecutor() {
	if (envs.executorType === undefined) fail('__ENV.EXECUTOR_TYPE é obrigatório');
}

function internalGetExecutor(executorType) {
	switch (executorType) {
		case executorPerVuIterations:
			return getExecutorPerVuInterations();
		case executorConstantArrivalRate:
			return getExecutorConstantArrivalRate();
		default:
			fail(`Executor ${executorType} não encontrado.`);
	}
}
