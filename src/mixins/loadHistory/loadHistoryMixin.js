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

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },
  },
};
