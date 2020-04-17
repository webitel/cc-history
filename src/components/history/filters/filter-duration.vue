<template>
  <input-timerange
    v-model="value"
    :label="'Duration'"
    @change="setDuration"
  ></input-timerange>
</template>

<script>
  import InputTimerange from '../../utils/input-timerange.vue';
  import urlQueryControllerMixin from '../../../mixins/urlQueryControllerMixin';
  import { camelToKebab } from '../../../api/utils/caseConverters';

  export default {
    name: 'filter-duration',
    mixins: [urlQueryControllerMixin],
    components: {
      InputTimerange,
    },

    data: () => ({
      value: {
        from: 0,
        to: 60,
      },
    }),

    created() {
      this.restoreValue();
    },

    methods: {
      restoreValue() {
        this.restoreDurationFrom();
        this.restoreDurationTo();
      },

      restoreDurationFrom() {
        const queryValue = this.$route.query[camelToKebab('durationFrom')];
        this.value.from = +queryValue || 0;
      },

      restoreDurationTo() {
        const queryValue = this.$route.query[camelToKebab('durationTo')];
        this.value.to = +queryValue || null;
      },

      setDuration(value) {
        this.setQueryValue({
          filterQuery: camelToKebab('durationFrom'),
          value: value.from,
        });

        this.setQueryValue({
          filterQuery: camelToKebab('durationTo'),
          value: value.to,
        });
      },
    },
  };
</script>

<style scoped>

</style>
