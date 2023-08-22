import http from 'k6/http';
import { getConfigK6Test } from '../../configurationK6Test.js';

const config = getConfigK6Test();
const params = config.apiOptions.params;
const host = config.apiOptions.host;

export function getHealthCheck(requestHealthCheck) {
	params.tags.httpName = 'healthcheck';
	const endpoint = requestHealthCheck.endpoint;
	const res = http.request(requestHealthCheck.method.toUpperCase(), `${host}/${endpoint}`, null, params);
	return res;
}

