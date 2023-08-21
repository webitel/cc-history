<template>
  <wt-popup
    class="select-scorecard-popup"
    width="480"
    overflow
    @close="$emit('close')"
  >
    <template v-slot:header>
      {{ $t('registry.call.evaluation.selectTheScorecard') }}
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

const scorecardCacheKey = 'history-last-used-scorecard';

export default {
  name: 'select-scorecard-popup',

  data: () => ({
    scorecard: null,
  }),

  methods: {
    selectScorecard() {
      this.$emit('change', this.scorecard);
      this.cacheScorecard(this.scorecard);
      this.$emit('close');
    },
    cacheScorecard(scorecard) {
      localStorage.setItem(scorecardCacheKey, JSON.stringify(scorecard));
    },
    async setScorecardFromCache() {
      const scorecard = localStorage.getItem(scorecardCacheKey);
      const parseScorecard = JSON.parse(scorecard);
      if (scorecard) {
        const response = await CallEvaluationAPI.get({ itemId: parseScorecard.id });
        this.scorecard = response;
        this.cacheScorecard(this.scorecard);
      }
    },
    loadScorecards: (params) => CallEvaluationAPI.getLookup({
      ...params,
      fields: ['id', 'name', 'questions'],
      enabled: true,
      active: true,
    }),
  },
  created() {
    this.setScorecardFromCache();
  },
};
</script>

<style lang="scss" scoped>
</style>
