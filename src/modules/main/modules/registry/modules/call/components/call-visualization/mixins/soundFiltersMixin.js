import { getWebAudioNode, SimpleFilter, SoundTouch } from 'soundtouchjs';

/* This mixin is created in order to correct sound pitch changing playback rate.

Wavesurfer library uses the WebAudio API, which isn't perfect when it comes to change playing speed.
When user changes playback speed, it triggers modification of sound pitch.
To prevent it, we had to setup additional filters.
'Soundtouch' library offers such filters, so we are using it.
In order to have filters logic separated from the main file, we've created the mixin and put all the
filters' related data and methods.
A part, this mixin contatins methods, related to audio file download. */

export default {
  data: () => ({
    soundOptions: {
      st: null,
      soundtouchNode: null,
      seekingPos: null,
      seekingDiff: 0,
      length: null,
      splitter: null,
      merger: null,
      source: null,
      leftGain: null,
      rightGain: null,
    },
    leftGain: {
      disabled: false,
      muted: false,
      name: 'A',
      audio: null,
    },
    rightGain: {
      disabled: true,
      muted: false,
      name: 'B',
      audio: null,
    },
  }),

  methods: {
    initSoundOptions() {
      // Initializiation of sound parameters and gains, needed to work with sound filters:
      this.soundOptions.length = this.player.backend.buffer.length;
      this.soundOptions.st = new SoundTouch(this.player.backend.ac.sampleRate);
      this.soundOptions.splitter =
        this.player.backend.ac.createChannelSplitter(2);
      this.soundOptions.merger = this.player.backend.ac.createChannelMerger(2);
      this.soundOptions.leftGain = this.player.backend.ac.createGain();
      this.soundOptions.rightGain = this.player.backend.ac.createGain();
      this.soundOptions.splitter.connect(this.soundOptions.leftGain, 0);
      this.soundOptions.splitter.connect(this.soundOptions.rightGain, 1);
      this.soundOptions.leftGain.connect(this.soundOptions.merger, 0, 0);
      this.soundOptions.rightGain.connect(this.soundOptions.merger, 0, 1);
    },

    setSoundFilters() {
      // setting sound filters to correct sound on different speeds:
      this.player.backend.setFilters([
        this.soundOptions.splitter,
        this.soundOptions.leftGain,
        this.soundOptions.merger,
      ]);
      this.leftGain.audio = this.soundOptions.leftGain;
      const stereo = this.player.backend.getPeaks().length === 2;
      if (stereo) {
        this.rightGain.audio = this.soundOptions.rightGain;
        this.rightGain.disabled = false;
      }
      this.soundOptions.st = new SoundTouch(this.player.backend.ac.sampleRate);
      const channels = this.player.backend.buffer.numberOfChannels;
      const leftChan = this.player.backend.buffer.getChannelData(0);
      const rightChan =
        channels > 1 ? this.player.backend.buffer.getChannelData(1) : leftChan;
      const data = this.soundOptions;
      data.source = {
        extract(target, numFrames, position) {
          if (data.seekingPos != null) {
            data.seekingDiff = data.seekingPos - position;
            data.seekingPos = null;
          }
           
          position += data.seekingDiff;

          for (let i = 0; i < numFrames; i++) {
            target[i * 2] = leftChan[i + position];

            target[i * 2 + 1] = rightChan[i + position];
          }
          return Math.min(numFrames, data.length - position);
        },
      };
    },
    playFiltered() {
      // recreate splitter and connect two gains when playing:
      this.soundOptions.splitter =
        this.player.backend.ac.createChannelSplitter(2);
      this.soundOptions.splitter.connect(this.soundOptions.leftGain, 0);
      this.soundOptions.splitter.connect(this.soundOptions.rightGain, 1);
      // change playing position with cursor:
      const position =
        this.player.backend.getPlayedPercents() * this.soundOptions.length;
      this.soundOptions.seekingPos = Math.floor(position);
      this.soundOptions.st.tempo = this.player.getPlaybackRate();
      if (this.soundOptions.st.tempo === 1) {
        this.player.backend.setFilter(
          this.soundOptions.splitter,
          this.soundOptions.leftGain,
          this.soundOptions.merger,
        );
      } else {
        // create new filter to correct sound when speed is changed:
        if (!this.soundOptions.soundtouchNode) {
          const filter = new SimpleFilter(
            this.soundOptions.source,
            this.soundOptions.st,
          );
          this.soundOptions.soundtouchNode = getWebAudioNode(
            this.player.backend.ac,
            filter,
          );
          this.soundOptions.soundtouchNode.connect(this.soundOptions.splitter);
        }
        // connect all filters:
        this.player.backend.setFilter(
          this.soundOptions.soundtouchNode,
          this.soundOptions.splitter,
          this.soundOptions.leftGain,
          this.soundOptions.merger,
        );
      }
    },
    pauseFiltered() {
      // disconnect filters if audio paused
      if (this.soundOptions.soundtouchNode) {
        this.soundOptions.soundtouchNode.disconnect();
      }
    },
    seekFiltered() {
      // change playing position with click:
      const position =
        this.player.backend.getPlayedPercents() * this.soundOptions.length;
      this.soundOptions.seekingPos = Math.floor(position);
    },
    onLoad() {
      const { player } = this;
      this.initSoundOptions();
      this.setSoundFilters();
      player.on('play', this.playFiltered);
      player.on('pause', this.pauseFiltered);
      player.on('seek', this.seekFiltered);
    },
    changedPlaying() {
      this.isPlaying = this.player.isPlaying();
    },
    playPause() {
      this.player.playPause();
    },

    redraw() {
      const { player } = this;
      player._onResize();
    },
  },
};
