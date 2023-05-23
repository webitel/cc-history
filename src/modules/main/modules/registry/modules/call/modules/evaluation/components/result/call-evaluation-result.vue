<template>
  <section class="call-evaluation-result">
      <div class="call-evaluation-result__scorecard-info">
        <call-evaluation-result-info
          :info="scorecardInfo"
          :comment="result.comment"
        ></call-evaluation-result-info>
        <div class="call-evaluation-result__scorecard-info-rating">
          <call-evaluation-score
            v-if="result.scoreRequired"
            :value="result.scoreRequired"
            :title="$t('registry.call.evaluation.mandatory')"
            color="success"
          />
          <call-evaluation-score
            v-if="result.scoreOptional"
            :value="result.scoreOptional"
            :title="$t('registry.call.evaluation.optional')"
            color="secondary"
          />
        </div>
      </div>
    <call-evaluation-answers :result="result" />
  </section>
</template>

<script>

import CallEvaluationAnswers from './call-evaluation-answers.vue';
import CallEvaluationScore from './call-evaluation-score.vue';
import CallEvaluationResultInfo from './call-evaluation-result-info.vue';

export default {
  name: 'call-evaluation-result',
  components: {
    CallEvaluationResultInfo,
    CallEvaluationAnswers,
    CallEvaluationScore,
  },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {
    scorecardInfo() {
      return [
        { title: this.$t('fields.ratedBy'), value: this.result.createdBy.name },
        { title: this.$t('fields.agent'), value: this.result.ratedUser.name },
        { title: this.$t('fields.date'), value: new Date(+this.result.createdAt).toLocaleDateString() },
        { title: this.$t('registry.call.evaluation.scorecard'), value: this.result.form.name },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-result {
  display: flex;
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

.call-evaluation-answers {
  flex: 1;
}
</style>
