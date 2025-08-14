import { INodeProperties } from 'n8n-workflow';

export const tableOperations: INodeProperties[] = [
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
];

export const tableFields: INodeProperties[] = [
	{
		displayName: 'Table ID',
		name: 'tableId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['get'],
			},
		},
		description: 'Get data from a UbuntuFabric table',
	},
];
