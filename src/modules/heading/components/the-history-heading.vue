<template>
  <wt-headline class="the-history-heading">
    <template slot="title">
      {{ $t('reusable.history') }}
    </template>
    <template slot="actions">
      <confirm-delete-popup
        v-if="deletedCount"
        :callback="deleteCallback"
        :count="deletedCount"
        @close="handleDeleteClose"
      ></confirm-delete-popup>

      <filter-search
        namespace="filters"
      ></filter-search>

      <wt-button
        :disabled="!selectedItems.length"
        :loading="isTranscribing"
        color="secondary"
        @click="bulkTranscribe"
      >{{ $t('registry.stt.transcribe') }}
      </wt-button>

      <wt-button
        :disabled="!dataList.length"
        :loading="isFilesLoading"
        color="secondary"
        @click="callExportFiles"
      >{{ $t('reusable.download') }}
      </wt-button>
      <div v-show="isCSVLoading || isFilesLoading" class="files-counter">
        <div>
          {{ $t('headerSection.filesLoaded') }}
          <span class="files-counter__count">
            {{ filesDownloadProgress || CSVDownloadProgress }}
          </span>
        </div>
        <div v-show="filesZippingProgress">
          {{ $t('headerSection.zippingProgress') }}
          <span class="files-counter__count">{{ filesZippingProgress }}%</span>
        </div>
      </div>
      <wt-button
        :disabled="!dataList.length"
        :loading="isCSVLoading"
        color="secondary"
        @click="callExportCSV"
      >{{ $t('headerSection.exportCSV') }}
      </wt-button>

      <wt-button-select
        :disabled="!selectedItems.length"
        :options="deleteOptions"
        color="secondary"
        @click:option="$event.handler()"
      >{{ $t('reusable.delete') }}...
      </wt-button-select>
    </template>
  </wt-headline>
</template>

<script>
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import { mapActions, mapGetters, mapState } from 'vuex';
import APIRepository from '../../../app/api/APIRepository';
import ConfirmDeletePopup from '../../../app/components/utils/confirm-delete-popup.vue';

import generateMediaURL from '../../main/modules/registry/mixins/media/scripts/generateMediaURL';
import CallRecordingsAPI from '../../main/modules/registry/modules/recordings/api/CallRecordingsAPI';
import CallTranscriptAPI from '../../main/modules/registry/modules/stt/api/CallTranscriptAPI';
import FilterSearch from '../modules/filters/components/filter-search.vue';

export default {
  name: 'the-history-heading',
  mixins: [
    exportCSVMixin,
    exportFilesMixin,
  ],
  components: {
    FilterSearch,
    ConfirmDeletePopup,
  },
  data: () => ({
    isTranscribing: false,

    deletedCount: null,
    deleteCallback: null,
  }),
  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
    }),

    ...mapGetters('filters', {
      getFilters: 'GET_FILTERS',
    }),

    ...mapGetters('registry', {
      fields: 'DATA_FIELDS',
      selectedItems: 'SELECTED_DATA_ITEMS',
    }),
    deleteOptions() {
      const loadListAfter = (callback) => async () => {
        try {
          await callback();
        } finally { await this.loadDataList(); }
      };
      return [
        {
          value: 'recording',
          text: this.$tc('registry.recordings.recording', 2),
          handler: () => {
            this.deletedCount = this.selectedItems.length;
            this.deleteCallback = loadListAfter(
              this.bulkDeleteRecordings.bind(this),
            );
          },
        },
        {
          value: 'transcript',
          text: this.$tc('registry.stt.transcription', 2),
          handler: () => {
            this.deletedCount = this.selectedItems.length;
            this.deleteCallback = loadListAfter(
              this.bulkDeleteTranscripts.bind(this),
            );
          },
        },
        {
          value: 'both',
          text: this.$t('reusable.both'),
          handler: () => {
            this.deletedCount = this.selectedItems.length;
            this.deleteCallback = loadListAfter(
              async () => Promise.allSettled([
                this.bulkDeleteRecordings.bind(this)(),
                this.bulkDeleteTranscripts.bind(this)(),
              ]),
            );
          },
        },
      ];
    },
  },

  methods: {
    ...mapActions('registry', {
      loadDataList: 'LOAD_DATA_LIST',
    }),
    callExportFiles() {
      try {
        const params = { hasFile: 'true' };
        return this.exportFiles(null, params);
      } catch (err) {
        throw err;
      }
    },

    async callExportCSV() {
      try {
        const params = { ...this.getFilters, fields: this.fields, skipParent: true };
        return this.exportCSV(params);
      } catch (err) {
        throw err;
      }
    },
    async bulkTranscribe() {
      try {
        this.isTranscribing = true;
        const callId = this.selectedItems.map(({ id }) => id);
        await CallTranscriptAPI.create({ callId });
      } finally {
        await this.loadDataList();
        this.isTranscribing = false;
      }
    },
    async bulkDeleteTranscripts() {
      const callId = this.selectedItems.map(({ id }) => id);
      return CallTranscriptAPI.delete({ callId });
    },
    async bulkDeleteRecordings() {
      const fileIds = this.selectedItems
      .reduce((fileIds, { files }) => fileIds.concat(files.map(({ id }) => id)), []);
      return CallRecordingsAPI.delete(fileIds);
    },
    handleDeleteClose() {
      this.deletedCount = null;
      this.deleteCallback = null;
    },
  },
  created() {
    this.initCSVExport(APIRepository.history.getHistory, { filename: 'history' });
    this.initFilesExport({
      fetchMethod: APIRepository.history.getHistory,
      filename: 'history-records',
      filesURL: generateMediaURL,
    });
  },
};
</script>

<style lang="scss" scoped>
.the-history-heading {
  .wt-button, .wt-button-select {
    margin-left: 20px;
  }

  .files-counter {
    @extend %typo-caption;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    background: var(--main-color);
    box-shadow: var(--box-shadow);

    &__count {
      @extend %typo-caption;
    }
  }
}
</style>
