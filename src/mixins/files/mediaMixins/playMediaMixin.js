import { generateURL } from '../filesScripts';
import AudioPlayer from '../../../components/utils/audio-player.vue';

export default {
  components: {
    AudioPlayer,
  },
  data: () => ({
    audioURL: '',
    currentlyPlaying: '0',
    isPlayingNow: false,
  }),

  methods: {
    play(fileId) {
      if (fileId) {
        this.currentlyPlaying = fileId;
        this.audioURL = generateURL(fileId);
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
