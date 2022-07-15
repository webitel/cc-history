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
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="stt-download"
              @click="downloadTxt"
            ></wt-icon-btn>
          </template>
          {{ $t('registry.stt.downloadTxt') }}
        </wt-tooltip>
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="bucket"
              @click="deleteTranscription"
            ></wt-icon-btn>
          </template>
          {{ $t('reusable.delete') }}
        </wt-tooltip>
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
import saveAs from 'file-saver';
import CallTranscriptAPI from '../../../../stt/api/CallTranscriptAPI';
import CallVisualizationHeader from '../call-visualization-header.vue';
import CallNoTranscript from './call-no-transcript.vue';

export default {
  name: 'call-transcript',
  components: {
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
    },
    namespace: {
      type: String,
    },
  },

  data: () => ({
    phrases: [],
    channels: [],
    isLoading: false,
  }),
  computed: {
    headers() {
      return [
        {
          value: 'time',
          text: this.$t('vocabulary.time'),
          width: '140px',
        },
        {
          value: 'channel',
          text: this.$t('vocabulary.channel'),
          width: '100px',
        },
        {
          value: 'phrase',
          text: this.$t('vocabulary.text'),
        },
      ];
    },
    data() {
      return this.phrases.map(({
                                 startSec, endSec, phrase, channel,
                               }) => ({
        time: `${startSec} - ${endSec}`,
        channel: channel ? (this.call.to?.name || 1) : (this.call.from?.name || 0),
        phrase,
      }));
    },
    filteredData() {
      return this.data.filter(({ channel }) => this.channels[channel]?.show);
    },
    transcript() {
      return (this.call.transcripts || []).find(({ fileId }) => this.file.id === fileId);
    },
  },
  methods: {
    async loadCallTranscript() {
      try {
        this.isLoading = true;
        this.phrases = await CallTranscriptAPI.get({ id: this.transcript.id });
      } finally {
        this.isLoading = false;
      }
    },
    initChannels() {
      this.channels = [
        ...new Set(
          this.data.map(({ channel }) => channel),
        ),
      ].reduce((channels, channel) => (
        { ...channels, [channel]: { value: channel, show: true } }
      ), {});
    },
    downloadTxt() {
      const text = this.filteredData.map(({ phrase }) => `- ${phrase}`).join('\n');
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      return saveAs(blob, `Transcript ${this.transcript.id}`);
    },
    async deleteTranscription() {
      const fileId = this.transcript.id;
      await CallTranscriptAPI.delete({ fileId });
      this.$emit('delete', this.transcript);
    },
    resetCallTranscript() {
      this.phrases = [];
    },
  },
  watch: {
    transcript: {
      handler(value) {
        if (value) this.loadCallTranscript();
        else this.resetCallTranscript();
      },
      immediate: true,
    },
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
  max-height: 60vh;
  overflow: auto;
}
</style>
