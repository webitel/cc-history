<template>
  <wt-button
    :disabled="disableTranscribe"
    :loading="isTranscribing"
    color="secondary"
    @click="bulkTranscribe"
  >
    {{ $t('registry.stt.transcribe') }}
  </wt-button>
</template>

<script>
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/CallTranscriptAPI';
import historyActionMixin from '../../mixins/historyActionMixin';

export default {
  name: 'HistoryTranscribeAction',
  mixins: [historyActionMixin],
  data: () => ({
    isTranscribing: false,
  }),
  computed: {
    disableTranscribe() {
      /*
      Trascribe only if selected has file, but has no transcripts
      can't filter by filesJob cause if transcript is triggered, but no refresh, there's no filesJob
       */
      return !this.selected.length || this.selected
        .every(({ files, transcripts }) => !files || transcripts);
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
