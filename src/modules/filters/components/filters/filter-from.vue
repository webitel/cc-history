<template>
  <wt-datepicker
    :value="value"
    :label="$t('components.dtPicker.from')"
    mode="datetime"
    @input="handleChange"
  ></wt-datepicker>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-from',
  mixins: [baseFilterMixin],

  data: () => ({
    filterQuery: 'from',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.from.value,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    handleChange(value) {
      this.setValue({ filter: this.filterQuery, value });
      this.setValueToQuery({ filterQuery: this.filterQuery, value });
    },
    restoreValue(value) {
      this.setValue({ filter: this.filterQuery, value: +value });
    },
  },
};
</script>

<style scoped>

</style>
