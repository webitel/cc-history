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
import { isEmpty } from '@webitel/ui-sdk/scripts';
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/callTranscript.js';
import historyActionMixin from '../../mixins/historyActionMixin';

export default {
  name: 'HistoryTranscribeAction',
  mixins: [historyActionMixin],
  data: () => ({
    isTranscribing: false,
  }),
  computed: {
    allowTranscribe() {
      const hasSelected = (selected) => selected.length;
      const eachHasFile = (selected) => selected.every(({ files }) => !isEmpty(files));
      const eachHasNoTranscript = (selected) => selected.every(({ transcripts }) => isEmpty(transcripts));

      return [
        hasSelected,
        eachHasFile,
        eachHasNoTranscript,
      ].every((rule) => rule(this.selected));
    },
  },
  methods: {
    async bulkTranscribe() {
      try {
        this.isTranscribing = true;
        const callId = this.selected.map(({ id }) => id);
        await CallTranscriptAPI.create({ callId });
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
