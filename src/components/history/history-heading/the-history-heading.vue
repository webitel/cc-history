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
        color="primary"
        :loading="isCSVLoading"
        @click="downloadCSV"
      >{{ $t('headerSection.exportCSV') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FilterSearch from '../../../shared/filters/components/filter-search.vue';
import downloadCSVMixin from '../../../mixins/downloadCSV/downloadCSVMixin';
import downloadAllFilesMixin from '../../../mixins/downloadFiles/downloadAllFilesMixin';

export default {
  name: 'the-history-heading',
  mixins: [
    downloadCSVMixin,
    downloadAllFilesMixin,
  ],
  components: {
    FilterSearch,
  },

  computed: {
    ...mapGetters('history', {
      dataFields: 'DATA_FIELDS',
      selectedItems: 'SELECTED_DATA_ITEMS',
    }),
  },
  methods: {
    ...mapActions('history', {
      fetchDownloadList: 'FETCH_DOWNLOAD_LIST', // files and csv download
    }),
  },
};
</script>

<style lang="scss" scoped>
.the-history-heading {
  .wt-button {
    margin-left: 20px;
  }

  .files-counter {
    $offset: 10px;
    @extend %typo-body-sm;
    position: absolute;
    right: 0;
    top: calc(100% + #{$offset});
    padding: (10px) (15px);
    background: #fff;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);

    &__count {
      @extend %typo-strong-sm;
    }
  }
}
</style>
