<template>
  <!-- copy-pasted abstract-api-filter.vue template -->
  <wt-select
    ref="preset-filter"
    :value="filterSchema.value"
    :label="label"
    :track-by="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :close-on-select="filterSchema.closeOnSelect"
    v-bind="$attrs"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="resetValue({ value: $event, filterQuery, storedProp: filterSchema.storedProp })"
  />
</template>

<script>
import apiFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/apiFilterMixin';
import PresetQueryAPI from '../api/PresetQueryAPI';

export default {
  name: 'PresetFilter',
  mixins: [apiFilterMixin],
  props: {
    presetFilterSchema: {
      type: Object,
      required: true,
    },
  },
  emits: ['input'],
  data: () => ({
    filterQuery: 'preset',
  }),
  computed: {
    filterSchema() {
      return this.presetFilterSchema;
    },
  },
  methods: {
    searchMethod: PresetQueryAPI.getList,
    async setValue({ value }) {
      // apiFilterMixin tries to set value only with id before making
      // api request
      if (value.id && !value.preset) return;
      this.$emit('input', value);
      await this.setValueToQuery({
        value,
        filterQuery: this.filterQuery,
        storedProp: this.filterSchema.storedProp,
      });
    },
    resetValue(args) {
      this.setValue(args);
      return this.setValueToQuery(args);
    },
    search(params) {
      return this.searchMethod(params);
    },
    async fetchSelected(id) {
      const { items = [] } = await this.search({ id });
      return items[0];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
