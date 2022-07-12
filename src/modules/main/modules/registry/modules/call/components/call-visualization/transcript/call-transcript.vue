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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
</style>
