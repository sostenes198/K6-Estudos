import { envs } from '../base/envs.js';

export function getM2MToken() {
	if (envs.m2mToken == undefined) return '';

	return envs.m2mToken;
}
