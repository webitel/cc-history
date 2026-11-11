<template>
	<div class="history-download-action">
		<wt-button-select
			:disabled="!dataList.length || isLoading"
			:options="downloadOptions"
			:loading="isLoading"
			class="history-action"
			color="secondary"
			@click:option="$event.handler()"
		>
			{{ $t('reusable.download') }}...
		</wt-button-select>
	</div>
</template>

<script
	lang="ts"
	setup
>
import { useDownloadAction } from '@webitel/ui-sdk/composables';
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCallFilesExport } from '../../composables/useCallFilesExport';
import { useCallTranscriptsExport } from '../../composables/useCallTranscriptsExport';

const props = defineProps<{
	dataList: Record<string, unknown>[];
	filters: Record<string, unknown>;
	selected: {
		id: string;
	}[];
}>();

const { filters, selected } = toRefs(props);

const { t } = useI18n();

const {
	exportAudioFiles,
	exportVideoFiles,
	exportScreenRecordings,
	downloadStatus: filesDownloadProgress,
} = useCallFilesExport({
	filters,
	selected,
});

const {
	exportFiles: exportTranscripts,
	downloadStatus: transcriptsDownloadProgress,
} = useCallTranscriptsExport({
	filters,
	selected,
});

const { isLoading, runDownload } = useDownloadAction();

/* [Claude] backend gives no total count, so the toast shows only the number of downloaded files */
const withProgress = (exportFn: () => Promise<void>) => () =>
	runDownload(exportFn, {
		progress: {
			loaded: () =>
				filesDownloadProgress.value.count ||
				transcriptsDownloadProgress.value.count,
		},
	});

const downloadOptions = computed(() => [
	{
		value: 'audio-recording',
		text: t('export.audioRecording', 2),
		handler: withProgress(exportAudioFiles),
	},
	{
		value: 'video-recording',
		text: t('export.videoRecording', 2),
		handler: withProgress(exportVideoFiles),
	},
	{
		value: 'screen-recording',
		text: t('export.screenRecording', 2),
		handler: withProgress(exportScreenRecordings),
	},
	{
		value: 'transcript',
		text: t('export.transcription', 2),
		handler: withProgress(exportTranscripts),
	},
]);
</script>

<style
	lang="scss"
	scoped
>
.history-download-action {
	position: relative;
}
</style>
