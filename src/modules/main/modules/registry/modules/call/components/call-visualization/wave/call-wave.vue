<template>
  <section class="call-wave-page">
    <call-wave-toolbar
      :file="file"
      :files="audioFiles"
      :show-controls="!isLoading && !isRecordingDeleted"
      :show-holds="showHolds"
      :show-comments="showComments"
      :holds-count="holdsSize"
      :comments-count="commentsSize"
      @update:file="setFile"
      @toggle-holds="toggleHolds"
      @toggle-comments="toggleComments"
      @add-note="toggleCommentMode"
      @download="downloadFile"
    />

    <wt-progress-bar
      v-show="isLoading"
      :max="100"
      :value="loadProgress"
    />
    <call-recording-empty
      v-if="isRecordingDeleted"
      is-deleted
    />
    <!-- v-show keeps wavesurfer mounted, so choosing another file still loads it. -->
    <section
      v-show="!isLoading && !isRecordingDeleted"
      class="call-wave-page-main"
    >
      <call-comment-form
        v-if="commentsMode"
        :call-duration="getCommentFormDuration()"
        :comment="selectedComment"
        @delete="deleteComment"
        @save="saveComment"
        @update-draft-range="handleCommentDraftRangeUpdate"
      />

      <section class="call-wave-data--grid">
        <section class="call-wave-data-legs-actions">
          <call-wave-channel-volume
            v-if="!leftGain.disabled"
            :volume="volumeLeftGain"
            :muted="leftGain.muted"
            @update:volume="volumeLeftChangeHandler"
          />
          <call-wave-channel-volume
            v-if="!rightGain.disabled"
            :volume="volumeRightGain"
            :muted="rightGain.muted"
            @update:volume="volumeRightChangeHandler"
          />
        </section>

        <section
          v-if="fileUrl"
          class="call-wave-data-plugin"
        >
          <div
            class="call-wave-wave-wrap"
            :class="{ 'call-wave-wave-wrap--mono': isMono }"
          >
            <wavesurfer
              ref="wavesurferComponentRef"
              class="typo-caption"
              :options="waveOptions"
              :src="fileUrl"
            />
            <div class="call-wave-markers typo-body-2">
              <call-wave-channel-name
                class="call-wave-markers__top-channel"
                :name="call.from.name || call.from.number || ' '"
                :color="IconColor.SUCCESS"
              />
              <call-wave-channel-name
                v-if="!isMono"
                class="call-wave-markers__bottom-channel"
                :name="call.to?.name || call.to?.number || call.destination || ''"
                :color="IconColor.PRIMARY"
              />
            </div>
          </div>
        </section>

        <div />
        <call-wave-playback-controls
          :playback-rate="playbackRate"
          :is-playing="isPlaying"
          :zoom-in-disabled="zoomInDisabled"
          :zoom-out-disabled="zoomOutDisabled"
          @toggle-rate="toggleRate"
          @play-pause="playPause"
          @zoom-in="increaseZoom"
          @zoom-out="decreaseZoom"
        />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { IconColor } from '@webitel/ui-sdk/enums';
import {
	type ExportedItem,
	useFilesExport,
} from '@webitel/ui-sdk/modules/FilesExport';
import {
	computed,
	nextTick,
	onBeforeUnmount,
	type Ref,
	ref,
	toRef,
	watch,
} from 'vue';
import { useStore } from 'vuex';
import type { Region } from 'wavesurfer.js/plugins/regions';

import CallRecordingEmpty from '../call-recording-empty.vue';
import type {
	CallWaveCallRecord,
	CommentDragSelectionOptions,
	NewCommentDraft,
	WaveAnnotation,
} from './call-wave.types';
import CallWaveChannelName from './call-wave-channel-name.vue';
import CallWaveChannelVolume from './call-wave-channel-volume.vue';
import CallCommentForm from './call-wave-comment-form.vue';
import CallWavePlaybackControls from './call-wave-playback-controls.vue';
import CallWaveToolbar from './call-wave-toolbar.vue';
import {
	annotationSecondsToInt,
	useCallWaveAnnotations,
} from './composables/useCallWaveAnnotations';
import { useCallWaveFileAnnotations } from './composables/useCallWaveFileAnnotations';
import {
	useCallWavePlugins,
	WAVE_HEIGHT,
} from './composables/useCallWavePlugins';
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
const allAnnotations = computed<WaveAnnotation[]>(
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

const { audioFiles, currentFileId, annotations, commentsSize } =
	useCallWaveFileAnnotations({
		file,
		fileOptions,
		allAnnotations,
	});

const callRef = toRef(props, 'call');

const holdsSize = computed(() =>
	props.call.hold ? props.call.hold.length : 0,
);

const wavesurferComponentRef = ref<InstanceType<typeof Wavesurfer> | null>(
	null,
);
const player = computed(() => wavesurferComponentRef.value?.waveSurfer ?? null);

const playbackRate = ref(1);
const isLoading = ref(true);
const loadProgress = ref(0);
const isRecordingDeleted = ref(false);
const commentsMode = ref(false);
const selectedComment: Ref<WaveAnnotation | NewCommentDraft | null> = ref(null);
const dragSelectionCleanup: Ref<(() => void) | null> = ref(null);
const unsubscribeRegionCreated: Ref<(() => void) | null> = ref(null);
const unsubscribeZoomSync: Ref<(() => void) | null> = ref(null);
const waveListenersAttached = ref(false);

const { regionsPlugin, timelinePlugin, waveOptions } = useCallWavePlugins(
	() => player.value,
);

const {
	zoomInDisabled,
	zoomOutDisabled,
	resetZoom,
	increaseZoom,
	decreaseZoom,
	syncZoomValue,
	attachTimelineSync,
	detachTimelineSync,
} = useCallWaveZoom(() => player.value, timelinePlugin);

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
	volumeLeftChangeHandler,
	volumeRightChangeHandler,
} = useCallWaveSound(() => player.value);

const isMono = computed(() => rightGain.disabled);

// The markers overlay is laid out per channel, so it follows the waveform height.
const waveHeight = `${WAVE_HEIGHT}px`;

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
	updateDraftSelectionRange,
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

function getCommentFormDuration() {
	return Math.round(player.value?.getDuration() ?? 0);
}

const { exportFiles: downloadFile } = useFilesExport({
	getFileURL: (item) =>
		getCallMediaUrl(item.id as string, {
			download: true,
		}),
	fetch: async () => ({
		items: (props.call.files?.[EngineCallFileType.FileTypeAudio] ??
			[]) as unknown as ExportedItem[],
		next: false,
	}),
	filename: 'history-record',
});

function setFile(payload: unknown) {
	store.dispatch('registry/call/SET_RECORDING_FILE', payload);
}

const { saveComment, deleteComment: deleteCommentBySelection } =
	useCallWaveAnnotations(store, props.call.id, currentFileId, updateRegions);
const deleteComment = () => deleteCommentBySelection(selectedComment.value);

function handleCommentDraftRangeUpdate({
	startSec,
	endSec,
}: {
	startSec: number;
	endSec: number;
}) {
	updateDraftSelectionRange(startSec, endSec);
}

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

function toggleRate(value: number) {
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
		fileId: currentFileId.value,
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
	// Loading another file resets the media element speed, while the chosen rate stays highlighted.
	player.value?.setPlaybackRate(playbackRate.value, true);
	hideProgress();
	// Loading UI toggles in the same tick as `ready`; wait so layout matches before `reRender()`.
	await nextTick();
	resetZoom();
	await updateRegions();
}

function initWave() {
	const waveSurfer = player.value;
	if (!waveSurfer) {
		return;
	}
	waveSurfer.on('pause', changedPlaying);
	waveSurfer.on('finish', changedPlaying);
	waveSurfer.on('play', changedPlaying);
	waveSurfer.on('load', () => {
		isRecordingDeleted.value = false;
	});
	waveSurfer.on('loading', showProgress);
	waveSurfer.on('ready', onReady);
	waveSurfer.on('destroy', hideProgress);
	// The recording is listed on the call, so a failed load means the file is gone from storage.
	waveSurfer.on('error', () => {
		hideProgress();
		isRecordingDeleted.value = true;
	});
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
	attachTimelineSync();
}

// `wavesurfer.vue` loads from `src` only; avoid double `load()` on file change.
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
	detachTimelineSync();
	unsubscribeZoomSync.value?.();
	unsubscribeZoomSync.value = null;
	unsubscribeRegionCreated.value?.();
	dragSelectionCleanup.value?.();
	await destroyChannelAudio();
});
</script>

<style scoped>
.call-wave-page {
  --wave-height: v-bind(waveHeight);
}

.call-wave-page .call-wave-page-main {
  display: flex;
  flex-direction: column;
}

.call-wave-page .call-wave-data--grid {
  display: grid;
  grid-template-columns: calc(var(--icon-md-size) + 2 * var(--spacing-sm)) 1fr;
  grid-template-rows: repeat(2, auto);
}

/* One volume control per channel, centered on its waveform row. */
.call-wave-page .call-wave-data--grid .call-wave-data-legs-actions {
  display: grid;
  grid-auto-rows: var(--wave-height);
  place-items: center;
  align-content: start;
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
  grid-template-rows: repeat(2, var(--wave-height));
  pointer-events: none;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap--mono .call-wave-markers {
  grid-template-rows: var(--wave-height);
}

/* Channel names sit at the outer edges: the top one above its wave, the bottom one below. */
.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__top-channel {
  align-self: start;
  justify-self: start;
  margin: var(--spacing-xs) 0 0 var(--spacing-xs);
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__bottom-channel {
  align-self: end;
  justify-self: start;
  margin: 0 0 var(--spacing-xs) var(--spacing-xs);
}

:deep(.wavesurfer-mount > div)::part(timeline) {
  background-color: var(--call-visualization-surface-color);
}

:deep(.wavesurfer-mount > div)::part(timeline-notch) {
  border-left-color: var(--secondary-color);
}

:deep(.wavesurfer-mount > div)::part(region) {
  border-left: 2px solid rgb(0, 0, 0);
  border-right: 2px solid rgb(0, 0, 0);
}

:deep(.wavesurfer-mount > div)::part(marker) {
  border-left: 4px solid var(--hold-color);
}

/* Hover plugin animates opacity/transform and may briefly show x=0 on quick pointer leave/enter. */
:deep(.wavesurfer-mount > div)::part(hover),
:deep(.wavesurfer-mount > div)::part(hover-label) {
  transition: none !important;
}
</style>

