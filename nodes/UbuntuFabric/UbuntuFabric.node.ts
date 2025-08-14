import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { router } from './actions/router';

export class UbuntuFabric implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UbuntuFabric',
		name: 'ubuntufabric',
		icon: 'file:UbuntuFabric.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from UbuntuFabric',
		defaults: {
			name: 'UbuntuFabric',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ubuntufabricApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.eu.ubuntufabric.io/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Pipeline',
						value: 'pipeline',
					},
					{
						name: 'Query',
						value: 'query',
					},
					{
						name: 'Script',
						value: 'script',
					},
					{
						name: 'Table',
						value: 'table',
					},
				],
				default: 'query',
			},
			...router,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let ubuntufabricNodeData: IDataObject;
		let responseData: IDataObject;

		for (let i = 0; i < items.length; i++) {
			try {
				ubuntufabricNodeData = {
					resource,
					operation,
				} as IDataObject;

				responseData = await router.call(this, ubuntufabricNodeData, i);

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
