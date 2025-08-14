import { INodeProperties } from 'n8n-workflow';

export const queryOperations: INodeProperties[] = [
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
				description: 'Create a sql view in ubuntufabric',
				action: 'Create a sql view in ubuntufabric',
			},
			{
				name: 'Execute',
				value: 'exec',
				description: 'Execute a sql query via ubuntufabric',
				action: 'Execute a sql query via ubuntufabric',
			},
		],
		default: 'create',
	},
];

export const queryFields: INodeProperties[] = [
	{
		displayName: 'Query Name',
		name: 'queryName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['create'],
			},
		},
		description: 'Name of the query',
	},
	{
		displayName: 'SQL Query',
		name: 'querySql',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['create'],
			},
		},
		description: 'SQL query to execute',
	},
];