<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.cause')"
    :track-by="trackBy"
    multiple
    @reset="setValueArrayToQuery({ value, filterQuery, storedProp })"
    @closed="setValueArrayToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '../mixins/enumFilterMixin';
  import HangupCauseOptions from '../api/HangupCauseOption.enum';

  export default {
    name: 'filter-cause',
    mixins: [enumFilterMixin],

    data: () => ({
      options: HangupCauseOptions,
      filterQuery: 'cause',
      storedProp: 'id',
    }),
  };
</script>

<style scoped>

</style>
