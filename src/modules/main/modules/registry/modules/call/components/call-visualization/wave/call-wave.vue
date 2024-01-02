<template>
  <section class="call-wave-page">
    <call-visualization-header>
      <template v-slot:main>
        <wt-select
          class="call-wave-page__file-select"
          :value="file"
          :clearable="false"
          :placeholder="$t('vocabulary.file')"
          :options="fileOptions"
          track-by="id"
          @change="setFile"
        ></wt-select>
        <div
          v-if="!isLoading"
          class="call-wave-page__region-actions"
        >
          <wt-checkbox
            :label="$tc('registry.call.hold', 2)"
            :selected="showHolds"
            :value="showHolds"
            @change="toggleHolds"
          ></wt-checkbox>
          <wt-chip>
            {{ holdsSize }}
          </wt-chip>
          <wt-checkbox
            :label="$tc('registry.call.comment', 2)"
            :selected="showComments"
            :value="showComments"
            @change="toggleComments"
          ></wt-checkbox>
          <wt-chip>
            {{ commentsSize }}
          </wt-chip>
        </div>
      </template>
      <template v-if="!isLoading" v-slot:actions>
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
      </template>
    </call-visualization-header>

    <wt-progress-bar
      v-show="isLoading"
      :max="100" :value="loadProgress"
    >
    </wt-progress-bar>
    <section
      v-show="!isLoading"
      :class="{'call-wave-page-main--hidden': isLoading}"
      class="call-wave-page-main"
    >
      <call-comment-form
        v-if="commentsMode"
        :call-duration="callDuration"
        :call-id="call.id"
        :comment="selectedComment"
        @delete="deleteComment"
        @save="saveComment"
      />

      <section class="call-wave-data--grid">
        <section class="call-wave-data-legs-actions">
          <wt-tooltip
            v-if="!leftGain.disabled"
            :triggers="['click', 'focus', 'touch']"
            :popper-triggers="['hover']"
          >
            <template v-slot:activator>
              <wt-icon-btn
                :icon="leftGain.muted ? 'sound-off': 'sound-on'"
              ></wt-icon-btn>
            </template>
            <wt-slider
              :max="2"
              :min="0"
              :step="0.01"
              :value="volumeLeftGain"
              @input="volumeLeftChangeHandler"
            ></wt-slider>
          </wt-tooltip>
          <wt-tooltip
            v-if="!rightGain.disabled"
            :triggers="['click', 'focus', 'touch']"
            :popper-triggers="['hover']"
          >
            <template v-slot:activator>
              <wt-icon-btn
                :icon="rightGain.muted ? 'sound-off': 'sound-on'"
              ></wt-icon-btn>
            </template>
            <wt-slider
              :max="2"
              :min="0"
              :step="0.01"
              :value="volumeRightGain"
              @input="volumeRightChangeHandler"
            ></wt-slider>
          </wt-tooltip>
        </section>

        <section v-if="fileUrl" class="call-wave-data-plugin">
          <wavesurfer
            ref="surf"
            :options="waveOptions"
            :src="fileUrl"
          ></wavesurfer>
          <div id="wave-timeline" class="call-wave-timeline"></div>
        </section>

        <div></div> <!-- an empty div in order to position in the correct grid column -->
        <section class="call-wave-actions">
          <section class="call-wave-actions-buttons">
            <wt-button
              :color="speedButtonColor(2)"
              @click="toggleRate(2)"
            >x2
            </wt-button>
            <wt-button
              :color="speedButtonColor(1.5)"
              @click="toggleRate(1.5)"
            >x1.5
            </wt-button>
            <wt-button
              :color="speedButtonColor(0.75)"
              @click="toggleRate(0.75)"
            >x0.75
            </wt-button>
            <wt-button
              :color="speedButtonColor(0.5)"
              @click="toggleRate(0.5)"
            >x0.5
            </wt-button>
            <wt-button
              :color="isPlaying ? 'primary': 'secondary'"
              contains-icon
              @click="playPause"
            >
              <wt-icon
                :icon="!isPlaying ? 'play' : 'pause'"
              ></wt-icon>
            </wt-button>
          </section>
          <section class="call-wave-actions-buttons">
            <wt-button
              :disabled="zoom > 1000"
              color="secondary"
              contains-icon
              @click="increaseZoom"
            >
              <wt-icon icon="zoom-in" />
            </wt-button>
            <wt-button
              :disabled="zoom < 0.001"
              color="secondary"
              contains-icon
              @click="decreaseZoom"
            >
              <wt-icon icon="zoom-out" />
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
import { mapActions, mapGetters, mapState } from 'vuex';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Markers from 'wavesurfer.js/dist/plugin/wavesurfer.markers';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Wavesurfer from './wavesurfer.vue';
import generateMediaURL from '../../../../../mixins/media/scripts/generateMediaURL';
import CallVisualizationHeader from '../call-visualization-header.vue';
import regionsMixin from '../mixins/regionsMixin';
import soundFiltersMixin from '../mixins/soundFiltersMixin';
import CallCommentForm from './call-wave-comment-form.vue';

const cursorOptions = {
  showTime: true,
  opacity: 1,
  customShowTimeStyle: {
    backgroundColor: 'var(--contrast-color)',
    color: 'var(--main-color)',
    padding: 'var(--spacing-sm)',
  },
  formatTimeCallback: convertDuration,
};

const timelineOptions = {
  container: '#wave-timeline',
  notchPercentHeight: 1,
  unlabeledNotchColor: 'var(--secondary-color)',
  fontFamily: 'Montserrat, monospace',
  fontSize: 12,
  height: 16,
  labelPadding: 5,
  primaryLabelInterval: 5,
  secondaryLabelInterval: 0,
  formatTimeCallback: convertDuration,
};

const commentOptions = {
  showTooltip: false,
  color: 'hsla(var(--_transfer-color), 0.2)',
  resize: true,
};

const createMarker = (color) => {
  const marker = document.createElement('span');
  marker.innerHTML = `<svg width="16" height="16" fill="${color}"><use xlink:href="#contacts"</svg>`;
  return marker;
};

export default {
  name: 'call-wave',
  components: {
    CallVisualizationHeader,
    CallCommentForm,
    Wavesurfer,
  },
  mixins: [exportFilesMixin, soundFiltersMixin, regionsMixin],
  props: {
    call: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    volumeLeftGain: 1,
    volumeRightGain: 1,
    isLoading: true,
    loadProgress: 0,
    zoom: 1,
    playbackRate: 1,
    isPlaying: false,
    commentsMode: false,
    selectedComment: null,
    waveOptions: {
      cursorWidth: 2,
      splitChannels: true,
      height: 96,
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
    ...mapState('registry/call', {
      annotations: (state) => state.mainCallAnnotations,
      file: (state) => state.selectedRecordingFile,
    }),
    ...mapGetters('registry/call', {
      fileOptions: 'RECORDING_FILE_SELECT_OPTIONS',
    }),
    fileUrl() {
      return generateMediaURL(this.file.id, true);
    },
    player() {
      return this.$refs.surf && this.$refs.surf.waveSurfer;
    },
    callDuration() {
      return Math.round(this.player?.getDuration());
    },
    holdsSize() {
      return this.call.hold ? this.call.hold.length : 0;
    },
    commentsSize() {
      return this.annotations ? this.annotations.length : 0;
    },
  },

  methods: {
    ...mapActions('registry/call', {
      addAnnotation: 'ADD_ANNOTATION',
      updateAnnotation: 'EDIT_ANNOTATION',
      deleteAnnotation: 'DELETE_ANNOTATION',
      loadAnnotations: 'LOAD_MAIN_CALL_ANNOTATIONS',

      setFile: 'SET_RECORDING_FILE',
    }),

    speedButtonColor(value) {
      return this.playbackRate === value ? 'primary' : 'secondary';
    },
    editAnnotation(comment) {
      this.selectedComment = comment;
      this.commentsMode = true;
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
      // every comment region instance has DOM children: the icon with comment itself and two
      // border lines indicating start and the end of region.
      // We are looking if some region has no icon with comment. In case it exists, it means the
      // comment was not saved and the region must be deleted to have a cleaner wave.
      if (this.player.regions.list) {
        const cancelledRegion = Object
        .keys(this.player.regions.list)
        .find((region) => this.player.regions.list[region].element.children.length < 3);
        if (cancelledRegion) this.redrawRegions();
      }
      this.player.enableDragSelection({ ...commentOptions });
    },
    toggleCommentMode() {
      return this.commentsMode ? this.closeCommentMode() : this.openCommentMode();
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
      this.leftGain.audio.gain.value = this.leftGain.audio.gain.value === 0
        ? this.volumeLeftGain
        : 0;
      this.leftGain.muted = !this.leftGain.muted;
    },
    toggleRightGain() {
      this.rightGain.audio.gain.value = this.rightGain.audio.gain.value === 0
        ? this.volumeRightGain
        : 0;
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

    showProgress(progress) {
      this.isLoading = true;
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
      this.blockRegionResize(this.player);
    },
    async onReady() {
      const { player, call } = this;
      this.onLoad();
      this.hideProgress();
      try {
        player.addMarker({
          time: 0,
          position: 'top',
          /* in order to show empty FROM
           (not blocking mounting if name and number are not received) */
          label: call.from.name || call.from.number || ' ',
          color: player.params.splitChannelsOptions.channelColors[0].progressColor,
          markerElement: createMarker('var(--true-color)'),
        });
        if (this.rightGain) {
          player.addMarker({
            time: 0,
            label: call.to?.name || call.to?.number || call.destination,
            color: player.params.splitChannelsOptions
              .channelColors[1].progressColor,
            markerElement: createMarker('var(--primary-color)'),
          });
        }
        const createdMarkers = document.querySelectorAll('marker');
        // seting our font for marker title:
        createdMarkers.forEach((marker) => {
          // eslint-disable-next-line no-param-reassign
          marker.children[1].children[1].style.fontFamily = '"Montserrat", monospace';
        });
      } catch (err) {
        throw err;
      }

      await this.$nextTick();
      player.drawBuffer(); // https://github.com/katspaugh/wavesurfer.js/issues/1127#issuecomment-309044858
      this.redraw();
      player.on('region-update-end', this.createComment);
    },
  },

  watch: {
    fileUrl() {
      this.player.load(this.fileUrl);
    },
  },
  created() {
    this.initFilesExport({ filename: 'history-record' });
    this.loadAnnotations();
  },

  mounted() {
    this.$nextTick(() => {
      if (this.player && this.fileUrl) {
        this.initWave();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.call-visualization-header {
  margin-bottom: var(--spacing-sm);
}

.call-wave-page {
  .call-wave-page__file-select {
    width: 280px;
  }

  .call-wave-page__region-actions {
    display: flex;
    align-items: center;
    justify-content:  center;
    gap: var(--spacing-xs);
  }

  .call-wave-page-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    &--hidden {
      display: none;
    }
  }

  .call-wave-data--grid {
    display: grid;
    grid-gap: var(--spacing-sm);
    grid-template-columns: 70px 1fr;
    grid-template-rows: repeat(2, auto);

    .call-wave-data-legs-actions {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .call-wave-actions {
      display: flex;
      justify-content: space-between;
      gap: var(--spacing-sm);

      .call-wave-actions-buttons {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }
    }

    .call-wave-data-plugin {
      position: relative;

      // setting css styles to marker title and icon
      ::v-deep marker {
        div:nth-child(2) {
          padding-left: var(--spacing-xs);
          gap: var(--spacing-xs);
        }
      }

      .call-wave-timeline {
        background-color: var(--secondary-color);
      }
    }
  }

  ::v-deep .wavesurfer-region {
    /* prevent region itself from overlapping other region icon with info tooltip on it */
    z-index: auto !important;
  }
}

</style>
