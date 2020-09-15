<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.direction')"
    :track-by="trackBy"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
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
