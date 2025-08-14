import type { ILoadOptionsFunctions } from 'n8n-workflow';

import type { IDataObject } from 'n8n-workflow';

import { ubuntufabricApiRequest } from '../transport';

export async function getDataWarehouses(this: ILoadOptionsFunctions) {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications/?');
	const returnData: IDataObject[] = [];

	for (const app of response) {
		returnData.push({
			name: app.name,
			value: app.id,
		});
	}

	return returnData;
}

export async function getApplications(this: ILoadOptionsFunctions) {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications');
	const returnData: IDataObject[] = [];

	for (const app of response) {
		returnData.push({
			name: app.name,
			value: app.id,
		});
	}

	return returnData;
}

export async function getInterfaces(this: ILoadOptionsFunctions) {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/interfaces/');
	const returnData: IDataObject[] = [];

	for (const interface_ of response) {
		returnData.push({
			name: interface_.name,
			value: interface_.id,
		});
	}

	return returnData;
}

export async function getPipelineRuns(this: ILoadOptionsFunctions) {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/servers');
	const returnData: IDataObject[] = [];

	for (const server of response) {
		returnData.push({
			name: server.name,
			value: server.id,
		});
	}

	return returnData;
}

export async function getInterfaceRuns(this: ILoadOptionsFunctions) {
	await ubuntufabricApiRequest.call(this, 'GET', 'api/user/account');
	const endpoints = await ubuntufabricApiRequest.call(this, 'GET', 'api/api_endpoints');
	const returnData: IDataObject[] = [];

	for (const endpoint of endpoints) {
		returnData.push({
			name: endpoint.name,
			value: endpoint.id,
		});
	}

	return returnData;
}

export async function getTables(this: ILoadOptionsFunctions) {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications/');
	const returnData: IDataObject[] = [];

	for (const app of response) {
		if (app.tables) {
			for (const table of app.tables) {
				returnData.push({
					name: `${app.name} - ${table.name_in_query}`,
					value: table.id,
				});
			}
		}
	}

	return returnData;
}

export async function getEndpoints(this: ILoadOptionsFunctions) {
	const endpoints = await ubuntufabricApiRequest.call(this, 'GET', 'api/api_endpoints');
	const returnData: IDataObject[] = [];

	for (const endpoint of endpoints) {
		returnData.push({
			name: endpoint.name,
			value: endpoint.id,
		});
	}

	return returnData;
}
