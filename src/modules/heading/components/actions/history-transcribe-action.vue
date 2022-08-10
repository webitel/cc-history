<template>
  <wt-button
    :disabled="!selected.length"
    :loading="isTranscribing"
    color="secondary"
    @click="bulkTranscribe"
  >{{ $t('registry.stt.transcribe') }}
  </wt-button>
</template>

<script>
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/CallTranscriptAPI';
import historyActionMixin from '../../mixins/historyActionMixin';

export default {
  name: 'history-transcribe-action',
  mixins: [historyActionMixin],
  data: () => ({
    isTranscribing: false,
  }),
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
