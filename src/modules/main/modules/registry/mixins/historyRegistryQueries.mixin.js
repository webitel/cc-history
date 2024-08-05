export default {
  methods: {
    setHistoryRegistryQueriesToSessionStorage(queries) {
      sessionStorage.setItem('historyRegistryQueries', JSON.stringify(queries));
    },
    getHistoryRegistryQueriesFromSessionStorage() {
      return sessionStorage.getItem('historyRegistryQueries');
    },
  },
};
