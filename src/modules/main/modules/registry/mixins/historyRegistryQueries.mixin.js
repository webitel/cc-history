export default {
  methods: {
    setHistoryRegistryQueriesToSessionStorage(queries) {
      sessionStorage.setItem('historyRegistryQueries', JSON.stringify(queries));
    },
    getHistoryRegistryQueriesFromSessionStorage() {
      const historyRegistryQueries = sessionStorage.getItem('historyRegistryQueries');
      if (!historyRegistryQueries) return;
      return JSON.parse(historyRegistryQueries);
    },
  },
};
