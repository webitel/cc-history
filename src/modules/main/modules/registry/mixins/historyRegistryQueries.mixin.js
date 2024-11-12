import { isEmpty } from '@webitel/ui-sdk/scripts';

export default {
  methods: {
    setHistoryRegistryQueriesToSessionStorage(queries) {
      sessionStorage.setItem('historyRegistryQueries', JSON.stringify(queries));
    },
    getHistoryRegistryQueriesFromSessionStorage() {
      const historyRegistryQueries = sessionStorage.getItem('historyRegistryQueries');
      const parsed = JSON.parse(historyRegistryQueries);
      return isEmpty(parsed) ? false : parsed;
    },
  },
};
