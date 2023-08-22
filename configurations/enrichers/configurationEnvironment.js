import { fail } from 'k6';
import { enviroments } from '../base/environments.js';
import { envs } from '../base/envs.js';

export function getEnvironment() {
	validateRequiredEnvironment();
	return envs.environment.toLowerCase();
}

function validateRequiredEnvironment() {	
	if (envs.environment === undefined) fail('__ENV.ENVIRONMENT é obrigatório.');
	if (enviroments.includes(envs.environment.toLowerCase()) === false) fail('__ENV.ENVIRONMENT deve ser um ambiente conhecido (LOCAL, DSV, HML ou PRD).');
}
