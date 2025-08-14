import { ubuntufabricApiRequest } from '../../transport';

export const create: any = {
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
};

export const createFields: any = [
	{
		displayName: 'Name',
		name: 'name',
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
		displayName: 'SQL',
		name: 'sql',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['query'],
				operation: ['create'],
			},
		},
		description: 'SQL query',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const name = this.getNodeParameter('name', i) as string;
	const sql = this.getNodeParameter('sql', i) as string;

	const body = {
		name,
		sql,
	};

	const response = await ubuntufabricApiRequest.call(
		this,
		'POST',
		'api/queries/',
		body,
	);

	return response;
}
