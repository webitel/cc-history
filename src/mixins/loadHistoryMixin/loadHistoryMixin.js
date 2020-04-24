import { getHistory } from '../../api/history/history';
import convertQuery from './loadHistoryScripts';
import historyHeaders from './historyHeaders';

export default {
  data: () => ({
    data: null,
    headers: historyHeaders,
    isLoading: false,
  }),

  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
      immediate: true,
    },
  },

  methods: {
    async loadList() {
      this.isLoading = true;
      const params = this.getQueryParams();
      try {
        const { items, next } = await getHistory(params);
        this.data = items;
        this.isNext = next;
      } catch {
      } finally {
        this.isLoading = false;
      }
    },

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },

    fetch() {
    },
  },
};
