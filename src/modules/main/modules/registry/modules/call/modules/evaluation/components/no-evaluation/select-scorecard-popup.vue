<template>
  <wt-popup
    class="select-scorecard-popup"
    width="480"
    overflow
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('registry.call.evaluation.selectTheScorecard') }}
    </template>
    <template #main>
      <wt-select
        v-model="scorecard"
        :label="$t('registry.call.evaluation.scorecard')"
        :search-method="loadScorecards"
        :clearable="false"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!scorecard"
        @click="selectScorecard"
      >
        {{ $t('reusable.start') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import CallEvaluationAPI from '../../api/CallEvaluationAPI';

const scorecardIdCacheKey = 'history-last-used-scorecard-id';

export default {
  name: 'SelectScorecardPopup',

  data: () => ({
    scorecard: null,
  }),
  created() {
    this.setScorecardFromCache();
  },

  methods: {
    selectScorecard() {
      this.$emit('change', this.scorecard);
      this.cacheScorecardId(this.scorecard.id);
      this.$emit('close');
    },
    cacheScorecardId(id) {
      localStorage.setItem(scorecardIdCacheKey, id);
    },
    async setScorecardFromCache() {
      const scorecardId = localStorage.getItem(scorecardIdCacheKey);
      if (scorecardId) {
        const response = await CallEvaluationAPI.get({ itemId: scorecardId });
        this.scorecard = response;
      }
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
