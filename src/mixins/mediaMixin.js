const token = localStorage.getItem('access-token');
const BASE_URL = process.env.VUE_APP_API_URL;

export default {
  data: () => ({
    audioURL: '',
    currentlyPlaying: '0',
    isPlayingNow: false,
  }),

  methods: {
    play(fileId) {
      this.currentlyPlaying = fileId;
      this.audioURL = `${BASE_URL}/storage/recordings/${fileId}/stream?access_token=${token}`;
    },
  },
};
