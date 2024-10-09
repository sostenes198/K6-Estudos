import { getConfig } from '../../configurations/configurations.js';
import { definitionEnvironments } from '../../configurations/base/environments.js';
import { envs } from '../../configurations/base/envs.js';

const application = 'K6.Estudos';

export function getConfigK6Test() {
	let config = getConfig();
	configK6Options(config.k6Options);
	configApiOptions(config.apiOptions, config.environment);
	return Object.assign({}, config);
}

function configK6Options(k6Options) {
	addExtraTagsK6Options(k6Options);
}

function addExtraTagsK6Options(k6Options) {
	Object.assign(k6Options.tags, { application: application, service: application });
}

function configApiOptions(apiOptions, environment) {
	apiOptions.host = getHost(environment);
	addExtraParamsToApiOptions(apiOptions);
}

function getHost(environment) {
	switch (environment) {
		case definitionEnvironments.local:
			return 'http://localhost:5000';
		case definitionEnvironments.dsv:
			return '';
		case definitionEnvironments.hml:
			return '';
		case definitionEnvironments.prd:
			return '';
	}
}

function addExtraParamsToApiOptions(apiOptions) {
	addExtraTagsToParamsApiOptions(apiOptions.params);
	addExtraHeadersToParamsApiOptions(apiOptions.params);
}

function addExtraTagsToParamsApiOptions(params) {
	Object.assign(params.tags, {});
}

function addExtraHeadersToParamsApiOptions(params) {
	Object.assign(params.headers, addContentTypeHeader(), addMockHeaders());
}

function addContentTypeHeader() {
	return {
		'Content-Type': 'application/json',
	};
}

function addMockHeaders() {
	let mocks;
	if (envs.mocks == undefined || envs.mocks === '') mocks = [];
	else mocks = envs.mocks.split(',');	

	return {
		mocks: mocks,
	};
}