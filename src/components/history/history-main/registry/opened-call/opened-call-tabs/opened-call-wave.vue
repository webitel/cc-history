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
            :label="$tc('registry.openedCall.hold', 2)"
            @change="toggleHolds"
          ></wt-checkbox>
          <wt-badge>
            {{ holdsSize }}
          </wt-badge>

          <wt-checkbox
            :value="showComments"
            :selected="showComments"
            :label="$tc('registry.openedCall.comment', 2)"
            @change="toggleComments"
          ></wt-checkbox>
          <wt-badge>
            {{ commentsSize }}
          </wt-badge>
        </div>
        <div class="toolbar-actions">
          <wt-icon-btn
            icon="note"
            icon-prefix="hs"
            @click="toggleCommentMode"
          ></wt-icon-btn>
          <wt-icon-btn
            icon="download-record"
            icon-prefix="hs"
            @click="downloadFile"
          ></wt-icon-btn>
        </div>
      </section>

      <opened-call-comment-form
        v-if="commentsMode"
        :callId="call.id"
        :comment="selectedComment"
        @save="saveComment"
        @delete="deleteComment"
      />

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
          <div class="wave-icons-container">
            <div v-if="showHolds && call.hold">
              <div
                v-for="hold in call.hold"
                :key="hold.start + hold.duration"
                class="wave-hold-icon"
                :style="{ left: iconPosition(hold) }">
                <wt-icon-btn
                  icon="pause"
                  color="hold"
                ></wt-icon-btn>
                <div class="wave-hold-info">
                  {{ formatDuration(hold) }}
                </div>
              </div>
            </div>
            <div v-if="showComments && call.annotations">
              <div
                v-for="comment in call.annotations"
                :key="comment.id"
                class="wave-hold-icon"
                :style="{ left: iconPosition(comment) }">
                <wt-icon-btn
                  icon="note"
                  icon-prefix="hs"
                  color="transfer"
                  @click="editAnnotation(comment)"
                ></wt-icon-btn>
                <div class="wave-note-info">
                  {{ comment.note }}
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
import { mapActions, mapState } from 'vuex';
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import generateMediaURL from '../../../../../../mixins/media/scripts/generateMediaURL';
import callWaveMixin from '../../../../../../mixins/history/registry/callWaveMixin';
import OpenedCallCommentForm from './opened-call-comment-form.vue';

// Some width constants in order to position hold icons correctly:
const GRID_GAP = 15;
const EQUALIZER_WIDTH = 70;

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
  primaryLabelInterval: 2,
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
  return { start, end };
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
    showHolds: false,
    showComments: false,
    commentsMode: false,
    selectedComment: null,
    waveOptions: {
      cursorWidth: 2,
      splitChannels: true,
      minPxPerSec: 30,
      height: 150,
      pixelRatio: 1,
      responsive: true,
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
      file: (state) => generateMediaURL(state.fileId, true),
      call: (state) => state.mainCall,
    }),
    player() {
      return this.$refs.surf && this.$refs.surf.waveSurfer;
    },
    speedButtonColor() {
      return (value) => (this.playbackRate === value ? 'primary' : 'secondary');
    },
    iconPosition() { // counting the width of audio track and icon absolute positioning
      return (hold) => {
        const fileLength = this.player.getDuration().toFixed(2);
        const start = (hold.start - this.call.files[0].startAt) / 1000 || hold.startSec;
        const pxInSec = this.timeLineWidth / fileLength;
        const position = (pxInSec * start).toFixed();
        return `${position}px`;
      };
    },
    holdsSize() {
      return this.call.hold ? this.call.hold.length : 0;
    },
    commentsSize() {
      return this.call.annotations ? this.call.annotations.length : 0;
    },
    formatDuration() {
      return (hold) => (hold.sec ? convertDuration(hold.sec) : '00:00:00');
    },
  },

  methods: {
    ...mapActions('registry/opened-call', {
      addAnnotation: 'ADD_ANNOTATION',
      modifyAnnotation: 'EDIT_ANNOTATION',
      deleteAnnotation: 'DELETE_ANNOTATION',
      loadMainCall: 'LOAD_MAIN_CALL',
    }),
    blockRegionResize() {
      Object.keys(this.player.regions.list).map((region) => {
        this.player.regions.list[region].update({ resize: false, drag: false });
      });
    },
    editAnnotation(comment) {
      this.selectedComment = comment;
      this.commentsMode = true;
    },
    async updateRegions() {
      this.closeCommentMode();
      await this.loadMainCall();
      this.redrawRegions();
    },
    async saveComment(draft) {
      if (draft.id) {
        await this.modifyAnnotation({ callId: this.call.id, ...draft });
      } else {
        await this.addAnnotation({ callId: this.call.id, ...draft });
      }
      await this.updateRegions();
    },
    async deleteComment() {
      await this.deleteAnnotation({
        id: this.selectedComment.id,
        callId: this.call.id,
      });
      await this.updateRegions();
    },
    openCommentMode() {
      this.commentsMode = true;
    },
    closeCommentMode() {
      this.commentsMode = false;
      this.selectedComment = null;
      this.player.enableDragSelection({ ...commentOptions });
    },
    toggleCommentMode() {
     return this.commentsMode ? this.closeCommentMode() : this.openCommentMode();
    },
    redrawRegions() {
      this.player.clearRegions();
      if (this.showHolds && this.holdsSize) {
        this.displayHolds();
      }
      if (this.showComments && this.commentsSize) {
        this.displayComments();
      }
    },
    toggleComments() {
      this.showComments = !this.showComments;
      this.redrawRegions();
    },
    toggleHolds() {
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
      player.enableDragSelection({ ...commentOptions });
    },
    displayHolds() {
      this.call.hold.map((hold) => {
        const hld = getHoldSecInterval({ hold, file: this.call.files[0] });
        this.player.addRegion({
          ...hld,
          color: 'hsla(var(--_hold-color), 0.2)',
          showTooltip: false,
        });
      });
      this.blockRegionResize();
    },
    displayComments() {
      this.call.annotations.map((comment) => {
        const note = {
          start: comment.startSec,
          end: comment.endSec,
        };
        this.player.addRegion({
          ...note,
          ...commentOptions,
        });
      });
      this.blockRegionResize();
    },
    showProgress(progress) {
      this.loadProgress = +progress;
    },
    hideProgress() {
      this.loadProgress = 0;
      this.isLoading = false;
    },
    createComment(region) {
      this.player.disableDragSelection();
      this.selectedComment = {
        startSec: region.start.toFixed(),
        endSec: region.end.toFixed(),
        note: '',
      };
      this.commentsMode = true;
      this.blockRegionResize();
    },
    onReady() {
      const { player, call } = this;
      this.onLoad();
      this.hideProgress();
      if (this.call.hold || this.call.annotations) {
        this.timeLineWidth = this.$el.clientWidth - EQUALIZER_WIDTH - GRID_GAP;
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
      player.on('region-update-end', this.createComment);
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

      .wave-icons-container {
        height: 42px;
        position: relative;

        .wave-hold-icon {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;

          .wave-hold-info {
            visibility: hidden;
          }

          .wave-note-info {
            @extend %wt-scrollbar;
            visibility: hidden;
            box-sizing: border-box;
            height: 100px;
            width: 150px;
            position: absolute;
            top: 26px;
            overflow: auto;
            border: var(--input-border);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            background: var(--main-color);
            padding: 10px;
            z-index: 5;
          }

          &:hover {
            .wave-hold-info {
              visibility: visible;
            }

            .wave-note-info {
              visibility: visible;
            }
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
