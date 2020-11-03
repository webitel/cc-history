<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('fields.cause')"
    :track-by="trackBy"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
  import HangupCauseOptions from '../api/HangupCauseOption.enum';

  export default {
    name: 'filter-cause',
    mixins: [enumFilterMixin],

    data: () => ({
      options: HangupCauseOptions,
      filterQuery: 'cause',
      storedProp: 'code',
      trackBy: 'code',
    }),
  };
</script>

<style scoped>

</style>
