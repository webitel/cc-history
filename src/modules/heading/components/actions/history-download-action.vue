<template>
  <div class="history-download-action">
    <wt-button-select
      :disabled="!dataList.length"
      :options="downloadOptions"
      class="history-action"
      color="secondary"
      @click:option="$event.handler()"
    >
      {{ $t('reusable.download') }}...
    </wt-button-select>
    <files-counter
      v-show="isLoading"
      :download-progress="downloadProgress"
      :zipping-progress="zippingProgress"
    />
  </div>
</template>

<script>
import { EngineCallFileType } from "@webitel/api-services/gen/models";
import exportFilesMixin from "@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin";

import APIRepository from "../../../../app/api/APIRepository";
import { getCallMediaUrl } from "@webitel/api-services/api";
import downloadTranscriptsMixin from "../../mixins/downloadTranscriptsMixin";
import historyActionMixin from "../../mixins/historyActionMixin";
import FilesCounter from "./files-counter.vue";

export default {
	name: "HistoryDownloadAction",
	components: { FilesCounter },
	mixins: [historyActionMixin, exportFilesMixin, downloadTranscriptsMixin],
	props: {
		dataList: {
			type: Array,
		},
		filters: {
			type: Object,
		},
	},
	computed: {
		selectedItems() {
			return this.selected;
		}, // needed for exportFilesMixin
		isLoading() {
			return this.isTranscriptsLoading || this.isFilesLoading;
		},
		downloadProgress() {
			return this.transcriptDownloadProgress || this.filesDownloadProgress;
		},
		zippingProgress() {
			return this.transcriptZippingProgress || this.filesZippingProgress;
		},
		downloadOptions() {
			return [
				{
					value: "audio-recording",
					text: this.$t("export.audioRecording", 2),
					handler: this.callExportAudioFiles.bind(this),
				},
				{
					value: "video-recording",
					text: this.$t("export.videoRecording", 2),
					handler: this.callExportVideoFiles.bind(this),
				},
				{
					value: "screen-recording",
					text: this.$t("export.screenRecording", 2),
					handler: this.callExportScreenRecordings.bind(this),
				},
				{
					value: "transcript",
					text: this.$t("export.transcription", 2),
					handler: this.exportTranscripts.bind(this),
				},
			];
		},
	},
	created() {
		this.initFilesExport({
			fetchMethod: APIRepository.history.getHistory,
			filename: "history-records",
			filesURL: getCallMediaUrl,
		});
	},
	methods: {
		callExportAudioFiles() {
			if (this.isLoading) return;
			const params = { ...this.filters, hasFile: true };
			return this.exportFiles(null, params, EngineCallFileType.FileTypeAudio);
		},
		callExportVideoFiles() {
			if (this.isLoading) return;
			const params = { ...this.filters, hasFile: true };
			return this.exportFiles(null, params, EngineCallFileType.FileTypeVideo);
		},
		callExportScreenRecordings() {
			if (this.isLoading) return;
			const params = { ...this.filters, hasFile: true };
			return this.exportFiles(
				null,
				params,
				EngineCallFileType.FileTypeScreensharing,
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.history-download-action {
  position: relative;
}
</style>
