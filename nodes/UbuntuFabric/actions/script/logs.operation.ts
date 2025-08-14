import { ubuntufabricApiRequest } from '../../transport';

export const logs: any = {
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
};

export const logsFields: any = [
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['logs'],
			},
		},
		description: 'ID of the script to get logs for',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const scriptId = this.getNodeParameter('scriptId', i) as string;

	const response = await ubuntufabricApiRequest.call(
		this,
		'GET',
		`api/scripts/${scriptId}/logs/`,
	);

	return response;
}
