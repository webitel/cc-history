import { Ref, ref } from 'vue';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { useFilesExport } from '@webitel/ui-sdk/modules/FilesExport';
import { getCallMediaUrl } from '@webitel/api-services/api';
import APIRepository from '../../../app/api/APIRepository';

export const useCallFilesExport = ({
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
	const currentlyDownloadingFileType = ref<EngineCallFileType | null>(null);

	const { exportFiles, isLoading, downloadStatus, zippingStatus } =
		useFilesExport({
			getFileURL: (item) =>
				getCallMediaUrl(item.id, {
					download: true,
				}),
			fetch: async ({ page }) => {
				const params = {
					page,
					createdAt: {
						from: 0,
					},
					fields: [
						'files',
					],
					size: 200,
					hasFile: true,
					...filters,
				};

				if (selected.value.length) {
					params.id = selected.value.map(({ id }) => id);
				}

				const response = await APIRepository.history.getHistory(params);
				return {
					items: response.items.reduce((acc, { files }) => {
						const itemFiles = files[currentlyDownloadingFileType.value] || [];
						return [
							...acc,
							...itemFiles,
						];
					}, []),
					next: response.next,
				};
			},
			filename: 'history-record',
		});

	const exportAudioFiles = async () => {
		currentlyDownloadingFileType.value = EngineCallFileType.FileTypeAudio;
		await exportFiles();
		currentlyDownloadingFileType.value = null;
	};
	const exportVideoFiles = async () => {
		currentlyDownloadingFileType.value = EngineCallFileType.FileTypeVideo;
		await exportFiles();
		currentlyDownloadingFileType.value = null;
	};
	const exportScreenRecordings = async () => {
		currentlyDownloadingFileType.value =
			EngineCallFileType.FileTypeScreensharing;
		await exportFiles();
		currentlyDownloadingFileType.value = null;
	};

	return {
		isLoading,
		downloadStatus,
		zippingStatus,

		exportAudioFiles,
		exportVideoFiles,
		exportScreenRecordings,
	};
};
