import QueryControllerStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryControllerStoreModule';
import router from '../../../router';

const actions = {
  BEFORE_CHANGE_ROUTE_QUERY_HOOK: async (context, { query, filterQuery }) => {
    if (filterQuery !== 'page' && query.page > 1) {
      return context.dispatch('RESET_QUERY_PAGE', query);
    }
    return query;
  },
  RESET_QUERY_PAGE: (context, query) => {
    context.dispatch('registry/filters/SET_FILTER', {
      filter: 'page',
      value: 1,
    }, { root: true });
    return {
      ...query,
      page: 1,
    };
  },
};

const queryController = new QueryControllerStoreModule({ router })
  .getModule({ actions });

export default queryController;
