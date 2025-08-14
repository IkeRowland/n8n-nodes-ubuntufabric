import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject, ILoadOptionsFunctions } from 'n8n-workflow';

export interface IData {
	[key: string]: any;
}

export async function ubuntufabricApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const options: IDataObject = {
		method,
		body,
		qs,
		uri: uri || `https://app.eu.ubuntufabric.io/${endpoint}`,
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'ubuntufabricApi', options);
	} catch (error) {
		throw new Error(`UbuntuFabric API error: ${error.message}`);
	}
}