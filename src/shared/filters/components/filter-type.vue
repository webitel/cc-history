<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.type')"
    :track-by="trackBy"
    multiple
    @reset="setValueArrayToQuery({ value, filterQuery, storedProp })"
    @closed="setValueArrayToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '../mixins/enumFilterMixin';
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
