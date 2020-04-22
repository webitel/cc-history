<template>
  <multiselect
    v-model="value"
    :options="options"
    :label="'Hangup cause'"
    :api-mode="apiMode"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import enumFilterMixin from '../../../../mixins/filters/enumFilterMixin';
  import HangupCauseOptions from '../../../../api/filter-getters/HangupCauseOption.enum';

  export default {
    name: 'filter-cause',
    mixins: [enumFilterMixin],

    data: () => ({
      options: HangupCauseOptions,
      filterQuery: 'cause',
      queriedProp: 'id',
    }),
  };
</script>

<style scoped>

</style>
