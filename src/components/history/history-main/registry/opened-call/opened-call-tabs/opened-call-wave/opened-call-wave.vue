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
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { mapActions, mapState } from 'vuex';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import callWaveMixin from '../../../../../../../mixins/history/registry/callWaveMixin';
import generateMediaURL from '../../../../../../../mixins/media/scripts/generateMediaURL';
import OpenedCallCommentForm from './opened-call-comment-form.vue';

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

const infoBlockStyle = {
  minWidth: 0,
  padding: 'var(--tooltip-padding)',
  color: 'var(--tooltip-light-text-color)',
  background: 'var(--tooltip-light-bg-color)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--box-shadow)',
  transition: 'var(--transition)',
  opacity: 0,
  zIndex: 'var(--tooltip-z-index)',
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
    holdsSize() {
      return this.call.hold ? this.call.hold.length : 0;
    },
    commentsSize() {
      return this.call.annotations ? this.call.annotations.length : 0;
    },
  },

  methods: {
    ...mapActions('registry/opened-call', {
      addAnnotation: 'ADD_ANNOTATION',
      updateAnnotation: 'EDIT_ANNOTATION',
      deleteAnnotation: 'DELETE_ANNOTATION',
      loadMainCall: 'LOAD_MAIN_CALL',
    }),
    blockRegionResize() {
      Object.keys(this.player.regions.list).forEach((region) => {
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
        await this.updateAnnotation({ callId: this.call.id, ...draft });
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
      const cancelledRegion = Object.keys(this.player.regions.list).find((region) => this.player.regions.list[region].element.children.length < 3);
      if (cancelledRegion) {
        this.redrawRegions();
      }
      ;
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
      this.call.hold.forEach((hold) => {
        const hld = getHoldSecInterval({ hold, file: this.call.files[0] });
        const region = this.player.addRegion({
          ...hld,
          color: 'hsla(var(--_hold-color), 0.2)',
          showTooltip: false,
        });
        this.displayHoldIcons(region, hold);
      });
      this.blockRegionResize();
    },
    displayHoldIcons(region, hold) {
      const wrapperEl = document.createElement('div');
      wrapperEl.style.position = 'absolute';
      wrapperEl.style.cursor = 'pointer';
      wrapperEl.style.zIndex = '9';
      wrapperEl.style.left = region.element.offsetLeft < 30 ? 'var(--component-spacing)' : '-30px';

      const tooltipEl = document.createElement('div');
      Object.assign(tooltipEl.style, infoBlockStyle);
      tooltipEl.innerText = hold.sec ? convertDuration(hold.sec) : '00:00:00';

      const iconEl = document.createElement('i');
      iconEl.innerHTML = '<svg width="24" height="24" fill="var(--hold-color)"><use xlink:href="#pause"</svg>';
      iconEl.onmouseenter = () => {
        this.player.cursor.hideCursor();
        tooltipEl.style.opacity = '1';
      };
      iconEl.onmouseleave = () => {
        this.player.cursor.showCursor();
        tooltipEl.style.opacity = '0';
      };

      wrapperEl.appendChild(iconEl);
      wrapperEl.appendChild(tooltipEl);
      region.element.appendChild(wrapperEl);
    },

    displayCommentIcons(region, comment) {
      const wrapperEl = document.createElement('section');
      wrapperEl.style.position = 'absolute';
      wrapperEl.style.cursor = 'pointer';
      wrapperEl.style.zIndex = '9';
      wrapperEl.style.left = region.element.offsetLeft < 30 ? 'var(--component-spacing)' : '-30px';

      const tooltipEl = document.createElement('div');
      tooltipEl.innerText = comment.note;
      Object.assign(tooltipEl.style, infoBlockStyle);

      const iconEl = document.createElement('i');
      iconEl.innerHTML = '<svg width="24" height="24" fill="var(--transfer-color)"><use xlink:href="#hs-note"</svg>';
      iconEl.onclick = () => {
        this.editAnnotation(comment);
      };
      iconEl.onmouseenter = () => {
        this.player.cursor.hideCursor();
        tooltipEl.style.opacity = '1';
      };
      iconEl.onmouseleave = () => {
        this.player.cursor.showCursor();
        tooltipEl.style.opacity = '0';
      };

      wrapperEl.appendChild(iconEl);
      wrapperEl.appendChild(tooltipEl);
      region.element.appendChild(wrapperEl);
    },
    displayComments() {
      this.call.annotations.forEach((comment) => {
        const region = this.player.addRegion({
          start: comment.startSec,
          end: comment.endSec,
          ...commentOptions,
        });
        this.displayCommentIcons(region, comment);
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

      .call-wave-timeline {
        height: 26px;
        background-color: var(--secondary-color);
      }
    }
  }
}

</style>
