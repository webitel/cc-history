<template>
  <section class="call-visualization">
      <wt-select
        class="call-visualization__filepicker"
        v-model="currentFile"
        :label="$t('vocabulary.file')"
        :options="call.files"
        track-by="id"
        :clearable="false"
      ></wt-select>
    <call-wave></call-wave>
    <call-transcript
      :transcript="currentFile.transcripts[0]"
    ></call-transcript>
  </section>
</template>

<script>
import CallTranscript from './transcript/call-transcript.vue';
import CallWave from './wave/call-wave.vue';

export default {
  name: 'call-visualization',
  components: {
    CallWave,
    CallTranscript,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    currentFile: {},
  }),
  methods: {
    initCurrentFile() {
      [this.currentFile] = this.call.files;
    },
  },
  created() {
    this.initCurrentFile();
  },
};
</script>

<style lang="scss" scoped>
.call-visualization {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .call-visualization__filepicker {
    width: 460px;
  }
}
</style>
