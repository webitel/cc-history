<template>
  <section class="call-transcript">
    <call-visualization-header>
      <template v-slot:title>
        {{ $tc('registry.stt.transcription', 1) }}
      </template>
      <template v-slot:main>
        <wt-checkbox
          v-for="(channel) of channels"
          :key="channel.value"
          v-model="channel.show"
          :label="channel.value"
        ></wt-checkbox>
      </template>
      <template
        v-if="transcript"
        v-slot:actions
      >
        <stt-download-action
          @click="downloadTxt(filteredData)"
        ></stt-download-action>
        <stt-delete-action
          @click="deleteTranscription"
        ></stt-delete-action>
      </template>
    </call-visualization-header>
    <article
      v-if="transcript"
      class="call-transcript"
    >
      <wt-loader v-show="isLoading"></wt-loader>
      <div class="call-transcript__table-wrapper">
        <wt-table
          v-show="!isLoading"
          :data="filteredData"
          :headers="headers"
          :selectable="false"
        ></wt-table>
      </div>
    </article>
    <call-no-transcript
      v-else
      :call="call"
      :file="file"
      :namespace="namespace"
    ></call-no-transcript>
  </section>
</template>

<script>
import CallVisualizationHeader from '../../../call/components/call-visualization/call-visualization-header.vue';
import transcriptPhrasesMixin from '../../mixins/transcriptPhrasesMixin';
import SttDeleteAction from '../utils/stt-delete-action.vue';
import SttDownloadAction from '../utils/stt-download-action.vue';
import CallNoTranscript from './call-no-transcript-section.vue';

export default {
  name: 'call-transcript',
  mixins: [transcriptPhrasesMixin],
  components: {
    SttDeleteAction,
    SttDownloadAction,
    CallVisualizationHeader,
    CallNoTranscript,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    file: {
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
    filteredData() {
      return this.data.filter(({ channel }) => this.channels[channel]?.show);
    },
    transcript() {
      return (this.call.transcripts || [])
      .find(({ fileId, id }) => this.file.id === fileId || this.file.id === id);
    },
  },
  methods: {
    initChannels() {
      this.channels = [
        ...new Set(
          this.data.map(({ channel }) => channel),
        ),
      ].reduce((channels, channel) => (
        { ...channels, [channel]: { value: channel, show: true } }
      ), {});
    },
  },
  watch: {
    data() {
      this.initChannels();
    },
  },
};
</script>

<style lang="scss" scoped>
.call-visualization-header {
  margin-bottom: var(--spacing-sm);
}

.call-transcript__table-wrapper {
  @extend %wt-scrollbar;
  overflow: auto;
  max-height: 60vh;
}
</style>
