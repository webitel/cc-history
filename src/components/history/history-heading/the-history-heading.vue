<template>
  <wt-headline class="the-history-heading">
    <template slot="title">
      {{ $t('reusable.history') }}
    </template>
    <template slot="actions">
      <filter-search/>
      <wt-button
        color="secondary"
        :loading="isFilesLoading"
        @click="downloadFiles"
      >{{ $t('reusable.download') }}
      </wt-button>
      <div v-show="isFilesLoading" class="files-counter">
        {{ $t('headerSection.filesLoaded') }}<span
        class="files-counter__count">{{ this.filesCounter }}</span>
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
import { mapState, mapActions } from 'vuex';
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';

import FilterSearch from '../../../shared/filters/components/filter-search.vue';
import downloadAllFilesMixin from '../../../mixins/downloadFiles/downloadAllFilesMixin';
import APIRepository from '../../../api/APIRepository';

export default {
  name: 'the-history-heading',
  mixins: [
    exportCSVMixin,
    downloadAllFilesMixin,
  ],
  components: {
    FilterSearch,
  },

  created() {
    this.initCSVExport(APIRepository.history.getHistory, { filename: 'history' });
  },

  computed: {
    ...mapState('history', {
      dataList: (state) => state.dataList,
    }),
  },

  methods: {
    ...mapActions('history', {
      getRequestParams: 'GET_REQUEST_PARAMS',
    }),

    async callExportCSV() {
      const params = await this.getRequestParams();
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
