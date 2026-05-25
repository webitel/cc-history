import { convertDuration } from '@webitel/ui-sdk/scripts';
import type { EngineEndpoint } from 'webitel-sdk';

import { computeDateAndTime } from './computeDateTime';

type ExportItem = Record<string, unknown> & {
	from?: EngineEndpoint;
};

export const transformExportItems = (items: ExportItem[]): ExportItem[] =>
	items.map((item) => {
		const convertedItem: ExportItem = {
			...item,
		};

		if (item.created_at) {
			convertedItem.created_at = computeDateAndTime(item.created_at);
		}

		if (item.bridged_at) {
			convertedItem.bridged_at = computeDateAndTime(item.bridged_at);
		}

		if (item.queue_bridged_at) {
			convertedItem.queue_bridged_at = computeDateAndTime(
				item.queue_bridged_at,
			);
		}

		if (item.answered_at) {
			convertedItem.answered_at = computeDateAndTime(item.answered_at);
		}

		if (item.joined_at) {
			convertedItem.joined_at = computeDateAndTime(item.joined_at);
		}

		if (item.leaving_at) {
			convertedItem.leaving_at = computeDateAndTime(item.leaving_at);
		}

		if (item.hangup_at) {
			convertedItem.hangup_at = computeDateAndTime(item.hangup_at);
		}

		if (item.reporting_at) {
			convertedItem.reporting_at = computeDateAndTime(item.reporting_at);
		}

		if (item.duration) {
			convertedItem.duration = convertDuration(item.duration);
		}

		if (item.hold_sec) {
			convertedItem.hold_sec = convertDuration(item.hold_sec);
		}

		if (item.wait_sec) {
			convertedItem.wait_sec = convertDuration(item.wait_sec);
		}

		if (item.bill_sec) {
			convertedItem.bill_sec = convertDuration(item.bill_sec);
		}

		if (item.talk_sec) {
			convertedItem.talk_sec = convertDuration(item.talk_sec);
		}

		if (item.reporting_sec) {
			convertedItem.reporting_sec = convertDuration(item.reporting_sec);
		}

		if (item.queue_wait_sec) {
			convertedItem.queue_wait_sec = convertDuration(item.queue_wait_sec);
		}

		if (item.queue_duration_sec) {
			convertedItem.queue_duration_sec = convertDuration(
				item.queue_duration_sec,
			);
		}

		if (item.from) {
			convertedItem.from = item.from.number;
		}

		return convertedItem;
	});
