<template>
  <wt-headline class="the-history-heading">
    <template slot="title">
      {{ $t('reusable.history') }}
    </template>
    <template slot="actions">

      <filter-search
        namespace="filters"
      ></filter-search>

      <wt-button
        :disabled="!selectedItems.length"
        color="secondary"
        @click="bulkTranscribe"
        :loading="isTranscribing"
      >{{ $t('registry.stt.transcribe') }}
      </wt-button>

      <wt-button
        color="secondary"
        :disabled="!dataList.length"
        :loading="isFilesLoading"
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
        :loading="isCSVLoading"
        :disabled="!dataList.length"
        @click="callExportCSV"
      >{{ $t('headerSection.exportCSV') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import CallTranscriptAPI from '../../main/modules/registry/modules/stt/api/CallTranscriptAPI';
import FilterSearch from '../modules/filters/components/filter-search.vue';

import generateMediaURL from '../../main/modules/registry/mixins/media/scripts/generateMediaURL';
import APIRepository from '../../../app/api/APIRepository';

export default {
  name: 'the-history-heading',
  mixins: [
    exportCSVMixin,
    exportFilesMixin,
  ],
  components: { FilterSearch },
  data: () => ({
    isTranscribing: false,
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
  .wt-button {
    margin-left: 20px;
  }

  .files-counter {
    @extend %typo-caption;
    position: absolute;
    right: 0;
    top: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    background: var(--main-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);

    &__count {
      @extend %typo-caption;
    }
  }
}
</style>
