<template>
  <wt-select
    v-model="value"
    :label="$t('fields.queue')"
    :track-by="trackBy"
    :search="fetch"
    :internal-search="false"
    :close-on-select="false"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import apiFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/apiFilterMixin';
  import APIRepository from '../../../api/APIRepository';

  const queueAPI = APIRepository.queues;

  export default {
    name: 'filter-queue',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'queue',
    }),

    methods: {
      fetch: queueAPI.getQueues,
      fetchSelected: queueAPI.getQueuesByIds,
    },
  };
</script>

<style scoped>

</style>
