<template>
  <header class="history-section history-heading">
    <h1 class="history-heading__h1">History</h1>
    <div class="history-heading__actions-wrap">
      <search
        v-model="search"
        @search="setQueryValue({ filterQuery: 'search', value: search })"
      />
      <btn class="secondary">Download</btn>
      <btn class="primary" @click.native="exportCSV">Export CSV</btn>
    </div>
  </header>
</template>

<script>
  import Search from '../../utils/search-input.vue';
  import Btn from '../../utils/btn.vue';
  import urlQueryControllerMixin from '../../../mixins/urlQueryControllerMixin';
  import csvExportMixin from '../../../mixins/csvExportMixin';

  export default {
    name: 'the-history-heading',
    mixins: [urlQueryControllerMixin, csvExportMixin],
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

    .cc-btn {
      margin-left: calcRem(20px);
    }
  }
</style>
