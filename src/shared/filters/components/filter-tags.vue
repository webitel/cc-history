<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.tags')"
    :track-by="trackBy"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
  import TagOptions from '../api/TagOptions.enum';

  export default {
    name: 'filter-tags',
    mixins: [enumFilterMixin],

    data: () => ({
      options: TagOptions,
      filterQuery: 'tags',
      storedProp: 'value',
    }),
  };
</script>

<style scoped>

</style>
