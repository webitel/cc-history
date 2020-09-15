<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.type')"
    :track-by="trackBy"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
  import TypeOptions from '../api/TypeOptions.enum';

  export default {
    name: 'filter-type',
    mixins: [enumFilterMixin],

    data: () => ({
      options: TypeOptions,
      filterQuery: 'type',
    }),
  };
</script>

<style scoped>

</style>
