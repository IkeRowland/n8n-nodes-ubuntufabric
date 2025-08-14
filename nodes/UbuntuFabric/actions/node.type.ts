import type { AllEntities } from 'n8n-workflow';

export interface NodeMap {
	endpoint: {
		resource: 'endpoint';
		operation: 'exec';
	};
	pipeline: {
		resource: 'pipeline';
		operation: 'run';
	};
	query: {
		resource: 'query';
		operation: 'create' | 'exec';
	};
	script: {
		resource: 'script';
		operation: 'logs' | 'run';
	};
	table: {
		resource: 'table';
		operation: 'get' | 'list';
	};
}

export type UbuntuFabricType = AllEntities<NodeMap>;
