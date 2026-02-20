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
		<files-counter
			v-show="isLoading"
			:download-progress="filesDownloadProgress.count || transcriptsDownloadProgress.count"
			:zipping-progress="filesZippingProgress.percent || transcriptsZippingProgress.percent"
		/>
	</div>
</template>

<script
	lang="ts"
	setup
>
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import {
	EngineHistoryCall,
	EngineTranscriptLookup,
	StorageListPhrases,
} from '@webitel/api-services/gen/models';

import CallTranscriptAPI from '../../../../modules/main/modules/registry/modules/stt/api/callTranscript';
import { useCallFilesExport } from '../../composables/useCallFilesExport';
import { useCallTranscriptsExport } from '../../composables/useCallTranscriptsExport';
import FilesCounter from './files-counter.vue';

const props = defineProps<{
	dataList: Record<string, unknown>[];
	filters: Record<string, unknown>;
	selected: Record<string, unknown>[];
}>();

const { filters, selected } = toRefs(props);

const { t } = useI18n();

const {
	exportAudioFiles,
	exportVideoFiles,
	exportScreenRecordings,
	isLoading: isFilesLoading,
	downloadStatus: filesDownloadProgress,
	zippingStatus: filesZippingProgress,
} = useCallFilesExport({
	filters,
	selected,
});

const {
	exportFiles: exportTranscripts,
	isLoading: isTranscriptsLoading,
	downloadStatus: transcriptsDownloadProgress,
	zippingStatus: transcriptsZippingProgress,
} = useCallTranscriptsExport({
	filters,
	selected,
});

const isLoading = computed(
	() => isFilesLoading.value || isTranscriptsLoading.value,
);

const downloadOptions = computed(() => [
	{
		value: 'audio-recording',
		text: t('export.audioRecording', 2),
		handler: exportAudioFiles,
	},
	{
		value: 'video-recording',
		text: t('export.videoRecording', 2),
		handler: exportVideoFiles,
	},
	{
		value: 'screen-recording',
		text: t('export.screenRecording', 2),
		handler: exportScreenRecordings,
	},
	{
		value: 'transcript',
		text: t('export.transcription', 2),
		handler: exportTranscripts,
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
