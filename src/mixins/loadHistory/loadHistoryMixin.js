import { mapState, mapActions } from 'vuex';
import convertQuery from './loadHistoryScripts';
import historyHeaders from './historyHeaders';

export default {
  data: () => ({
    headers: historyHeaders,
    isLoading: false,
    isNext: false,
  }),

  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
      immediate: true,
    },
  },

  computed: {
    ...mapState('history', {
      data: (state) => state.data,
    }),
  },

  methods: {
    ...mapActions('history', {
      loadDataList: 'LOAD_DATA_LIST',
    }),

    async loadList() {
      this.isLoading = true;
      const params = this.getQueryParams();
      try {
        this.isNext = await this.loadDataList(params);
      } catch {
      } finally {
        this.isLoading = false;
      }
    },

    getDefaultFields() {
      return this.headers
        .filter((header) => header.show)
        .reduce((fields, nextItem, index) => {
          if (!index) return nextItem.field;
          return `${fields},${nextItem.field}`;
        }, '');
    },

    getQueryParams() {
      let { query } = this.$route;
      if (!query.fields) {
        const fields = this.getDefaultFields();
        // do not mutate $route: reassign variable instead of query.fields=
        query = { ...query, fields };
      }
      return convertQuery(query);
    },
  },
};
