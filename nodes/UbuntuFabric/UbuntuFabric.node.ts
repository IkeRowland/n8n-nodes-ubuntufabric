import type { IExecuteFunctions } from 'n8n-workflow';

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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['endpoint'],
					},
				},
				options: [
					{
						name: 'Execute',
						value: 'exec',
						description: 'Execute an endpoint',
						action: 'Execute an endpoint',
					},
				],
				default: 'exec',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pipeline'],
					},
				},
				options: [
					{
						name: 'Run',
						value: 'run',
						description: 'Run a pipeline',
						action: 'Run a pipeline',
					},
				],
				default: 'run',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['query'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new query',
						action: 'Create a new query',
					},
					{
						name: 'Execute',
						value: 'exec',
						description: 'Execute a query',
						action: 'Execute a query',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['script'],
					},
				},
				options: [
					{
						name: 'Logs',
						value: 'logs',
						description: 'Get script logs',
						action: 'Get script logs',
					},
					{
						name: 'Run',
						value: 'run',
						description: 'Run a script',
						action: 'Run a script',
					},
				],
				default: 'logs',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['table'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a table',
						action: 'Get a table',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List tables',
						action: 'List tables',
					},
				],
				default: 'get',
			},
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
