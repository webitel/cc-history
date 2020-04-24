import { generateURL } from './filesScripts';

export default {
  data: () => ({
    audioURL: '',
    currentlyPlaying: '0',
    isPlayingNow: false,
  }),

  methods: {
    play(fileId) {
      this.currentlyPlaying = fileId;
      this.audioURL = generateURL(fileId);
    },
  },
};
