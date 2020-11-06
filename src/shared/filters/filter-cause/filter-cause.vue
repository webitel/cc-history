<template>
  <wt-select
    :value="value"
    :options="options"
    :label="$t('fields.cause')"
    :track-by="storedProp"
    :multiple="multiple"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
import HangupCauseOptions from './HangupCauseOption.enum';

export default {
  name: 'filter-cause',
  mixins: [enumFilterMixin],

  data: () => ({
    options: HangupCauseOptions,
    filterQuery: 'cause',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.cause.value,
      storedProp: (state) => state.cause.storedProp,
      multiple: (state) => state.cause.multiple,
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
