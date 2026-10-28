<template>
  <section class="call-wave-page">
    <call-wave-toolbar
      :file="file"
      :files="audioFiles"
      :is-loading="isLoading"
      :show-holds="showHolds"
      :show-comments="showComments"
      :holds-count="holdsCount"
      :comments-count="commentsSize"
      :is-range-editing="!!rangeEditComment"
      @update:file="setFile"
      @toggle-holds="toggleHolds"
      @toggle-comments="toggleComments"
      @add-note="openAddNote"
      @download="downloadFile"
    />

    <wt-progress-bar
      v-show="isLoading"
      :max="100"
      :value="loadProgress"
    />
    <wt-empty
      v-if="isRecordingDeleted"
      :image="DeletedCallRecording"
      :title="t('registry.call.wave.recordingDeleted')"
    />
    <!-- v-show keeps wavesurfer mounted, so choosing another file still loads it. -->
    <section
      v-show="!isLoading && !isRecordingDeleted"
      class="call-wave-page-main"
    >
      <call-wave-range-edit-bar
        v-if="rangeEditComment"
        :is-changed="isRangeChanged"
        :is-saving="isRangeSaving"
        @save="saveCommentRange"
        @cancel="stopRangeEdit"
      />

      <call-comment-form
        v-if="newComment"
        :call-duration="getCallDurationSec()"
        :comment="newComment"
        :is-saving="isAddingComment"
        @close="closeAddNote"
        @save="addComment"
        @update-draft-range="updateDraftSelectionRange($event.startSec, $event.endSec)"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationShown"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
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
              :options="waveOptions"
              :src="fileUrl"
            />
            <div class="call-wave-markers">
              <call-wave-channel-label
                class="call-wave-markers__top-channel"
                :name="call.from.name || call.from.number || ' '"
                color="var(--true-color)"
              />
              <call-wave-channel-label
                v-if="!isMono"
                class="call-wave-markers__bottom-channel"
                :name="call.to?.name || call.to?.number || call.destination || ''"
                color="var(--primary-color)"
              />
              <call-wave-hold-markers :markers="holdMarkers" />
              <call-wave-comment-markers
                v-if="showCommentMarkers"
                :markers="markers"
                :top-px="commentMarkerTopPx"
                :visible-width-px="layout?.visibleWidthPx ?? 0"
                :save-note-text="saveCommentNote"
                @active-change="setCommentHighlight"
                @edit-range="startRangeEdit"
                @delete="askCommentDeleteConfirmation"
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
import {
	type ExportedItem,
	useFilesExport,
} from '@webitel/ui-sdk/modules/FilesExport';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { computed, nextTick, onBeforeUnmount, ref, toRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import type WaveSurfer from 'wavesurfer.js';

import DeletedCallRecording from '../assets/deleted-call-recording.svg';
import type { CallWaveCallRecord, WaveAnnotation } from './call-wave.types';
import CallWaveChannelLabel from './call-wave-channel-label.vue';
import CallWaveChannelVolume from './call-wave-channel-volume.vue';
import CallCommentForm from './call-wave-comment-form.vue';
import CallWaveCommentMarkers from './call-wave-comment-markers.vue';
import CallWaveHoldMarkers from './call-wave-hold-markers.vue';
import CallWavePlaybackControls from './call-wave-playback-controls.vue';
import CallWaveRangeEditBar from './call-wave-range-edit-bar.vue';
import CallWaveToolbar from './call-wave-toolbar.vue';
import {
	COMMENT_MARKER_SIZE_PX,
	useCallWaveCommentMarkers,
} from './composables/useCallWaveCommentMarkers';
import { useCallWaveComments } from './composables/useCallWaveComments';
import { useCallWaveFileAnnotations } from './composables/useCallWaveFileAnnotations';
import { useCallWaveHoldMarkers } from './composables/useCallWaveHoldMarkers';
import {
	useCallWavePlugins,
	WAVE_HEIGHT,
} from './composables/useCallWavePlugins';
import { useCallWaveRegions } from './composables/useCallWaveRegions';
import { useCallWaveSound } from './composables/useCallWaveSound';
import { useCallWaveZoom } from './composables/useCallWaveZoom';
import { useWaveformLayout } from './composables/useWaveformLayout';
import Wavesurfer from './wavesurfer.vue';

const props = defineProps<{
	call: CallWaveCallRecord;
}>();

const { t } = useI18n();
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

const holdsCount = computed(() => props.call.hold?.length ?? 0);

function setFile(payload: unknown) {
	store.dispatch('registry/call/SET_RECORDING_FILE', payload);
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

const wavesurferComponentRef = ref<InstanceType<typeof Wavesurfer> | null>(
	null,
);
const player = computed(() => wavesurferComponentRef.value?.waveSurfer ?? null);
const getPlayer = () => player.value;

const isLoading = ref(true);
const loadProgress = ref(0);
const isRecordingDeleted = ref(false);
const playbackRate = ref(1);

const { regionsPlugin, timelinePlugin, waveOptions } =
	useCallWavePlugins(getPlayer);

const {
	zoomInDisabled,
	zoomOutDisabled,
	resetZoom,
	increaseZoom,
	decreaseZoom,
	syncZoomValue,
	attachTimelineSync,
	detachTimelineSync,
} = useCallWaveZoom(getPlayer, timelinePlugin);

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
} = useCallWaveSound(getPlayer);

const isMono = computed(() => rightGain.disabled);

function toggleRate(rate: number) {
	playbackRate.value = playbackRate.value === rate ? 1 : rate;
	player.value?.setPlaybackRate(playbackRate.value, true);
}

const regions = useCallWaveRegions({
	regionsPlugin,
	getPlayer,
	call: toRef(props, 'call'),
});
const {
	showHolds,
	showComments,
	rangeEditComment,
	isRangeChanged,
	toggleHolds,
	toggleComments,
	renderHoldsLayer,
	attachDraftSelection,
	clearDraftSelectionRegions,
	updateDraftSelectionRange,
	setCommentHighlight,
	startRangeEdit,
	stopRangeEdit,
} = regions;

const {
	newComment,
	isAddingComment,
	isRangeSaving,
	deleteConfirmation,
	getCallDurationSec,
	openAddNote,
	closeAddNote,
	addComment,
	saveCommentNote,
	saveCommentRange,
	askCommentDeleteConfirmation,
	resetCommentActions,
} = useCallWaveComments({
	store,
	callId: props.call.id,
	currentFileId,
	getPlayer,
	regions,
});
const {
	isVisible: isDeleteConfirmationShown,
	deleteCount,
	deleteCallback,
	closeDelete,
} = deleteConfirmation;

const { layout, durationSec } = useWaveformLayout(getPlayer);
const { markers } = useCallWaveCommentMarkers(layout, annotations);
const { markers: holdMarkers } = useCallWaveHoldMarkers({
	call: toRef(props, 'call'),
	layout,
	durationSec,
	showHolds: computed(() => showHolds.value && !rangeEditComment.value),
});

const showCommentMarkers = computed(
	() => showComments.value && !!commentsSize.value && !rangeEditComment.value,
);

const commentMarkerTopPx = computed(() =>
	isMono.value
		? WAVE_HEIGHT - COMMENT_MARKER_SIZE_PX
		: WAVE_HEIGHT * 1.5 - COMMENT_MARKER_SIZE_PX,
);

watch(currentFileId, resetCommentActions);

const stopListeningToPlayer: Array<() => void> = [];

function showProgress(progress: string | number) {
	isLoading.value = true;
	loadProgress.value = +progress;
}

function hideProgress() {
	loadProgress.value = 0;
	isLoading.value = false;
}

async function onReady() {
	onLoad();
	initChannelAudioGraph();
	hideProgress();
	// Loading UI toggles in the same tick as `ready`; wait so layout matches before `reRender()`.
	await nextTick();
	resetZoom();
	renderHoldsLayer();
}

function listenToPlayer(waveSurfer: WaveSurfer) {
	stopListeningToPlayer.push(
		waveSurfer.on('pause', changedPlaying),
		waveSurfer.on('finish', changedPlaying),
		waveSurfer.on('play', changedPlaying),
		waveSurfer.on('load', () => {
			isRecordingDeleted.value = false;
		}),
		waveSurfer.on('loading', showProgress),
		waveSurfer.on('ready', onReady),
		waveSurfer.on('destroy', hideProgress),
		// The recording is listed on the call, so a failed load means the file is gone from storage.
		waveSurfer.on('error', () => {
			hideProgress();
			isRecordingDeleted.value = true;
		}),
		waveSurfer.on('zoom', syncZoomValue),
		// A click moves the cursor: the next note starts there, not at an old selection.
		waveSurfer.on('interaction', () => {
			if (!newComment.value) {
				clearDraftSelectionRegions();
			}
		}),
		attachDraftSelection(),
	);
	attachTimelineSync();
}

// `wavesurfer.vue` creates the player once and reloads it on `src` change, so listeners are attached once.
watch(
	player,
	(waveSurfer) => {
		if (waveSurfer && !stopListeningToPlayer.length) {
			listenToPlayer(waveSurfer);
		}
	},
	{
		immediate: true,
	},
);

onBeforeUnmount(async () => {
	stopListeningToPlayer.forEach((stopListening) => {
		stopListening();
	});
	detachTimelineSync();
	await destroyChannelAudio();
});
</script>

<style scoped>
.call-wave-page {
  /* TODO: replace with the designer's token once it is added to the styleguide. */
  --comment-color: hsla(169, 75%, 40%, 1);
}

.call-wave-page .call-wave-page-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
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
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap--mono .call-wave-markers {
  grid-template-rows: 96px;
  height: 96px;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__top-channel {
  align-self: start;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__bottom-channel {
  align-self: end;
}

:deep(.wavesurfer-mount > div)::part(timeline) {
  background-color: var(--secondary-light-color);
}

:deep(.wavesurfer-mount > div)::part(region-handle) {
  top: 50%;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--comment-color);
  color: var(--main-color);
  transform: translateY(-50%);
}

:deep(.wavesurfer-mount > div)::part(region-handle-left) {
  left: -24px;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

:deep(.wavesurfer-mount > div)::part(region-handle-right) {
  right: -24px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

/* Hover plugin animates opacity/transform and may briefly show x=0 on quick pointer leave/enter. */
:deep(.wavesurfer-mount > div)::part(hover),
:deep(.wavesurfer-mount > div)::part(hover-label) {
  transition: none !important;
}
</style>

