<template>
  <wt-popup
    class="select-scorecard-popup"
    width="480"
    overflow
    @close="$emit('close')"
  >
    <template v-slot:header>
      {{$t('registry.call.evaluation.selectTheScorecard')}}
    </template>
    <template v-slot:main>
      <wt-select
        v-model="scorecard"
        :label="$t('registry.call.evaluation.scorecard')"
        :search-method="loadScorecards"
        :clearable="false"
      />
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="!scorecard"
        @click="selectScorecard"
      >{{ $t('reusable.start') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >{{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import CallEvaluationAPI from '../../api/CallEvaluationAPI';

export default {
  name: 'select-scorecard-popup',

  data: () => ({
    scorecard: null,
  }),

  methods: {
    selectScorecard() {
      this.$emit('change', this.scorecard);
      this.$emit('close');
    },
    loadScorecards: (params) => CallEvaluationAPI.getLookup({
       ...params,
       fields: ['id', 'name', 'questions'],
       enabled: true,
       active: true,
     }),
  },
};
</script>

<style lang="scss" scoped>
</style>
