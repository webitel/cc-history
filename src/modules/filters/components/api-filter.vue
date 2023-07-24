<template>
  <wt-select
    :value="filterSchema.value"
    :label="label"
    :track-by="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :close-on-select="filterSchema.closeOnSelect"
    v-bind="$attrs"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  ></wt-select>
</template>

<script>
import apiFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/enumFilterMixin';

export default {
  name: 'abstract-api-filter',
  mixins: [apiFilterMixin],
  props: {
    filterQuery: {
      type: String,
      required: true,
    },
  },
  methods: {
    search(params) {
      console.log('search:', params);
      return this.filterSchema.search(params);
    },
    async fetchSelected(...args) {
      const { items = [] } = await this.filterSchema.fetchSelected(...args);
      return items;
    },
  },
};
</script>

<style scoped>

</style>
