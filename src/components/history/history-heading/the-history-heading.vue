<template>
  <header class="history-section history-heading">
    <h1 class="history-heading__h1">History</h1>
    <div class="history-heading__actions-wrap">
      <filter-search/>
      <btn
        class="secondary"
        :loading="isFilesLoading"
        @click.native="downloadFiles"
      >Download
      </btn>
      <div v-show="isFilesLoading" class="files-counter">
        Files loaded: <span class="files-counter__count">{{this.filesCounter}}</span>
      </div>
      <btn
        class="primary"
        :loading="isCSVLoading"
        @click.native="downloadCSV"
      >Export CSV
      </btn>
    </div>
  </header>
</template>

<script>
  import FilterSearch from './filters/filter-search.vue';
  import Btn from '../../utils/btn.vue';
  import downloadCSVMixin from '../../../mixins/downloadCSV/downloadCSVMixin';
  import downloadAllFilesMixin from '../../../mixins/files/downloadFiles/downloadAllFilesMixin';

  export default {
    name: 'the-history-heading',
    mixins: [
      downloadCSVMixin,
      downloadAllFilesMixin,
    ],
    components: {
      FilterSearch,
      Btn,
    },
  };
</script>

<style lang="scss" scoped>
  .history-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .history-heading__h1 {
    @extend .typo-heading-md;
  }

  .history-heading__actions-wrap {
    display: flex;
    align-items: center;
    position: relative;

    .cc-btn {
      margin-left: (20px);
    }

    .files-counter {
      $offset: (10px);
      @extend .typo-body-sm;
      position: absolute;
      right: 0;
      top: calc(100% + #{$offset});
      padding: (10px) (15px);
      background: #fff;
      box-shadow: $box-shadow;
      border-radius: $border-radius;

      &__count {
        @extend .typo-heading-sm;
      }
    }
  }
</style>
