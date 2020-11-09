<template>
  <wt-select
    :value="value"
    :options="options"
    :label="$t('fields.direction')"
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
import DirectionOptions from './DirectionOptions.enum';

export default {
  name: 'filter-direction',
  mixins: [enumFilterMixin],

  data: () => ({
    options: DirectionOptions,
    filterQuery: 'direction',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.direction.value,
      storedProp: (state) => state.direction.storedProp,
      multiple: (state) => state.direction.multiple,
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
