import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';

const state = {
  page: new BaseFilterSchema({ value: 1, defaultValue: 1 }),
  size: new BaseFilterSchema({ value: 10, defaultValue: 10 }),
};

export default new QueryFiltersStoreModule({ state })
  .generateQueryControllerActions('query-controller')
  .getModule();
