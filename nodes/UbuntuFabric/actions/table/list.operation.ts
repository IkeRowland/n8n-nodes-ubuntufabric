import { ubuntufabricApiRequest } from '../../transport';

export const list: any = {
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
	default: 'list',
};

export const listFields: any = [
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['list'],
			},
		},
		description: 'ID of the application to list tables for',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const response = await ubuntufabricApiRequest.call(this, 'GET', 'api/applications/');

	return response;
}
