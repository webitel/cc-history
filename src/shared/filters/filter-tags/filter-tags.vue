<template>
  <wt-select
    :value="value"
    :options="options"
    :label="$t('fields.tags')"
    :track-by="storedProp"
    :multiple="multiple"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import enumFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/enumFilterMixin';
import TagOptions from './TagOptions.enum';

export default {
  name: 'filter-tags',
  mixins: [enumFilterMixin],

  data: () => ({
    options: TagOptions,
    filterQuery: 'tags',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.tags.value,
      storedProp: (state) => state.tags.storedProp,
      multiple: (state) => state.tags.multiple,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
  },
};
</script>

<style scoped>

</style>
