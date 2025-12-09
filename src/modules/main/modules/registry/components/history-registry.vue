<template>
  <div class="table-section history-registry">
    <header class="table-title">
      <wt-action-bar
        :include="[IconAction.FILTERS, IconAction.REFRESH, IconAction.COLUMNS, IconAction.VARIABLES]"
        mode="table"
        @click:refresh="loadDataList"
        @click:filters="emit('toggle:filters-panel')"
      >
        <template #filters="{ action, onClick }">
          <wt-badge
            :hidden="!anyFiltersOnFiltersPanel"
          >
            <wt-icon-action
              :action="action"
              @click="onClick"
            />
          </wt-badge>
        </template>
        <template #columns>
          <wt-table-column-select
            :headers="headers"
            @change="updateShownHeaders"
          />
        </template>
        <template #variables>
          <variable-column-select
            :variable-headers="variableHeaders"
            @update:variable-headers="updateVariablesHeaders"
          />
        </template>
      </wt-action-bar>
    </header>
    <stt-popup
      :call-id="sttPopupCallId"
      :shown="sttPopupCallId"
      @close="sttPopupCallId = null"
      @delete="handleTranscriptDelete({ callId: sttPopupCallId, transcript: $event })"
    />
    <wt-loader v-show="isLoading" />
    <wt-empty
      v-if="showEmpty"
      :image="emptyImage"
      :headline="emptyHeadline"
      :title="emptyTitle"
      :text="emptyText"
    />
    <div
      v-else
      class="table-section__table-wrapper"
    >
      <wt-table
        v-show="!isLoading"
        ref="wt-table"
        :data="dataList"
        :headers="shownHeaders"
        :selected="selected"
        sortable
        fixed-actions
        resizable-columns
        reorderable-columns
        @column-resize="columnResize"
        @column-reorder="columnReorder"
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #direction="{ item }">
          <table-direction :item="item" />
        </template>
        <template #from="{ item }">
          <div v-if="item.from">
            {{ item.from.number }}
          </div>
        </template>
        <template #to="{ item }">
          <div v-if="item.to">
            {{ item.to.number }}
          </div>
        </template>
        <template #user="{ item }">
          <div v-if="item.user">
            {{ item.user.name }}
          </div>
        </template>
        <template #gateway="{ item }">
          <div v-if="item.gateway">
            {{ item.gateway.name }}
          </div>
        </template>
        <template #agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template #team="{ item }">
          <div v-if="item.team">
            {{ item.team.name }}
          </div>
        </template>
        <template #queue="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>
        <template #member="{ item }">
          <div v-if="item.member">
            {{ item.member.name }}
          </div>
        </template>
        <template #grantee="{ item }">
          <div v-if="item.grantee">
            {{ item.grantee.name }}
          </div>
        </template>
        <template #ratedBy="{ item }">
          <div v-if="item.ratedBy">
            {{ item.ratedBy.name }}
          </div>
        </template>
        <template #memberId="{ item }">
          <div v-if="item.member">
            {{ item.member.id }}
          </div>
        </template>
        <template #contact="{ item }">
          <div v-if="item.contact">
            {{ item.contact.name }}
          </div>
        </template>
        <template #hangupDisposition="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>
        <template #tags="{ item }">
          <div v-if="item.tags">
            {{ item.tags.join(', ') }}
          </div>
        </template>
        <template #screencast="{ item }">
          <screen-recording-action
            :files="item.files"
            @set-video="setScreenRecording"
          />
        </template>
        <template
          v-for="header in variableHeaders"
          #[header.field]="{ item }"
        >
          {{ getVariableValue(item, header.field) }}
        </template>

        <template #actions="{ item }">
          <template v-if="recordingFiles(item).length">
            <wt-icon 
              :color="IconColor.INFO" 
              :icon="getRecordingTypeIcon(item)"
            />

            <media-action
              :currently-playing="currentlyMediaPlaying"
              :files="recordingFiles(item)"
              @play="handlePlayMedia"
              @stop="closePlayer"
            />

            <wt-chip 
              :color="ChipColor.SECONDARY"
            >
              {{ recordingFiles(item).length }}
            </wt-chip>
          </template>
          
          <!--          v-if transcript can be added, exists, or already in progress -->
          <stt-action
            v-if="showItemStt(item)"
            :item="item"
            @open="sttPopupCallId = item.id"
          />

          <router-link
            :to="`/${item.id}`"
          >
            <wt-icon-btn
              icon="forks"
              icon-prefix="hs"
            />
          </router-link>
        </template>
      </wt-table>

      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page+1)"
        @prev="updatePage(page-1)"
      />

      <wt-player
        v-if="audioData.src"
        :src="audioData.src"
        @close="closePlayer"
        @play="isMediaPlayingNow = true"
      />

    </div>
  </div>

  <wt-vidstack-player
    v-if="currentScreenRecording"
    closable
    :src="currentScreenRecording.video"
    :title="currentScreenRecording.text"
    @close="closeScreenRecording"
  />

  <wt-vidstack-player
    v-if="videoData.src"
    closable
    :src="videoData.src"
    :title="videoData.text"
    @close="closePlayer"
  />
</template>

<script lang="ts" setup>
import { getMediaUrl } from '@webitel/api-services/api';
import { ChipColor, IconAction, IconColor } from '@webitel/ui-sdk/enums';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import {
  WtActionBar,
  WtBadge,
  WtEmpty,
  WtIconAction,
  WtIconBtn,
  WtLoader,
  WtPagination,
  WtPlayer,
  WtTable,
  WtVidstackPlayer,
} from '@webitel/ui-sdk/src/components/index.js';
import {
  useTableEmpty,
} from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty.js';
import get from 'lodash/get';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { EngineHistoryCall } from 'webitel-sdk';

import VariableColumnSelect from '../../../../filters/components/variable-column-select.vue';
import { SearchMode } from '../../../../filters/enums/SearchMode.ts';
import { usePlayMedia } from '../composables/usePlayMedia.ts';
import SttPopup from '../modules/stt/components/registry/stt-popup.vue';
import SttAction from '../modules/stt/components/registry/table-stt-action.vue';
import { useRegistryStore } from '../store/new/registry.store.ts';
import TableDirection from './table-templates/table-direction.vue';
import MediaAction from './table-templates/table-media-action.vue';
import ScreenRecordingAction from './table-templates/table-video-action.vue';

const emit = defineEmits<{
  'toggle:filters-panel': [];
}>();

const tableStore = useRegistryStore();

const {
  dataList,
  selected,
  error,
  isLoading,
  page,
  size,
  next,
  headers,
  shownHeaders,

  filtersManager,
} = storeToRefs(tableStore);

const {
  initialize,
  loadDataList,
  updateSelected,
  updatePage,
  updateSize,
  updateSort,
  updateShownHeaders,
  columnResize,
  columnReorder,
} = tableStore;

/*
* show "toggle filters panel" badge if any filters are applied...
* */
const anyFiltersOnFiltersPanel = computed(() => {
  /*
  * ...excluding search filters, which shown in other panel
  * */
  return filtersManager.value.getAllKeys().some((filterName) => {
    return !Object.values(SearchMode).some((mode) => mode === filterName);
  });
});

const variableHeaders = computed(() => {
  return shownHeaders.value.filter((header) => header.value.includes('variables.'));
});

const {
  showEmpty,
  image: emptyImage,
  headline: emptyHeadline,
  title: emptyTitle,
  text: emptyText,
  primaryActionText: emptyPrimaryActionText,
  secondaryActionText: emptySecondaryActionText,
} = useTableEmpty({
  dataList,
  error,
  filters: computed(() => filtersManager.value.getAllValues()),
  isLoading,
});

initialize();

const {
  audioData,
  videoData,
  currentlyMediaPlaying,
  isMediaPlayingNow,

  play,
  closePlayer,
} = usePlayMedia();

const sttPopupCallId = ref<string | null>(null);

const getVariableValue = (item: EngineHistoryCall, field: string) => {
  return get(item, ['variables', field.replace('variables.', '')]);
};

const showItemStt = (item: EngineHistoryCall) => {
  return item.files || item.transcripts?.length || item.filesJob;
};

const handleTranscriptDelete = ({ callId, transcript }: { callId: string, transcript }) => {
  const call = dataList.value.find(({ id }) => id === callId);
  // should find transcript instead of indexOf cause transcript source is not that call
  call.transcripts.splice(call.transcripts.findIndex(({ id }) => id === transcript.id), 1);
};

const updateVariablesHeaders = (variables) => {
  const mainHeaders = headers?.value.filter((header) => !header.value.includes('variables.'));
  updateShownHeaders([...mainHeaders, ...variables]);
};

const currentScreenRecording = ref(null)
const isScreenRecordingOpen = ref(false)

const closeScreenRecording = () => {
  currentScreenRecording.value = null
  isScreenRecordingOpen.value = false
}
const setScreenRecording = (data) => {
  currentScreenRecording.value = data
  currentScreenRecording.value.video = getMediaUrl(data.id)
  closePlayer()
  isScreenRecordingOpen.value = true
}

const recordingFiles = (item) => {
  return [
    ...item.files?.[EngineCallFileType.FileTypeAudio] || [],
    ...item.files?.[EngineCallFileType.FileTypeVideo] || []
  ]
}

const getRecordingTypeIcon = (item) => {
  return item.files?.[EngineCallFileType.FileTypeVideo] ? 'preview-tag-video' : 'preview-tag-audio'
}

const handlePlayMedia = (mediaData) => {
  closeScreenRecording()
  play(mediaData)
}
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/pages/table-page.scss' as *;

.wt-action-bar {
  margin-left: auto;
}

.table-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
}

.wt-pagination {
  margin-top: 20px;
  margin-left: auto;
}

.table-action {
  margin-left: var(--spacing-xs);
  line-height: 0;

  &:first-child {
    margin-left: 0;
  }
}

.media-select {
  position: absolute;
  right: 28px;
}
</style>
