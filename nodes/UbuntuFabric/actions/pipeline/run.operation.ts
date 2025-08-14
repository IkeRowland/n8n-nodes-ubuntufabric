import { ubuntufabricApiRequest } from '../../transport';

export const run: any = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['pipeline'],
		},
	},
	options: [
		{
			name: 'Run',
			value: 'run',
			description: 'Run a pipeline',
			action: 'Run a pipeline',
		},
	],
	default: 'run',
};

export const runFields: any = [
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['run'],
			},
		},
		description: 'ID of the pipeline to run',
	},
];

export async function execute(this: any, i: number): Promise<any> {
	const pipelineId = this.getNodeParameter('pipelineId', i) as string;

	const body = {
		pipeline_id: pipelineId,
	};

	const response = await ubuntufabricApiRequest.call(
		this,
		'POST',
		`api/pipelines/${pipelineId}/run/`,
		body,
	);

	return response;
}
