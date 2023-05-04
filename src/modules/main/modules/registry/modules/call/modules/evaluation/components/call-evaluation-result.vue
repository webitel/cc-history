<template>
  <section class="call-evaluation-result">
      <div class="call-evaluation-result__scorecard-info">
        <scorecard-info :value="scorecardInfo" :comment="value.comment" />
        <div class="call-evaluation-result__scorecard-info-rating">
          <call-evaluation-score
            v-if="value.scoreOptional"
            :value="value.scoreOptional"
            :title="$t('registry.call.evaluation.mandatory')"
            color="success"
          />
          <call-evaluation-score
            v-if="value.scoreRequired"
            :value="value.scoreRequired"
            :title="$t('registry.call.evaluation.optional')"
            color="secondary"
          />
        </div>
      </div>
    <call-evaluation-answers :value="value" />
  </section>
</template>

<script>

import CallEvaluationAnswers from './call-evaluation-answers.vue';
import CallEvaluationScore from './call-evaluation-score.vue';
import ScorecardInfo from './scorecard-info.vue';

export default {
  name: 'call-evaluation-result',
  components: {
    ScorecardInfo,
    CallEvaluationAnswers,
    CallEvaluationScore,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
  }),
  computed: {
    scorecardInfo() {
      const date = new Date(Number(this.value.createdAt));
      return [
        { title: this.$t('fields.ratedBy'), value: this.value.createdBy.name },
        { title: this.$t('fields.agent'), value: this.value.ratedUser.name },
        { title: this.$t('fields.date'), value: date.toLocaleDateString() },
        { title: this.$t('registry.call.evaluation.scorecard'), value: this.value.form.name },
      ];
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-result {
  display: flex;
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);

  &__scorecard-info {
    flex: 1;
  }

  &__scorecard-info-rating {
    width: 100%;
    margin: var(--spacing-xs) 0;
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }
}

</style>
