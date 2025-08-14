// run.operation.ts (Endpoint Exec)
import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';

import { ubuntufabricApiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Endpoint Name or ID',
		name: 'endpointId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getEndpoints',
		},
		default: '',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
	},
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		options: [
			{
				name: 'GET',
				value: 'GET',
			},
			{
				name: 'POST',
				value: 'POST',
			},
			{
				name: 'PUT',
				value: 'PUT',
			},
			{
				name: 'DELETE',
				value: 'DELETE',
			},
		],
		default: 'GET',
		required: true,
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
	},
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		default: '',
		required: false,
		placeholder: '/api/v1/users',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
		description: 'Path to append to the endpoint URL',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
				method: ['POST', 'PUT'],
			},
		},
		description: 'Body to send with the request',
	},
];

export const execute = async function (
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const method = this.getNodeParameter('method', index) as string;
	const path = this.getNodeParameter('path', index) as string;
	const body = this.getNodeParameter('body', index) as string;

	const endpointOption = this.getNodeParameter('endpointId', 0, '', { extractValue: false }) as {
		name?: string;
	};
	const endpointName = endpointOption?.name ?? '';

	let fullUrl: string;
	if (path) {
		const parsed = new URL(path, `https://api.eu.ubuntufabric.io/`);
		fullUrl = `https://api.eu.ubuntufabric.io/${parsed.pathname}`;
	} else {
		fullUrl = `https://api.eu.ubuntufabric.io/${endpointName}`;
	}

	const response = await ubuntufabricApiRequest.call(
		this,
		method,
		'',
		body ? JSON.parse(body) : {},
		{},
		fullUrl,
	);

	return [{ json: response }];
};
