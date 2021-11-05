<template>
  <section class="call-wave-page">
    <wt-progress-bar
      v-show="isLoading"
      :value="loadProgress" :max="100">
    </wt-progress-bar>
    <section :class="{'call-wave-page--hidden': isLoading}">
      <div class="call-wave-download">
        <wt-icon-btn
          icon="download-record"
          icon-prefix="hs"
          @click="downloadFile"
        ></wt-icon-btn>
      </div>
      <section class="call-wave-data--grid">
        <section class="call-wave-data-legs-actions">
          <div class="call-wave-leg" v-if="!leftGain.disabled">
            <wt-icon-btn
              :icon="leftGain.muted ? 'sound-off': 'sound-on'"
              @click="toggleLeftGain"
            ></wt-icon-btn>
            <wt-slider
              :value="volumeLeftGain"
              :min="0"
              :max="2"
              :step="0.01"
              vertical
              @input="volumeLeftChangeHandler"
            />
          </div>
          <div class="call-wave-leg" v-if="!rightGain.disabled">
            <wt-icon-btn
              :icon="rightGain.muted ? 'sound-off': 'sound-on'"
              @click="toggleRightGain"
            ></wt-icon-btn>
            <wt-slider
              :value="volumeRightGain"
              :min="0"
              :max="2"
              :step="0.01"
              vertical
              @input="volumeRightChangeHandler"
            />
          </div>
        </section>
        <section class="call-wave-data-plugin" v-if="file">
          <wavesurfer
            :options="waveOptions"
            :src="file"
            ref="surf">
          </wavesurfer>
          <div v-if="holdsExist">
            <div
              v-for="hld in holdData"
              v-once
              :key="hld.start"
              class="wave-hold-info"
              :style="{ left: iconPosition(hld) }">
              <wt-icon icon="pause" color="hold"></wt-icon>
              {{ hld.duration }}
            </div>
          </div>
          <div id="wave-timeline" class="call-wave-timeline"></div>
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
            <wt-button color="secondary" :disabled="zoom > 1000" @click="increaseZoom">
              <wt-icon icon="zoom-in"/>
            </wt-button>
            <wt-button color="secondary" :disabled="zoom < 0.001" @click="decreaseZoom">
              <wt-icon icon="zoom-out"/>
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
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import { SoundTouch, SimpleFilter, getWebAudioNode } from 'soundtouchjs';
import generateMediaURL from '../../../../../../mixins/media/scripts/generateMediaURL';

// Some width constants in order to position hold icons correctly:
const GRID_GAP = 15;
const EQUALIZER_WIDTH = 70;
const HOLD_INFO_WIDTH = 70;

const cursorOptions = {
  showTime: true,
  opacity: 1,
  customShowTimeStyle: {
    backgroundColor: 'var(--contrast-color)',
    color: 'var(--main-color)',
    padding: 'var(--component-padding)',
  },
  formatTimeCallback: convertDuration,
};

const timelineOptions = {
  container: '#wave-timeline',
  notchPercentHeight: 1,
  unlabeledNotchColor: 'var(--secondary-color)',
  fontFamily: 'Montserrat Regular, monospace',
  fontSize: 14,
  labelPadding: 5,
  primaryLabelInterval: 5,
  secondaryLabelInterval: 10,
  formatTimeCallback: convertDuration,
};

const getHoldSecInterval = ({ hold, file }) => {
  const start = ((hold.start - file.startAt) / 1000).toFixed(2);
  const end = ((hold.stop - file.startAt) / 1000).toFixed(2);
  const duration = convertDuration((hold.stop - hold.start) / 1000);
  return { start, end, duration };
};

export default {
  name: 'opened-call-wave',
  mixins: [exportFilesMixin],
  data: () => ({
    volumeLeftGain: 1,
    volumeRightGain: 1,
    isLoading: true,
    loadProgress: 0,
    zoom: 1,
    playbackRate: 1,
    isPlaying: false,
    timeLineWidth: 0,
    holdData: [],
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
        Cursor.create(cursorOptions),
        Markers.create({ markers: [] }),
        Timeline.create(timelineOptions),
        Regions.create({}),
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
    holdsExist() {
      return this.timeLineWidth && this.holdData.length > 0;
    },
    iconPosition() { // counting the width of audio track and icon absolute positioning
      return (hold) => {
        const fileLength = this.player.getDuration().toFixed(2);
        const pxInSec = this.timeLineWidth / fileLength;
        const position = ((pxInSec * hold.start) - HOLD_INFO_WIDTH).toFixed();
        return `${position}px`;
      };
    },
  },

  methods: {
    downloadFile() {
      this.exportFiles(this.call.files);
    },

    volumeRightChangeHandler(value) {
      this.volumeRightGain = value;
      this.rightGain.muted = !this.volumeRightGain;
      this.rightGain.audio.gain.value = value;
    },
    volumeLeftChangeHandler(value) {
      this.volumeLeftGain = value;
      this.leftGain.muted = !this.volumeLeftGain;
      this.leftGain.audio.gain.value = value;
    },

    increaseZoom() {
      this.zoom *= 2;
      this.player.zoom(this.zoom);
    },
    decreaseZoom() {
      this.zoom /= 2;
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

    initSoundOptions() {
      this.soundOptions.length = this.player.backend.buffer.length;
      this.soundOptions.st = new SoundTouch(this.player.backend.ac.sampleRate);
      this.soundOptions.splitter = this.player.backend.ac.createChannelSplitter(2);
      this.soundOptions.merger = this.player.backend.ac.createChannelMerger(2);
      this.soundOptions.leftGain = this.player.backend.ac.createGain();
      this.soundOptions.rightGain = this.player.backend.ac.createGain();
      this.soundOptions.splitter.connect(this.soundOptions.leftGain, 0);
      this.soundOptions.splitter.connect(this.soundOptions.rightGain, 1);
      this.soundOptions.leftGain.connect(this.soundOptions.merger, 0, 0);
      this.soundOptions.rightGain.connect(this.soundOptions.merger, 0, 1);
    },

    setSoundFilters() {
      this.player.backend.setFilters([this.soundOptions.splitter, this.soundOptions.leftGain, this.soundOptions.merger]);
      this.leftGain.audio = this.soundOptions.leftGain;
      const stereo = this.player.backend.getPeaks().length === 2;
      if (stereo) {
        this.rightGain.audio = this.soundOptions.rightGain;
        this.rightGain.disabled = false;
      }
      this.soundOptions.st = new SoundTouch(
        this.player.backend.ac.sampleRate,
      );
      const channels = this.player.backend.buffer.numberOfChannels;
      const leftChan = this.player.backend.buffer.getChannelData(0);
      const rightChan = channels > 1 ? this.player.backend.buffer.getChannelData(1) : leftChan;

      const that = this.soundOptions;
      that.source = {
        extract(target, numFrames, position) {
          if (that.seekingPos != null) {
            that.seekingDiff = that.seekingPos - position;
            that.seekingPos = null;
          }
          // eslint-disable-next-line no-param-reassign
          position += that.seekingDiff;
          for (let i = 0; i < numFrames; i++) {
            // eslint-disable-next-line no-param-reassign
            target[i * 2] = leftChan[i + position];
            // eslint-disable-next-line no-param-reassign
            target[i * 2 + 1] = rightChan[i + position];
          }
          return Math.min(numFrames, that.length - position);
        },
      };
    },
    playFiltered() {
      this.soundOptions.splitter = this.player.backend.ac.createChannelSplitter(2);
      this.soundOptions.splitter.connect(this.soundOptions.leftGain, 0);
      this.soundOptions.splitter.connect(this.soundOptions.rightGain, 1);
      this.soundOptions.seekingPos = Math.floor(this.player.backend.getPlayedPercents() * this.soundOptions.length);
      this.soundOptions.st.tempo = this.player.getPlaybackRate();
      if (this.soundOptions.st.tempo === 1) {
        this.player.backend.setFilter(this.soundOptions.splitter, this.soundOptions.leftGain, this.soundOptions.merger);
      } else {
        if (!this.soundOptions.soundtouchNode) {
          const filter = new SimpleFilter(this.soundOptions.source, this.soundOptions.st);
          this.soundOptions.soundtouchNode = getWebAudioNode(this.player.backend.ac, filter);
          this.soundOptions.soundtouchNode.connect(this.soundOptions.splitter);
        }
        this.player.backend.setFilter(
          this.soundOptions.soundtouchNode,
          this.soundOptions.splitter,
          this.soundOptions.leftGain,
          this.soundOptions.merger,
        );
      }
    },
    pauseFiltered() {
      if (this.soundOptions.soundtouchNode) {
        this.soundOptions.soundtouchNode.disconnect();
      }
    },
    seekFiltered() {
      this.pauseFiltered();
      const position = this.player.backend.getPlayedPercents() * this.soundOptions.length;
      this.soundOptions.seekingPos = Math.floor(position);
      this.playFiltered();
    },

    onLoad() {
      const { player } = this;
      this.initSoundOptions();
      this.setSoundFilters();
      player.on('play', this.playFiltered);
      player.on('pause', this.pauseFiltered);
      player.on('seek', this.seekFiltered);
    },

    displayHolds() {
      this.holdData.forEach((hold) => {
        this.player.addRegion({
          ...hold,
          color: 'hsla(var(--_hold-color), 0.2)',
          drag: false,
          resize: false,
        });
      });
    },

    toggleLeftGain() {
      this.leftGain.audio.gain.value = this.leftGain.audio.gain.value === 0 ? this.volumeLeftGain : 0;
      this.leftGain.muted = !this.leftGain.muted;
    },
    toggleRightGain() {
      this.rightGain.audio.gain.value = this.rightGain.audio.gain.value === 0 ? this.volumeRightGain : 0;
      this.rightGain.muted = !this.rightGain.muted;
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
    initializeHolds() {
      this.holdData = [];
      this.call.hold.map((hold) => {
        const hld = getHoldSecInterval({ hold, file: this.call.files[0] });
        this.holdData.push(hld);
      });
    },

    onReady() {
      const { player, call } = this;
      this.onLoad();
      this.hideProgress();
      if (this.call.hold) {
        this.timeLineWidth = this.$el.clientWidth - EQUALIZER_WIDTH - GRID_GAP;
        this.initializeHolds();
        this.displayHolds();
      }
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

  created() {
    this.initFilesExport({ filename: 'history-record' });
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

    .call-wave-data-plugin {
      position: relative;

      .wave-hold-info {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        bottom: 30px;
      }

      .call-wave-timeline {
        height: 26px;
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
