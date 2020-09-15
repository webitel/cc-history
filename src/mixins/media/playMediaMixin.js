import generateMediaURL from './scripts/generateMediaURL';

export default {
  data: () => ({
    audioURL: '',
    currentlyPlaying: '0',
    isPlayingNow: false,
  }),

  methods: {
    play(fileId) {
      if (fileId) {
        this.currentlyPlaying = fileId;
        this.audioURL = generateMediaURL(fileId);
      } else {
        this.closePlayer();
      }
    },

    closePlayer() {
      this.audioURL = null;
      this.isPlayingNow = false;
      this.currentlyPlaying = '0';
    },
  },
};
