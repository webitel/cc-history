<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="$t('fields.queue')"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import APIRepository from '../../api/APIRepository';

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
