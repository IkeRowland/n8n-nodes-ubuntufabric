import { INodeProperties } from 'n8n-workflow';

export const scriptOperations: INodeProperties[] = [
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
];

export const scriptFields: INodeProperties[] = [
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['logs', 'run'],
			},
		},
		description: 'ID of the script',
	},
];
