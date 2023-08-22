import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { getConfigK6Test } from '../configurationK6Test.js';
import { getHealthCheck } from './requests/get-healthcheck.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const config = getConfigK6Test();
const env = config.environment;

const jsonData = new SharedArray('getHealthCheck', function () {
	const jsonParse = JSON.parse(open(`./data/${env}/get-healthcheck.json`));
	return [jsonParse];
});

export const options = getK6Options();

export function setup() {
	return { requestHealthCheck: jsonData[0] };
}

export default function (data) {
	const res = getHealthCheck(data.requestHealthCheck);
	check(res, {
		'is status 200': (r) => r.status == 200,
	});
	if (res.status != 200) console.log(JSON.stringify(res));
	config.sleepTimeFunction();
}

function getK6Options() {
	const k6Options = config.k6Options;
	addExtraK6Configurations(k6Options);
	return k6Options;
}

function addExtraK6Configurations(k6Options) {
	k6Options.tags['scenario'] = 'healthcheck';
	Object.assign(k6Options, { discardResponseBodies: false });
}

// report
export function handleSummary(data) {
	return {
		stdout: textSummary(data, { indent: ' ', enableColors: true }),
		'k6-summary.html': htmlReport(data),
	};
}
