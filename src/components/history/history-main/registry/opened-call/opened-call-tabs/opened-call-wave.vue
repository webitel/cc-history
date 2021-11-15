<template>
  <section class="call-wave-page">
    <wt-progress-bar
      v-show="isLoading"
      :value="loadProgress" :max="100">
    </wt-progress-bar>
    <section
      class="call-wave-page-main"
      :class="{'call-wave-page-main--hidden': isLoading}">
      <section class="call-wave-toolbar">
        <div class="toolbar-main">
          <wt-checkbox
            :value="showHolds"
            :selected="showHolds"
            @change="showHoldsHandler"
            :label="$tc('registry.openedCall.hold', 2)"
          ></wt-checkbox>
          <wt-badge>
            {{ holdsLength }}
          </wt-badge>

          <wt-checkbox
            :value="showComments"
            :selected="showComments"
            @change="showCommentsHandler"
            :label="$tc('registry.openedCall.comment', 2)"
          ></wt-checkbox>
          <wt-badge>{{ commentsLength }}</wt-badge>

        </div>
        <div class="toolbar-actions">
          <wt-icon-btn
            icon="note"
            icon-prefix="hs"
            @click="commentsModeHandler"
          ></wt-icon-btn>
          <wt-icon-btn
            icon="download-record"
            icon-prefix="hs"
            @click="downloadFile"
          ></wt-icon-btn>
        </div>
      </section>

      <opened-call-comment-form v-if="commentsMode"/>

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
          <div style="position: relative; height: 42px">
            <div v-if="holdsExist && showHolds">
              <div
                v-for="hld in holdData"
                v-once
                :key="hld.start"
                class="wave-hold-icon"
                :style="{ left: iconPosition(hld) }">
                <wt-icon icon="pause" color="hold"></wt-icon>
                <div class="wave-hold-info">
                  {{ hld.duration }}
                </div>
              </div>
            </div>
          </div>
          <wavesurfer
            :options="waveOptions"
            :src="file"
            ref="surf">
          </wavesurfer>

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
import { mapState, mapActions } from 'vuex';
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import generateMediaURL from '../../../../../../mixins/media/scripts/generateMediaURL';

import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import callWaveMixin from '../../../../../../mixins/history/registry/callWaveMixin';
import OpenedCallCommentForm from './opened-call-comment-form';

// Some width constants in order to position hold icons correctly:
const GRID_GAP = 15;
const EQUALIZER_WIDTH = 70;
// const HOLD_INFO_WIDTH = 70;

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
  primaryLabelInterval: 3,
  secondaryLabelInterval: 0,
  formatTimeCallback: convertDuration,
};

const commentOptions = {
  showTooltip: false,
  color: 'hsla(var(--_transfer-color), 0.2)',
  resize: true,
};

const getHoldSecInterval = ({ hold, file }) => {
  const start = ((hold.start - file.startAt) / 1000).toFixed(2);
  const end = ((hold.stop - file.startAt) / 1000).toFixed(2);
  const duration = convertDuration((hold.stop - hold.start) / 1000);
  return { start, end, duration };
};

export default {
  name: 'opened-call-wave',
  components: { OpenedCallCommentForm },
  mixins: [callWaveMixin, exportFilesMixin],
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
    showHolds: false,
    commentData: [],
    showComments: false,
    canvasWidth: 0,
    commentsMode: false,
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
        // const position = ((pxInSec * hold.start) - HOLD_INFO_WIDTH).toFixed();
        const position = (pxInSec * hold.start).toFixed();
        return `${position}px`;
      };
    },
    holdsLength() {
      return this.call.hold ? this.call.hold.length : 0;
    },
    commentsLength() {
      return this.call.annotations ? this.call.annotations.length : 0;
    },
  },

  methods: {
    ...mapActions('registry/opened-call', {
      addAnnotation: 'ADD_ANNOTATION',
      editAnnotation: 'EDIT_ANNOTATION',
    }),

    commentsModeHandler() {
      this.commentsMode = !this.commentsMode;
      if (!this.commentsMode) {
        this.player.redrawRegions();
      }
    },
    redrawRegions() {
      this.player.clearRegions();
      this.player.clearMarkers();
      if (this.showHolds) {
        this.displayHolds();
      }
      if (this.showComments) {
        this.displayComments();
      }
    },
    showCommentsHandler() {
      this.showComments = !this.showComments;
      this.redrawRegions();
    },
    showHoldsHandler() {
      this.showHolds = !this.showHolds;
      this.redrawRegions();
    },
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
    toggleRate(value) {
      const { player } = this;
      this.playbackRate = this.playbackRate === value ? 1 : value;
      // https://github.com/katspaugh/wavesurfer.js/issues/2349
      const isPlaying = player.isPlaying();
      if (isPlaying) this.playPause();
      player.setPlaybackRate(this.playbackRate);
      if (isPlaying) this.playPause();
    },
    toggleLeftGain() {
      this.leftGain.audio.gain.value = this.leftGain.audio.gain.value === 0 ? this.volumeLeftGain : 0;
      this.leftGain.muted = !this.leftGain.muted;
    },
    toggleRightGain() {
      this.rightGain.audio.gain.value = this.rightGain.audio.gain.value === 0 ? this.volumeRightGain : 0;
      this.rightGain.muted = !this.rightGain.muted;
    },
    increaseZoom() {
      this.zoom *= 2;
      this.player.zoom(this.zoom);
      this.canvasWidth = this.player.drawer.width;
    },
    decreaseZoom() {
      this.zoom /= 2;
      this.player.zoom(this.zoom);
      this.canvasWidth = this.player.drawer.width;
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
      player.enableDragSelection({ ...commentOptions });
    },
    displayHolds() {
      this.holdData.forEach((hold) => {
        this.player.addRegion({
          ...hold,
          color: 'hsla(var(--_hold-color), 0.2)',
          showTooltip: false,
        });
      });

      Object.keys(this.player.regions.list).map((hold) => {
        this.player.regions.list[hold].update({ resize: false, drag: false });
      });
    },
    displayComments() {
      this.call.annotations.forEach((comment) => {
        const note = {
          start: comment.startSec,
          end: comment.endSec,
        };
        this.player.addRegion({
          ...note,
          ...commentOptions,
        });
      });
      this.player.on('region-update-end', () => {
        this.commentsMode = true;
      });
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
    initializeComments() {
      this.call.annotations.map((annotation) => {
        // const comment = getCommentSecInterval({ annotation, file: this.call.files[0] });
        const comment = { start: annotation.start, end: annotation.end };
        this.commentData.push(comment);
      });
    },
    onReady() {
      const { player, call } = this;
      this.onLoad();
      this.hideProgress();
      this.canvasWidth = this.player.drawer.width;
      if (this.call.hold) {
        this.timeLineWidth = this.$el.clientWidth - EQUALIZER_WIDTH - GRID_GAP;
        this.initializeHolds();
        // this.displayHolds();
      }
      if (this.call.annotations) {
        this.initializeComments();
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

  .call-wave-page-main {
    display: flex;
    flex-direction: column;
    gap: var(--component-spacing);

    &--hidden {
      display: none;
    }
  }

  .call-wave-toolbar {
    display: flex;
    justify-content: space-between;

    .toolbar-main {
      display: flex;
      flex: 1 0 auto;
      gap: var(--component-spacing);
      justify-content: center;
    }

    .toolbar-actions {
      display: flex;
      gap: var(--component-spacing);
    }
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

      .wave-hold-icon {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        //bottom: 30px;

        .wave-hold-info {
          visibility: hidden;
        }

        &:hover {
          .wave-hold-info {
            visibility: visible;
          }
        }
      }

      .call-wave-timeline {
        height: 26px;
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
