<template>
  <abstract-enum-filter
    :filter-query="filterQuery"
    :namespace="namespace"
  />
</template>

<script>
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';

export default {
	name: 'FilterInterval',
	components: {
		AbstractEnumFilter,
	},
	data: () => ({
		filterQuery: 'interval',
		namespace: 'dashboards/filters',
	}),
};
</script>

<style scoped>

</style>
