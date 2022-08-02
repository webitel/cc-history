import CallTranscriptAPI from '../api/CallTranscriptAPI';
import saveTranscriptPhrasesMixin from './saveTranscriptPhrasesMixin';

export default {
  mixins: [saveTranscriptPhrasesMixin],
  data: () => ({
    phrases: [],
    isLoading: false,
  }),
  computed: {
    headers() {
      return [
        {
          value: 'time',
          text: this.$t('vocabulary.time'),
            width: '120px',
        },
        {
          value: 'channel',
          text: this.$t('vocabulary.channel'),
          width: '140px',
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
        if (value) return this.loadCallTranscript();
        return this.resetCallTranscript();
      },
      immediate: true,
    },
  },
};
