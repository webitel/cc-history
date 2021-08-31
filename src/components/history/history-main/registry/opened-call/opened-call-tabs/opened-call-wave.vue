<template>
  <div class="call-wave-page">
    <wt-progress-bar
      class="call-wave-progress"
      v-show="isLoading"
      :value="loadProgress" :max="100
  "></wt-progress-bar>
    <div :class="isLoading ? 'call-wave-hide': ''">
      <div class="call-wave-data">
        <div class="call-wave-data-action">
          <div class="call-wave-leg-top" v-if="!leftGain.disabled">
            <div></div>
            <wt-icon-btn
              :icon="!leftGain.muted ? 'sound-on': 'sound-off'"
              :color="!leftGain.muted ? 'active': 'outline'"
              @click="toggleGain(leftGain)"
            ></wt-icon-btn>
          </div>
          <div class="call-wave-leg-bottom" v-if="!rightGain.disabled">
            <div></div>
            <wt-icon-btn
              :icon="!rightGain.muted ? 'sound-on': 'sound-off'"
              :color="!rightGain.muted ? 'active': 'outline'"
              @click="toggleGain(rightGain)"
            ></wt-icon-btn>
          </div>
        </div>
        <div class="call-wave-data-plugin" v-if="file">
          <wavesurfer
            :options="waveOptions"
            :src="file"
            ref="surf">
          </wavesurfer>
          <div id="wave-timeline"></div>
        </div>
      </div>
      <div class="call-wave-actions">

        <div class="call-wave-zoom">
          <input class="call-wave-zoom-range" type="range" min="0" max="200" v-model="zoom" />
          {{ zoom }} %
        </div>

        <div class="call-wave-actions-primary">
          <wt-button
            :color="playbackRate === 2 ? 'active': 'secondary'"
            @click="toggleRate()"
          >x2</wt-button>
          <wt-button color="secondary" @click="playPause">
            {{ isPlaying ? 'Pause' : 'Play' }}
          </wt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import { mapState } from 'vuex';

import generateMediaURL from '../../../../../../mixins/media/scripts/generateMediaURL';

export default {
  name: 'opened-call-wave',
  components: {},
  mixins: [],
  data() {
    return {
      isLoading: true,
      loadProgress: 0,
      zoom: 0,
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
              // waveColor: 'pink',
            },
            1: {
              progressColor: 'hsl(42, 100%, 50%)',
              // waveColor: 'pink',
            },
          },
        },
        // barWidth: 2,
        // barRadius: 2,
        cursorWidth: 1,
        splitChannels: true,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.player && this.file) {
        this.initWave();
      }
    });
  },
  computed: {
    ...mapState('registry/opened-call', {
      file: (state) => generateMediaURL(state.mainCall.files[0].id, true),
      call: (state) => state.mainCall,
    }),
    player() {
      return this.$refs.surf && this.$refs.surf.waveSurfer;
    },
  },
  watch: {
    file() {
      this.initWave();
    },
    zoom(val) {
      const { player } = this;
      player.zoom(+val);
    },
  },
  methods: {
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
    toggleRate() {
      const { player } = this;
      this.playbackRate = player.getPlaybackRate() === 2 ? 1 : 2;

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
};

</script>

<style scoped>
.call-wave-hide {
  opacity: 0;
}
.call-wave-page {
  min-height: 150px;
}
.call-wave-actions {
  display: inline-flex;
  width: 100%;
  margin-top: 5px;
}
.call-wave-data {
  width: 100%;
  position: relative;
}
.call-wave-data-plugin {
  margin-left: 70px;
}
.call-wave-data-action {
  width: 70px;
  display: inline-block;
  position: absolute;
  height: 100%;
}
.call-wave-leg-top {
  height: 50%;
}
.call-wave-leg-bottom {
  height: 50%;
}
.call-wave-actions-primary {
  margin: 0 auto;
}
.call-wave-zoom {
  width: 150px;
  position: absolute;
  left: 30px;
  text-align: center;
}
.call-wave-zoom-range {
  width: 100%;
}
</style>

<style>
.call-wave-progress span.wt-progress-bar__progress {
  height: 46px;
}
</style>
