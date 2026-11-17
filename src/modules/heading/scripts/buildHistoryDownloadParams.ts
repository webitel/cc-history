import type { DownloadFetch } from '@webitel/ui-sdk/modules/FilesExport';
import { DownloadType } from '@webitel/ui-sdk/modules/FilesExport';

export const buildHistoryDownloadParams = ({
	page,
	size,
	type,
	filters,
}: Parameters<DownloadFetch>[0] & {
	filters: Record<string, unknown>;
}) => ({
	page,
	size,
	createdAt: {
		from: 0,
	},
	fields: [
		'from',
		'to',
	],
	...(type === DownloadType.Transcriptions
		? {
				hasTranscription: true,
			}
		: {
				hasFile: true,
			}),
	...filters,
});
