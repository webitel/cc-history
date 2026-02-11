import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';

import IntervalOptions from '../enums/IntervalOptions.enum';

const state = {
	interval: new EnumFilterSchema({
		value: {},
		defaultValue: IntervalOptions.find((interval) => interval.value === 'auto'),
		options: IntervalOptions,
		locale: {
			label: 'dashboards.interval.interval',
		},
		multiple: false,
	}),
};

export default new QueryFiltersStoreModule({
	state,
}).getModule();
