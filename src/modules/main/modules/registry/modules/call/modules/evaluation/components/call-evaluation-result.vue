<template>
  <section class="call-evaluation-result">
      <div class="call-evaluation-result__scorecard-info">
        <scorecard-info :value="scorecardInfo" :comment="value.comment" />
        <div class="call-evaluation-result__scorecard-info-rating">
          <call-evaluation-score v-if="value.scoreOptional" :value="value.scoreOptional" color="active"/>
          <call-evaluation-score v-if="value.scoreRequired" :value="value.scoreRequired" />
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
        { title: 'Rated by', value: this.value.createdBy.name },
        { title: 'Agent', value: this.value.ratedUser.name },
        { title: 'Date', value: date.toLocaleDateString() },
        { title: 'Scorecard', value: this.value.form.name },
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
    align-items: center;
  }
}

</style>
