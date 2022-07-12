<template>
  <article class="call-transcript">
    <wt-loader v-show="isLoading"></wt-loader>
    <div v-show="!isLoading">
      <div class="call-transcript-toolbar">
        <wt-checkbox
          v-for="(channel) of channels"
          :key="channel.value"
          v-model="channel.show"
          :label="`${$t('vocabulary.channel')} ${channel.value}`"
        ></wt-checkbox>
        <wt-tooltip
          class="call-transcript-toolbar__download-action"
        >
          <template v-slot:activator>
            <wt-icon-btn
              icon="stt-download"
              @click="downloadTxt"
            ></wt-icon-btn>
          </template>
          {{ $t('registry.stt.downloadTxt') }}
        </wt-tooltip>
      </div>
      <wt-table
        :data="filteredData"
        :headers="headers"
        :selectable="false"
      ></wt-table>
    </div>
  </article>
</template>

<script>
import saveAs from 'file-saver';
import CallTranscriptAPI from '../../../../stt/api/CallTranscriptAPI';

export default {
  name: 'call-transcript',
  props: {
    transcript: {
      type: Object,
      required: true,
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
.call-transcript-toolbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 0 calc(var(--icon-md-size) + var(--spacing-xs)); // absolute pos to align actions right
  margin-bottom: var(--spacing-xs);

  .call-transcript-toolbar__download-action {
    position: absolute;
    right: 0;
  }
}
</style>
