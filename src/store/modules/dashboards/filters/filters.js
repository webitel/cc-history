import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import IntervalOptions from '../../../../components/history/history-main/dashboards/filters/filter-interval/IntervalOptions.enum';

const state = {
  interval: new EnumFilterSchema({
    value: {},
    defaultValue: {},
    options: IntervalOptions,
    locale: { label: 'dashboards.interval.interval' },
    multiple: false,
  }),
};

export default new QueryFiltersStoreModule({ state })
  .generateQueryControllerActions('query-controller')
  .getModule();
