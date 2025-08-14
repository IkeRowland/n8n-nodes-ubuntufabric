import type { IExecuteFunctions } from 'n8n-workflow';

import type { IDataObject } from 'n8n-workflow';

import * as endpoint from './endpoint/exec.operation';
import * as pipeline from './pipeline/run.operation';
import * as query from './query/create.operation';
import * as script from './script/logs.operation';
import * as table from './table/get.operation';

export async function router(this: IExecuteFunctions, nodeData: IDataObject, i: number): Promise<IDataObject> {
	const resource = nodeData.resource as string;

	let responseData: IDataObject;

	switch (resource) {
		case 'endpoint':
			const endpointResult = await endpoint.execute.call(this, i);
			responseData = endpointResult[0].json;
			break;
		case 'pipeline':
			responseData = await pipeline.execute.call(this, i);
			break;
		case 'query':
			responseData = await query.execute.call(this, i);
			break;
		case 'script':
			responseData = await script.execute.call(this, i);
			break;
		case 'table':
			responseData = await table.execute.call(this, i);
			break;
		default:
			throw new Error(`The resource "${resource}" is not known!`);
	}

	return responseData;
}
