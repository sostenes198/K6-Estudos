import { getGracefulStopTime } from './base/gracefulStopTime.js';

export function getK6Options(environment, executor) {
	return {
		noConnectionReuse: getNoConnectionReuse(),
		scenarios: getScenarios(executor),
		systemTags: getSystemTags(),
		tags: getTags(environment, executor.extraTags),
	};
}

function getScenarios(executor) {
	const defaultExecutorConfigurations = {
		gracefulStop: getGracefulStopTime(),
	};

	const configurationsExecutor = Object.assign(executor.configuration, defaultExecutorConfigurations);

	return { default: configurationsExecutor };
}

function getNoConnectionReuse() {
	return true;
}

function getTags(environment, extraTagsExecutor) {
	const defaultTags = {
		scenario: '',
		env: environment,
	};

	const tags = Object.assign(defaultTags, extraTagsExecutor);

	return tags;
}

function getSystemTags() {
	return ['service', 'env', 'application'];
}
