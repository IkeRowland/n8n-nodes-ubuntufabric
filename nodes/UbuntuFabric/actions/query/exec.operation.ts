import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { ubuntufabricApiRequest } from '../../transport';

export const exec: any = {
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
	default: 'exec',
};

export const execFields: any = [
	{
		displayName: 'Query ID',
		name: 'queryId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['exec'],
			},
		},
		description: 'ID of the query to execute',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const queryId = this.getNodeParameter('queryId', i) as string;

	const body = {
		query_id: queryId,
	};

	const response = await ubuntufabricApiRequest.call(this, 'POST', 'api/proxy/db/', {
		query: `SELECT * FROM query_${queryId}`,
	});

	return response;
}
