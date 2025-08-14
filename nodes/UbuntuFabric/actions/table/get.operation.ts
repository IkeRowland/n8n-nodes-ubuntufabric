import { ubuntufabricApiRequest } from '../../transport';

export const get: any = {
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
};

export const getFields: any = [
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
		description: 'ID of the table to get',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const tableId = this.getNodeParameter('tableId', i) as string;

	const response = await ubuntufabricApiRequest.call(
		this,
		'GET',
		`api/tables/${tableId}/`,
	);

	return response;
}
