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
    <call-wave
      :call="call"
      :file="currentFile"
    ></call-wave>
    <call-transcript
      :call="call"
      :file="currentFile"
      :namespace="namespace"
      @delete="deleteTranscript"
    ></call-transcript>
  </section>
</template>

<script>
import CallTranscript from '../../../stt/components/call-page/call-transcript-section.vue';
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
    namespace: {
      type: String,
    },
  },
  data: () => ({
    currentFile: {},
  }),
  methods: {
    initCurrentFile() {
      [this.currentFile] = this.call.files;
    },
    deleteTranscript(transcript) {
      const index = this.call.transcripts.indexOf(transcript);
      /**
       * we mock deletion of transcription with sending api request from call-transcript.vue
       * to prevent refreshing of all call data and page reload
       */
      // eslint-disable-next-line vue/no-mutating-props
      this.call.transcripts.splice(index, 1);
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
