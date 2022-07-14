<template>
  <section class="call-transcript">
    <call-visualization-header>
      <template v-slot:title>
        {{ $t('registry.stt.transcription') }}
      </template>
      <template v-slot:main>
        <wt-checkbox
          v-for="(channel) of channels"
          :key="channel.value"
          v-model="channel.show"
          :label="`${$t('vocabulary.channel')} ${channel.value}`"
        ></wt-checkbox>
      </template>
      <template v-if="transcript" v-slot:actions>
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
      <wt-table
        v-show="!isLoading"
        :data="filteredData"
        :headers="headers"
        :selectable="false"
      ></wt-table>
    </article>
    <call-no-transcript
      v-else
      :call="call"
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
    transcript: {
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
        channel: channel || 0,
        phrase,
      }));
    },
    filteredData() {
      return this.data.filter((line) => this.channels[line.channel]?.show);
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
      ].map((channel) => ({ value: channel, show: true }));
    },
    downloadTxt() {
      const text = this.filteredData.map(({ phrase }) => `- ${phrase}`).join('\n');
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      return saveAs(blob, `Transcript ${this.transcript.id}`);
    },
    deleteTranscription() {
      const fileId = this.transcript.id;
      CallTranscriptAPI.delete({ fileId });
    },
  },
  watch: {
    transcript: {
      handler() {
        this.loadCallTranscript();
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
</style>
