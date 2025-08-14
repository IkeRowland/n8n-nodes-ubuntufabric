import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject } from 'n8n-workflow';

import type { UbuntuFabricType } from './node.type';

import * as endpoint from './endpoint/exec.operation';
import * as pipeline from './pipeline/run.operation';
import * as query from './query/create.operation';
import * as script from './script/logs.operation';
import * as table from './table/get.operation';

export async function router(this: IExecuteFunctions): Promise<IDataObject> {
	const resource = this.getNodeParameter<UbuntuFabricType>('resource', 0);
	const operation = this.getNodeParameter<UbuntuFabricType>('operation', 0);

	const ubuntufabricNodeData = {
		resource,
		operation,
	} as UbuntuFabricType;

	let responseData: IDataObject;

	switch (ubuntufabricNodeData.resource) {
		case 'endpoint':
			responseData = await endpoint[ubuntufabricNodeData.operation].execute.call(this, i);
			break;
		case 'pipeline':
			responseData = await pipeline[ubuntufabricNodeData.operation].execute.call(this, i);
			break;
		case 'query':
			responseData = await query[ubuntufabricNodeData.operation].execute.call(this, i);
			break;
		case 'script':
			responseData = await script[ubuntufabricNodeData.operation].execute.call(this, i);
			break;
		case 'table':
			responseData = await table[ubuntufabricNodeData.operation].execute.call(this, i);
			break;
		default:
			throw new Error(`The resource "${ubuntufabricNodeData.resource}" is not known!`);
	}

	return responseData;
}
