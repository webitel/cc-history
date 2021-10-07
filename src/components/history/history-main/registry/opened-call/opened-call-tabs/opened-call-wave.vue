<template>
  <section class="call-wave-page">
    <wt-progress-bar
      v-show="isLoading"
      :value="loadProgress" :max="100">
    </wt-progress-bar>
    <section :class="{'call-wave-page--hidden': isLoading}">
      <div class="call-wave-download">
        <wt-icon-btn icon="download"></wt-icon-btn>
      </div>
      <section class="call-wave-data--grid">
        <section class="call-wave-data-legs-actions">
          <div class="call-wave-leg-top" v-if="!leftGain.disabled">
            <wt-icon-btn
              :icon="leftGain.muted ? 'sound-off': 'sound-on'"
              @click="toggleGain(leftGain)"
            ></wt-icon-btn>
          </div>
          <div class="call-wave-leg-bottom" v-if="!rightGain.disabled">
            <wt-icon-btn
              :icon="rightGain.muted ? 'sound-off': 'sound-on'"
              @click="toggleGain(rightGain)"
            ></wt-icon-btn>
          </div>
        </section>
        <section class="call-wave-data-plugin" v-if="file">
          <wavesurfer
            :options="waveOptions"
            :src="file"
            ref="surf">
          </wavesurfer>
          <div id="wave-timeline"></div>
        </section>
        <div></div> <!-- an empty div in order to position in the correct grid column -->
        <section class="call-wave-actions">
          <section class="call-wave-actions-buttons">
            <wt-button :color="speedButtonColor(2)" @click="toggleRate(2)">
              <wt-label>x2</wt-label>
            </wt-button>
            <wt-button :color="speedButtonColor(1.5)" @click="toggleRate(1.5)">
              <wt-label>x1.5</wt-label>
            </wt-button>
            <wt-button :color="speedButtonColor(0.75)" @click="toggleRate(0.75)">
              <wt-label>x0.75</wt-label>
            </wt-button>
            <wt-button :color="speedButtonColor(0.5)" @click="toggleRate(0.5)">
              <wt-label>x0.5</wt-label>
            </wt-button>
            <wt-button :color="isPlaying ? 'primary': 'secondary'" @click="playPause">
              <wt-icon :icon="!isPlaying ? 'play' : 'pause'"></wt-icon>
            </wt-button>
          </section>
          <section class="call-wave-actions-buttons">
            <wt-button color="secondary" :disabled="zoom >= 300" @click="changeZoom(20)">
              <wt-label>+</wt-label>
            </wt-button>
            <wt-button color="secondary" :disabled="zoom <= 100" @click="changeZoom(-20)">
              <wt-label>-</wt-label>
            </wt-button>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';

import generateMediaURL from '../../../../../../mixins/media/scripts/generateMediaURL';

export default {
  name: 'opened-call-wave',
  data: () => ({
      isLoading: true,
      loadProgress: 0,
      zoom: 100,
      playbackRate: 1,
      isPlaying: false,
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
      waveOptions: {
        cursorWidth: 2,
        splitChannels: true,
        minPxPerSec: 30,
        height: 150,
        pixelRatio: 1,
        plugins: [
          Markers.create({
            markers: [],
          }),
          Timeline.create({
            container: '#wave-timeline',
            primaryColor: 'var(--main-accent-color)',
            secondaryColor: 'var(--transfer-color)',
            primaryFontColor: '#808080',
            secondaryFontColor: 'var(--transfer-color)',
          }),
        ],
        splitChannelsOptions: {
          overlay: false,
          channelColors: {
            0: {
              progressColor: 'hsla(119, 60%, 40%, 0.8)',
            },
            1: {
              progressColor: 'hsl(42, 100%, 50%)',
            },
          },
        },
      },
  }),

  computed: {
    ...mapState('registry/opened-call', {
      file: (state) => generateMediaURL(state.mainCall.files[0].id, true),
      call: (state) => state.mainCall,
    }),
    player() {
      return this.$refs.surf && this.$refs.surf.waveSurfer;
    },
    speedButtonColor() {
      return (value) => (this.playbackRate === value ? 'primary' : 'secondary');
    },
  },

  methods: {
    changeZoom(value) {
      this.zoom += value;
      this.player.zoom(this.zoom);
    },

    initWave() {
      const { player } = this;
      player.on('pause', this.changedPlaying.bind(this));
      player.on('finish', this.changedPlaying.bind(this));
      player.on('play', this.changedPlaying.bind(this));
      player.on('loading', this.showProgress.bind(this));
      player.on('ready', this.onReady.bind(this));
      player.on('destroy', this.hideProgress.bind(this));
      player.on('error', this.hideProgress.bind(this));
    },

    onLoad() {
      const { player } = this;
      const stereo = player.backend.getPeaks().length === 2;
      const splitter = player.backend.ac.createChannelSplitter(2);
      const merger = player.backend.ac.createChannelMerger(2);
      const leftGain = player.backend.ac.createGain();
      const rightGain = player.backend.ac.createGain();
      // Here is where the wavesurfer and web audio combine.
      splitter.connect(leftGain, 0);
      splitter.connect(rightGain, 1);
      leftGain.connect(merger, 0, 0);
      rightGain.connect(merger, 0, 1);
      player.backend.setFilters([splitter, leftGain, merger]);
      this.leftGain.audio = leftGain;
      if (stereo) {
        this.rightGain.audio = rightGain;
        this.rightGain.disabled = false;
      }
    },
    toggleGain(g) {
      // eslint-disable-next-line no-param-reassign
      g.audio.gain.value = g.audio.gain.value === 0 ? 1 : 0;
      // eslint-disable-next-line no-param-reassign
      g.muted = g.audio.gain.value === 0;
    },
    changedPlaying() {
      this.isPlaying = this.player.isPlaying();
    },
    playPause() {
      this.player.playPause();
    },
    toggleRate(value) {
      const { player } = this;
      this.playbackRate = this.playbackRate === value ? 1 : value;

      // https://github.com/katspaugh/wavesurfer.js/issues/2349
      const isPlaying = player.isPlaying();
      if (isPlaying) this.playPause();
      player.setPlaybackRate(this.playbackRate);
      if (isPlaying) this.playPause();
    },
    showProgress(progress) {
      this.loadProgress = +progress;
    },
    hideProgress() {
      this.loadProgress = 0;
      this.isLoading = false;
    },
    onReady() {
      const { player, call } = this;
      this.onLoad();
      this.hideProgress();

      player.addMarker({
        time: 0,
        position: 'top',
        label: call.from.name || call.from.number,
        color: player.params.splitChannelsOptions.channelColors[0].progressColor,
      });
      if (this.rightGain) {
        player.addMarker({
          time: 0,
          label: Object.keys(call.to).length ? (call.to.name || call.to.number) : call.destination,
          color: player.params.splitChannelsOptions.channelColors[1].progressColor,
        });
      }
      player.drawBuffer();
      this.redraw();
    },
    redraw() {
      const { player } = this;
      player._onResize();
    },
  },

  watch: {
    file() {
      this.initWave();
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.player && this.file) {
        this.initWave();
      }
    });
  },
};
</script>

<style scoped lang="scss">
.call-wave-page {
  &--hidden {
    display: none;
  }

  .call-wave-download {
    text-align: right;
  }

  .call-wave-data--grid {
    display: grid;
    grid-gap: var(--component-spacing);
    grid-template-columns: 70px 1fr;
    grid-template-rows: repeat(2, auto);

    .call-wave-data-legs-actions {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }

    .call-wave-actions {
      display: flex;
      gap: var(--component-spacing);
      justify-content: space-between;

      .call-wave-actions-buttons {
        display: flex;
        gap: var(--component-spacing)
      }
    }
  }
}
</style>
