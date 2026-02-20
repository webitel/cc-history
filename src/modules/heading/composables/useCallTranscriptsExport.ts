import {
	EngineHistoryCall,
	EngineTranscriptLookup,
	StorageListPhrases,
	StorageTranscriptPhrase,
} from '@webitel/api-services/gen/models';
import {
	ExportedItem,
	useFilesExport,
} from '@webitel/ui-sdk/modules/FilesExport';

import APIRepository from '../../../app/api/APIRepository';
import CallTranscriptAPI from '../../../modules/main/modules/registry/modules/stt/api/callTranscript.js';
import { Ref } from 'vue';

interface ExportedTranscriptItem extends ExportedItem {
	call: EngineHistoryCall;
	phrases: StorageTranscriptPhrase[];
	transcript: EngineTranscriptLookup;
}

export const useCallTranscriptsExport = ({
	filters,
	selected,
}: {
	filters: Ref<Record<string, unknown>>;
	selected: Ref<
		{
			id: string;
		}[]
	>;
}) => {
	const { exportFiles, isLoading, downloadStatus, zippingStatus } =
		useFilesExport({
			getFileBlob: async ({ call, phrases }: ExportedTranscriptItem) => {
				const blob = generateTxt({
					phrases,
					from: call.from,
					to: call.to,
				});
				return blob;
			},
			fetch: async ({ page }) => {
				const params = {
					page,
					createdAt: {
						from: 0,
					},
					size: 200,
					hasTranscription: true,
					fields: [
						'created_at',
						'from',
						'to',
						'transcripts',
					],
					...filters,
				};

				if (selected.value.length) {
					params.id = selected.value.map(({ id }) => id);
				}

				// all for the given pagination size
				const allTranscriptsList: ExportedTranscriptItem[] = [];

				const response = await APIRepository.history.getHistory(params);

				for (const call of response.items as EngineHistoryCall[]) {
					for (const transcript of call.transcripts as EngineTranscriptLookup[]) {
						const { items: phrases } = (await CallTranscriptAPI.get({
							id: transcript.id,
						})) as StorageListPhrases;

						allTranscriptsList.push({
							name: `${transcript.id}.txt`,
							call,
							phrases,
							transcript,
						});
					}
				}

				return {
					items: allTranscriptsList,
					next: response.next,
				};
			},
			filename: 'history-transcripts',
		});

	return {
		exportFiles,
		isLoading,
		downloadStatus,
		zippingStatus,
	};
};

function generateTxt({ phrases, from, to }) {
	const text = (phrases || [])
		.map(
			({ phrase, channel, startSec, endSec }) =>
				`${startSec}-${endSec} [${
					channel
						? to?.name || to?.number || to?.destination || channel
						: from?.name || from?.number || from?.destination || channel
				}] ${phrase || ''}`,
		)
		.join('\n');
	const blob = new Blob(
		[
			text,
		],
		{
			type: 'text/plain;charset=utf-8',
		},
	);
	return blob;
}
