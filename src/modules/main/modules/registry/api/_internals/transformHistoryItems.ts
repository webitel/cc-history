import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import * as converters from '@webitel/ui-sdk/scripts/caseConverters';
import { formatDate } from '@webitel/ui-sdk/utils';
import type {
	EngineCallAnnotation,
	EngineCallFile,
	EngineHistoryCall,
	EngineTranscriptLookup,
} from 'webitel-sdk';

import { computeTimeWithSec } from './computeDateTime';

type HistoryItem = EngineHistoryCall & Record<string, unknown>;

const mapDefaultComments = (item: HistoryItem): EngineCallAnnotation[] => {
	const defaultComment = {
		startSec: 0,
		endSec: 0,
		note: '',
	};

	return item.annotations
		? item.annotations.map((comment) => ({
				...defaultComment,
				...comment,
			}))
		: [];
};

const mapTranscripts = (item: HistoryItem) => {
	return item.transcripts
		? item.transcripts.map((transcript: EngineTranscriptLookup) => ({
				...transcript,
				name: transcript.file?.name,
			}))
		: [];
};

const groupFilesByType = (
	files?: EngineCallFile[],
): Record<string, EngineCallFile[]> => {
	if (!files) return {};
	return files.reduce<Record<string, EngineCallFile[]>>((acc, file) => {
		const type = file.type ?? '';
		acc[type] = acc[type] || [];
		acc[type].push(file);
		return acc;
	}, {});
};

export const transformHistoryItems = (items: HistoryItem[]) => {
	return items.map((item) => ({
		_isSelected: false,
		...item,
		createdAt: item.createdAt
			? formatDate(+item.createdAt, FormatDateMode.DATETIME)
			: null,
		bridgedAt: computeTimeWithSec(item.bridgedAt),
		queueBridgedAt: computeTimeWithSec(item.queueBridgedAt),
		answeredAt: computeTimeWithSec(item.answeredAt),
		joinedAt: computeTimeWithSec(item.joinedAt),
		leavingAt: computeTimeWithSec(item.leavingAt),
		hangupAt: computeTimeWithSec(item.hangupAt),
		reportingAt: computeTimeWithSec(item.reportingAt),
		duration: convertDuration(item.duration),
		holdSec: convertDuration(item.holdSec),
		waitSec: convertDuration(item.waitSec),
		billSec: convertDuration(item.billSec),
		talkSec: convertDuration(item.talkSec),
		reportingSec: convertDuration(item.reportingSec),
		queueWaitSec: convertDuration(item.queueWaitSec),
		queueDurationSec: convertDuration(item.queueDurationSec),
		annotations: mapDefaultComments(item),
		hangupDisposition: item.hangupDisposition
			? converters.snakeToCamel(item.hangupDisposition)
			: '',
		score: item.scoreRequired ? item.scoreRequired.toFixed(2) : null,
		transcripts: mapTranscripts(item),
		files: groupFilesByType(item.files),
	}));
};
