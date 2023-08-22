export function getApiOptions(m2mToken) {
	return {
		host: '',
		params: {
			tags: {},
			headers: getHeaders(m2mToken),
		},
	};
}

function getHeaders(m2mToken) {
	var headers = {};
	if (m2mToken != '') Object.assign(headers, { Authorization: `Bearer ${m2mToken}` });

	return headers;
}
