<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.direction')"
    :track-by="trackBy"
    multiple
    @reset="setValueArrayToQuery({ value, filterQuery, storedProp })"
    @closed="setValueArrayToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '../mixins/enumFilterMixin';
  import DirectionOptions from '../api/DirectionOptions.enum';

  export default {
    name: 'filter-direction',
    mixins: [enumFilterMixin],

    data: () => ({
      options: DirectionOptions,
      filterQuery: 'direction',
    }),
  };
</script>

<style scoped>

</style>
