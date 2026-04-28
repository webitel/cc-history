<template>
  <section class="call-wave-page">
    <call-visualization-header>
      <template #main>
        <wt-select
          class="call-wave-page__file-select"
          :value="file"
          :clearable="false"
          :placeholder="$t('vocabulary.file')"
          :options="audioFiles"
          track-by="id"
          @input="setFile"
        />
        <div
          v-if="!isLoading"
          class="call-wave-page__region-actions"
        >
          <wt-checkbox
            :label="$t('registry.call.hold', 2)"
            :selected="showHolds"
            :value="showHolds"
            @update:selected="toggleHolds"
          />
          <wt-chip>
            {{ holdsSize }}
          </wt-chip>
          <wt-checkbox
            :label="$t('registry.call.comment', 2)"
            :selected="showComments"
            :value="showComments"
            @update:selected="toggleComments"
          />
          <wt-chip>
            {{ commentsSize }}
          </wt-chip>
        </div>
      </template>
      <template
        v-if="!isLoading"
        #actions
      >
        <wt-icon-btn
          icon="note"
          icon-prefix="hs"
          @click="toggleCommentMode"
        />
        <wt-icon-btn
          icon="download-record"
          icon-prefix="hs"
          @click="downloadFile"
        />
      </template>
    </call-visualization-header>

    <wt-progress-bar
      v-show="isLoading"
      :max="100"
      :value="loadProgress"
    />
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
          <wt-popover
            v-if="!leftGain.disabled"
          >
            <template #activator="{ toggle }">
              <div
                @click="toggle"
              >
                <wt-icon-btn
                  :icon="leftGain.muted ? 'sound-off': 'sound-on'"
                />
              </div>
            </template>

            <wt-slider
              :max="2"
              :min="0"
              :step="0.01"
              :width="130"
              :model-value="volumeLeftGain"
              @update:model-value="volumeLeftChangeHandler"
            />
          </wt-popover>

          <wt-popover
            v-if="!rightGain.disabled"
          >
            <template #activator="{ toggle }">
              <div
                @click="toggle"
              >
                <wt-icon-btn
                  :icon="rightGain.muted ? 'sound-off': 'sound-on'"
                />
              </div>
            </template>

            <wt-slider
              :max="2"
              :min="0"
              :step="0.01"
              :width="130"
              :model-value="volumeRightGain"
              @update:model-value="volumeRightChangeHandler"
            />
          </wt-popover>
        </section>

        <section
          v-if="fileUrl"
          class="call-wave-data-plugin"
        >
          <div
            class="call-wave-wave-wrap"
            :class="{ 'call-wave-wave-wrap--mono': rightGain.disabled }"
          >
            <wavesurfer
              ref="wavesurferComponentRef"
              :options="waveOptions"
              :src="fileUrl"
            />
            <div class="call-wave-markers">
              <div
                class="call-wave-marker call-wave-marker--left"
                :style="{ color: channelColorLeft }"
              >
                <span class="call-wave-marker__icon">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                  ><use xlink:href="#contacts" /></svg>
                </span>
                <span class="call-wave-marker__label">{{ call.from.name || call.from.number || ' ' }}</span>
              </div>
              <div
                v-if="!rightGain.disabled"
                class="call-wave-marker call-wave-marker--right"
                :style="{ color: channelColorRight }"
              >
                <span class="call-wave-marker__icon">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                  ><use xlink:href="#contacts" /></svg>
                </span>
                <span class="call-wave-marker__label">{{ call.to?.name || call.to?.number || call.destination }}</span>
              </div>
            </div>
          </div>
        </section>

        <div />
        <section class="call-wave-actions">
          <section class="call-wave-actions-buttons">
            <wt-button
              :color="speedButtonColor(2)"
              @click="toggleRate(2)"
            >
              x2
            </wt-button>
            <wt-button
              :color="speedButtonColor(1.5)"
              @click="toggleRate(1.5)"
            >
              x1.5
            </wt-button>
            <wt-button
              :color="speedButtonColor(0.75)"
              @click="toggleRate(0.75)"
            >
              x0.75
            </wt-button>
            <wt-button
              :color="speedButtonColor(0.5)"
              @click="toggleRate(0.5)"
            >
              x0.5
            </wt-button>
            <wt-button
              :color="isPlaying ? 'primary': 'secondary'"
              contains-icon
              @click="playPause"
            >
              <wt-icon
                :icon="!isPlaying ? 'play' : 'pause'"
              />
            </wt-button>
          </section>
          <section class="call-wave-actions-buttons">
            <wt-button
              :disabled="zoomInDisabled"
              color="secondary"
              contains-icon
              @click="increaseZoom"
            >
              <wt-icon icon="zoom-in" />
            </wt-button>
            <wt-button
              :disabled="zoomOutDisabled"
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

<script setup lang="ts">
import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { useFilesExport } from '@webitel/ui-sdk/modules/FilesExport';
import {
	computed,
	nextTick,
	onBeforeUnmount,
	ref,
	toRef,
	watch,
	type Ref,
} from 'vue';
import { useStore } from 'vuex';
import type { Region } from 'wavesurfer.js/plugins/regions';

import CallVisualizationHeader from '../call-visualization-header.vue';
import CallCommentForm from './call-wave-comment-form.vue';
import type {
	CallWaveCallRecord,
	CommentDragSelectionOptions,
	NewCommentDraft,
	WaveAnnotation,
} from './call-wave.types';
import {
	annotationSecondsToInt,
	useCallWaveAnnotations,
} from './composables/useCallWaveAnnotations';
import { useCallWavePlugins } from './composables/useCallWavePlugins';
import { useCallWaveRegions } from './composables/useCallWaveRegions';
import { useCallWaveSound } from './composables/useCallWaveSound';
import { useCallWaveZoom } from './composables/useCallWaveZoom';
import Wavesurfer from './wavesurfer.vue';

const COMMENT_DRAG_OPTIONS: CommentDragSelectionOptions = {
	color: 'hsla(var(--_transfer-color), 0.2)',
	resize: true,
};

const props = defineProps<{
	call: CallWaveCallRecord;
}>();

const store = useStore();

const file = computed(() => store.state.registry.call.selectedRecordingFile);
const annotations = computed<WaveAnnotation[]>(
	() => store.getters['registry/call/CALL_ANNOTATIONS'],
);
const fileOptions = computed(
	() => store.getters['registry/call/RECORDING_FILE_SELECT_OPTIONS'],
);

const fileUrl = computed(() =>
	getCallMediaUrl(file.value.id, {
		download: true,
	}),
);

const audioFiles = computed(
	() => fileOptions.value?.[EngineCallFileType.FileTypeAudio] || [],
);

const callRef = toRef(props, 'call');

const holdsSize = computed(() =>
	props.call.hold ? props.call.hold.length : 0,
);
const commentsSize = computed(() =>
	annotations.value ? annotations.value.length : 0,
);

const channelColorLeft = computed(() => 'var(--true-color)');
const channelColorRight = computed(() => 'var(--primary-color)');

const wavesurferComponentRef = ref<InstanceType<typeof Wavesurfer> | null>(
	null,
);
const player = computed(() => wavesurferComponentRef.value?.waveSurfer ?? null);

const playbackRate = ref(1);
const isLoading = ref(true);
const loadProgress = ref(0);
const commentsMode = ref(false);
const selectedComment: Ref<WaveAnnotation | NewCommentDraft | null> = ref(null);
const dragSelectionCleanup: Ref<(() => void) | null> = ref(null);
const unsubscribeRegionCreated: Ref<(() => void) | null> = ref(null);
const unsubscribeZoomSync: Ref<(() => void) | null> = ref(null);
const waveListenersAttached = ref(false);

const { regionsPlugin, waveOptions } = useCallWavePlugins();

const {
	zoomInDisabled,
	zoomOutDisabled,
	resetZoomState,
	increaseZoom,
	decreaseZoom,
	syncZoomValue,
} = useCallWaveZoom(() => player.value);

const {
	volumeLeftGain,
	volumeRightGain,
	isPlaying,
	leftGain,
	rightGain,
	initChannelAudioGraph,
	destroyChannelAudio,
	onLoad,
	changedPlaying,
	playPause,
	redraw,
	volumeLeftChangeHandler,
	volumeRightChangeHandler,
} = useCallWaveSound(() => player.value);

function editAnnotation(comment: WaveAnnotation) {
	selectedComment.value = comment;
	commentsMode.value = true;
}

const {
	showHolds,
	showComments,
	toggleHolds,
	toggleComments,
	updateRegions,
	blockRegionResize,
	closeCommentMode,
} = useCallWaveRegions({
	regionsPlugin,
	getPlayer: () => player.value,
	call: callRef,
	holdsSize,
	commentsSize,
	annotations,
	editAnnotation,
	commentsMode,
	selectedComment,
	dragSelectionCleanup,
	commentDragOptions: COMMENT_DRAG_OPTIONS,
});

const callDuration = computed(() =>
	Math.round(player.value?.getDuration() ?? 0),
);

const { exportFiles: downloadFile } = useFilesExport({
	getFileURL: (item) =>
		getCallMediaUrl(item.id as string, {
			download: true,
		}),
	fetch: async () => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		items: (props.call.files?.[EngineCallFileType.FileTypeAudio] ?? []) as any,
		next: false,
	}),
	filename: 'history-record',
});

function setFile(payload: unknown) {
	store.dispatch('registry/call/SET_RECORDING_FILE', payload);
}

function speedButtonColor(value: number): 'primary' | 'secondary' {
	return playbackRate.value === value ? 'primary' : 'secondary';
}

const { saveComment, deleteComment: deleteCommentBySelection } =
	useCallWaveAnnotations(store, props.call.id, updateRegions);
const deleteComment = () => deleteCommentBySelection(selectedComment.value);

function openCommentMode() {
	commentsMode.value = true;
}

function toggleCommentMode() {
	if (commentsMode.value) {
		closeCommentMode();
	} else {
		openCommentMode();
	}
}

function toggleRate(value) {
	playbackRate.value = playbackRate.value === value ? 1 : value;
	player.value?.setPlaybackRate(playbackRate.value, true);
}

function showProgress(progress: string | number) {
	isLoading.value = true;
	loadProgress.value = +progress;
}

function hideProgress() {
	loadProgress.value = 0;
	isLoading.value = false;
}

// New drag: v7 fires `region-created` but not `region-updated` for that path; skip saved regions (`comment-` id).
function createComment(region: Region) {
	if (region.start === region.end) {
		return;
	}
	if (region.id.startsWith('comment-')) {
		return;
	}
	if (dragSelectionCleanup.value) {
		dragSelectionCleanup.value();
		dragSelectionCleanup.value = null;
	}
	selectedComment.value = {
		startSec: String(annotationSecondsToInt(region.start)),
		endSec: String(annotationSecondsToInt(region.end)),
		note: '',
	};
	commentsMode.value = true;
	blockRegionResize();
}

async function onReady() {
	onLoad();
	initChannelAudioGraph();
	hideProgress();
	// Loading UI toggles in the same tick as `ready`; wait so layout matches before `reRender()`.
	await nextTick();
	redraw();
}

function initWave() {
	const waveSurfer = player.value;
	if (!waveSurfer) {
		return;
	}
	waveSurfer.on('pause', changedPlaying);
	waveSurfer.on('finish', changedPlaying);
	waveSurfer.on('play', changedPlaying);
	waveSurfer.on('loading', showProgress);
	waveSurfer.on('ready', onReady);
	waveSurfer.on('destroy', hideProgress);
	waveSurfer.on('error', hideProgress);
	dragSelectionCleanup.value = regionsPlugin.enableDragSelection({
		...COMMENT_DRAG_OPTIONS,
	});
	unsubscribeRegionCreated.value = regionsPlugin.on(
		'region-created',
		createComment,
	);
	unsubscribeZoomSync.value = waveSurfer.on(
		'zoom',
		(minPxPerSecFromWaveSurfer) => {
			syncZoomValue(minPxPerSecFromWaveSurfer);
		},
	);
}

// `wavesurfer.vue` loads from `src` only; avoid double `load()` on file change.
watch(fileUrl, () => {
	resetZoomState();
});

watch(
	[
		player,
		fileUrl,
	],
	() => {
		if (!player.value || !fileUrl.value || waveListenersAttached.value) {
			return;
		}
		initWave();
		waveListenersAttached.value = true;
	},
	{
		immediate: true,
	},
);

onBeforeUnmount(async () => {
	unsubscribeZoomSync.value?.();
	unsubscribeZoomSync.value = null;
	unsubscribeRegionCreated.value?.();
	dragSelectionCleanup.value?.();
	await destroyChannelAudio();
});
</script>

<style scoped>
.call-visualization-header {
  margin-bottom: var(--spacing-sm);
}

.call-wave-page .call-wave-page__file-select {
  width: 280px;
}

.call-wave-page .call-wave-page__region-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.call-wave-page .call-wave-page-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.call-wave-page .call-wave-page-main--hidden {
  display: none;
}

.call-wave-page .call-wave-data--grid {
  display: grid;
  grid-gap: var(--spacing-sm);
  grid-template-columns: 70px 1fr;
  grid-template-rows: repeat(2, auto);
}

.call-wave-page .call-wave-data--grid .call-wave-data-legs-actions {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.call-wave-page .call-wave-data--grid .call-wave-actions {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.call-wave-page .call-wave-data--grid .call-wave-actions .call-wave-actions-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin {
  position: relative;
  min-width: 0;
  overflow: visible;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap {
  position: relative;
  display: block;
  min-width: 0;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .wavesurfer-mount {
  min-width: 0;
  width: 100%;
  max-width: 100%;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: 96px 96px;
  align-items: stretch;
  height: 192px;
  box-sizing: border-box;
  padding: 0 var(--spacing-3xs);
  font-size: 12px;
  pointer-events: none;
  text-shadow:
    0 0 4px rgba(255, 255, 255, 0.95),
    0 0 8px rgba(255, 255, 255, 0.85);
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap--mono .call-wave-markers {
  grid-template-rows: 96px;
  height: 96px;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-marker {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  min-height: 0;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-marker--left {
  align-self: start;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-marker--right {
  align-self: end;
}

:deep(.wavesurfer-mount > div)::part(timeline) {
  background-color: var(--secondary-light-color);
}

:deep(.wavesurfer-mount > div)::part(region) {
  border-left: 2px solid rgb(0, 0, 0);
  border-right: 2px solid rgb(0, 0, 0);
}

:deep(.wavesurfer-mount > div)::part(marker) {
  border-left: 4px solid var(--hold-color);
}
</style>

