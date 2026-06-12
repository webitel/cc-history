<template>
  <wt-button
    :disabled="!allowTranscribe"
    :loading="isTranscribing"
    color="secondary"
    @click="bulkTranscribe"
  >
    {{ $t('registry.stt.transcribe') }}
  </wt-button>
</template>

<script>
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { isEmpty } from '@webitel/ui-sdk/scripts';

import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/callTranscript.js';
import historyActionMixin from '../../mixins/historyActionMixin';

export default {
	name: 'HistoryTranscribeAction',
	mixins: [
		historyActionMixin,
	],
	data: () => ({
		isTranscribing: false,
	}),
	computed: {
		allowTranscribe() {
			const hasSelected = (selected) => selected.length;
			// TODO: Remove this after transcription via video is added
			const eachHasAudioFile = (selected) =>
				selected.every(
					({ files }) => !isEmpty(files?.[EngineCallFileType.FileTypeAudio]),
				);
			const eachHasNoTranscript = (selected) =>
				selected.every(({ transcripts }) => isEmpty(transcripts));

			return [
				hasSelected,
				eachHasAudioFile,
				eachHasNoTranscript,
			].every((rule) => rule(this.selected));
		},
	},
	methods: {
		async bulkTranscribe() {
			try {
				this.isTranscribing = true;
				const callId = this.selected.map(({ id }) => id);
				await CallTranscriptAPI.create({
					callId,
				});
			} finally {
				this.$emit('refresh');
				this.isTranscribing = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
