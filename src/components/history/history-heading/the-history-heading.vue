<template>
  <wt-headline class="the-history-heading">
    <template slot="title">
      {{ $t('reusable.history') }}
    </template>
    <template slot="actions">
      <filter-search/>
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
import { mapState, mapGetters } from 'vuex';
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';

import generateMediaURL from '../../../mixins/media/scripts/generateMediaURL';
import FilterSearch from '../../../shared/filters/filter-search/filter-search.vue';
import APIRepository from '../../../api/APIRepository';

export default {
  name: 'the-history-heading',
  mixins: [
    exportCSVMixin,
    exportFilesMixin,
  ],
  components: { FilterSearch },

  created() {
    this.initCSVExport(APIRepository.history.getHistory, { filename: 'history' });
    this.initFilesExport({
      fetchMethod: APIRepository.history.getHistory,
      filename: 'history-records',
      filesURL: generateMediaURL,
    });
  },

  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
    }),

    ...mapGetters('registry', {
      fields: 'DATA_FIELDS',
      selectedItems: 'SELECTED_DATA_ITEMS',
    }),
  },

  methods: {
    callExportFiles() {
      const params = { fileExists: true };
      return this.exportFiles(null, params);
    },

    async callExportCSV() {
      const params = { ...this.$route.query, fields: this.fields, skipParent: true };
      return this.exportCSV(params);
    },
  },
};
</script>

<style lang="scss" scoped>
.the-history-heading {
  .wt-button {
    margin-left: 20px;
  }

  .files-counter {
    @extend %typo-body-sm;
    position: absolute;
    right: 0;
    top: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    background: var(--main-primary-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);

    &__count {
      @extend %typo-strong-sm;
    }
  }
}
</style>
