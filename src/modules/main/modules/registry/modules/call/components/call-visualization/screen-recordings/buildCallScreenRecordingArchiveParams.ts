import type { DownloadCallScreenrecordingArchiveParams } from '@webitel/api-services/gen/models';

/**
 * Selected rows → `fileIds` (wins over dates).
 * Otherwise send `from`/`to` as start_at bounds (Unix ms strings).
 */
export const buildCallScreenRecordingArchiveParams = ({
	selected,
	from,
	to,
}: {
	selected: Array<{
		id?: string;
	}>;
	from?: number | null;
	to?: number | null;
}): DownloadCallScreenrecordingArchiveParams => {
	const fileIds = selected
		.map(({ id }) => id)
		.filter((id): id is string => id != null);

	if (fileIds.length) {
		return {
			fileIds,
		};
	}

	const params: DownloadCallScreenrecordingArchiveParams = {};

	if (from != null) params.from = String(from);
	if (to != null) params.to = String(to);

	return params;
};
