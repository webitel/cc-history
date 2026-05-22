import { convertDuration } from '@webitel/ui-sdk/scripts';
import type { EngineEndpoint } from 'webitel-sdk';

import { computeDateAndTime } from './computeDateTime';

type ExportItem = Record<string, unknown> & {
	from?: EngineEndpoint;
};

const DATE_TIME_FIELDS = [
	'created_at',
	'bridged_at',
	'queue_bridged_at',
	'answered_at',
	'joined_at',
	'leaving_at',
	'hangup_at',
	'reporting_at',
] as const;

const DURATION_FIELDS = [
	'duration',
	'hold_sec',
	'wait_sec',
	'bill_sec',
	'talk_sec',
	'reporting_sec',
	'queue_wait_sec',
	'queue_duration_sec',
] as const;

const applyToField = (
	item: ExportItem,
	field: string,
	transform: (value: never) => unknown,
) => {
	if (item[field]) item[field] = transform(item[field] as never);
};

export const transformExportItems = (items: ExportItem[]): ExportItem[] =>
	items.map((item) => {
		const convertedItem: ExportItem = {
			...item,
		};

		DATE_TIME_FIELDS.forEach((field) =>
			applyToField(convertedItem, field, computeDateAndTime),
		);
		DURATION_FIELDS.forEach((field) =>
			applyToField(convertedItem, field, convertDuration),
		);

		if (item.from) {
			convertedItem.from = item.from.number;
		}

		return convertedItem;
	});
