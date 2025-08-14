import { INodeProperties } from 'n8n-workflow';

export const pipelineOperations: INodeProperties[] = [
	{
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
	},
];

export const pipelineFields: INodeProperties[] = [
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