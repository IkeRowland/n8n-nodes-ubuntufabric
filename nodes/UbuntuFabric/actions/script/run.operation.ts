import { ubuntufabricApiRequest } from '../../transport';

export const run: any = {
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
	default: 'run',
};

export const runFields: any = [
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['run'],
			},
		},
		description: 'ID of the script to run',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const scriptId = this.getNodeParameter('scriptId', i) as string;

	const body = {
		script_id: scriptId,
	};

	const response = await ubuntufabricApiRequest.call(
		this,
		'POST',
		`api/scripts/${scriptId}/run/`,
		body,
	);

	return response;
}
