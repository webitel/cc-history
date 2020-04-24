<template>
  <header class="history-section history-heading">
    <h1 class="history-heading__h1">History</h1>
    <div class="history-heading__actions-wrap">
      <search
        v-model="search"
        @search="setQueryValue({ filterQuery: 'search', value: search })"
      />
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
  import Search from '../../utils/search-input.vue';
  import Btn from '../../utils/btn.vue';
  import urlQueryControllerMixin from '../../../mixins/urlQueryControllerMixin';
  import downloadCSVMixin from '../../../mixins/downloadCSV/downloadCSVMixin';
  import downloadAllFilesMixin from '../../../mixins/files/downloadFiles/downloadAllFilesMixin';

  export default {
    name: 'the-history-heading',
    mixins: [
      urlQueryControllerMixin,
      downloadCSVMixin,
      downloadAllFilesMixin,
    ],
    components: {
      Search,
      Btn,
    },

    data: () => ({
      search: '',
    }),

    watch: {
      // eslint-disable-next-line func-names
      '$route.query.search': {
        handler() {
          this.search = this.parseQueryValue({ filterQuery: 'search' });
        },
        immediate: true,
      },
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
      margin-left: calcRem(20px);
    }

    .files-counter {
      $offset: calcRem(10px);
      @extend .typo-body-sm;
      position: absolute;
      right: 0;
      top: calc(100% + #{$offset});
      padding: calcRem(10px) calcRem(15px);
      background: #fff;
      box-shadow: $box-shadow;
      border-radius: $border-radius;

      &__count {
        @extend .typo-heading-sm;
      }
    }
  }
</style>
