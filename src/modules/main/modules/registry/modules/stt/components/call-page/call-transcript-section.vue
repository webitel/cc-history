<template>
  <section class="call-transcript">
    <call-visualization-header v-if="transcript">
      <template #main>
        <wt-checkbox
          v-for="(channel) of channels"
          :key="channel.value"
          v-model:selected="channel.show"
          :label="channel.value"
        />
      </template>
      <template #actions>
        <stt-download-action
          @click="downloadTxt(filteredData)"
        />
        <stt-delete-action
          @click="deleteTranscript"
        />
      </template>
    </call-visualization-header>
    <article
      v-if="transcript"
      class="call-transcript"
    >
      <wt-loader v-show="isLoading" />
      <div class="call-transcript__table-wrapper wt-scrollbar">
        <wt-table
          v-show="!isLoading"
          :data="filteredData"
          :headers="headers"
          :selectable="false"
        />
      </div>
    </article>
    <call-no-transcript
      v-else
      :call="call"
      :file="file"
      :namespace="namespace"
    />
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';

import CallVisualizationHeader from '../../../call/components/call-visualization/call-visualization-header.vue';
import CallTranscriptAPI from '../../api/callTranscript.js';
import transcriptPhrasesMixin from '../../mixins/transcriptPhrasesMixin';
import SttDeleteAction from '../utils/stt-delete-action.vue';
import SttDownloadAction from '../utils/stt-download-action.vue';
import CallNoTranscript from './call-no-transcript-section.vue';

export default {
	name: 'CallTranscript',
	components: {
		SttDeleteAction,
		SttDownloadAction,
		CallVisualizationHeader,
		CallNoTranscript,
	},
	mixins: [
		transcriptPhrasesMixin,
	],
	props: {
		call: {
			type: Object,
			required: true,
		},
		namespace: {
			type: String,
		},
	},
	data: () => ({
		channels: [],
	}),
	computed: {
		...mapState({
			file(state) {
				return getNamespacedState(state, this.namespace).selectedRecordingFile;
			},
		}),
		filteredData() {
			return this.data.filter(({ channel }) => this.channels[channel]?.show);
		},
		transcript() {
			return (this.call.transcripts || []).find(
				({ fileId, id }) => this.file.id === fileId || this.file.id === id,
			);
		},
	},
	watch: {
		data() {
			this.initChannels();
		},
	},
	methods: {
		initChannels() {
			this.channels = [
				...new Set(this.data.map(({ channel }) => channel)),
			].reduce(
				(channels, channel) => ({
					...channels,
					[channel]: {
						value: channel,
						show: true,
					},
				}),
				{},
			);
		},
		async deleteTranscript() {
			const fileId = this.transcript.id;
			const index = this.call.transcripts.indexOf(this.transcript);
			await CallTranscriptAPI.delete({
				fileId,
			});
			/**
			 * we mock deletion of transcription with sending api request from call-transcript.vue
			 * to prevent refreshing of all call data and page reload
			 */
			// eslint-disable-next-line vue/no-mutating-props
			this.call.transcripts.splice(index, 1);
		},
	},
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.call-visualization-header {
  margin: var(--spacing-sm) 0;
}

.call-transcript__table-wrapper {
  overflow: auto;
  max-height: 60vh;
}

</style>
