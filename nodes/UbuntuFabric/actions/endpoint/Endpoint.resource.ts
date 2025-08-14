import { INodeProperties } from 'n8n-workflow';

export const endpointOperations: INodeProperties[] = [
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
];

export const endpointFields: INodeProperties[] = [
	{
		displayName: 'Endpoint Name or ID',
		name: 'endpointId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getEndpoints',
		},
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an expression',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['exec'],
			},
		},
	},
];