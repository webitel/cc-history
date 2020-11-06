<template>
  <wt-select
    :value="value"
    :label="$t('fields.queue')"
    :track-by="storedProp"
    :multiple="multiple"
    :search="search"
    :internal-search="false"
    :close-on-select="false"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import apiFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/apiFilterMixin';
import APIRepository from '../../../api/APIRepository';

const queueAPI = APIRepository.queues;

export default {
  name: 'filter-queue',
  mixins: [apiFilterMixin],

  data: () => ({
    filterQuery: 'queue',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.queue.value,
      storedProp: (state) => state.queue.storedProp,
      multiple: (state) => state.queue.multiple,
    }),
  },
  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    search: queueAPI.getQueues,
    fetchSelected: queueAPI.getQueuesByIds,
  },
};
</script>

<style scoped>

</style>
