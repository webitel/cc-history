<template>
  <section class="call-visualization">
    <wt-select
      v-model="currentFile"
      :clearable="false"
      :label="$t('vocabulary.file')"
      :options="currentFIleOptions"
      class="call-visualization__filepicker"
      track-by="id"
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
    currentFile: null,
  }),
  computed: {
    currentFIleOptions() {
      return this.call.files
        || (this.call.transcripts || this.call.filesJob)
        .map(({ id }) => ({ id, name: id }));
    },
  },
  methods: {
    initCurrentFile() {
      [this.currentFile] = this.currentFIleOptions;
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
