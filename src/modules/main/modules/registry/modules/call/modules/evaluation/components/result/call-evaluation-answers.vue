<template>
  <ul class="call-evaluation-answers">
    <li
      v-for="({ question, required, answerScore, answerName }) in questions"
      :key="question"
      class="call-evaluation-answers-item"
    >
      <div
        class="call-evaluation-answers-item__question"
        :class="{'call-evaluation-answers-item__question--required': required }"
      >
        {{ question }}
      </div>
      <div
        v-if="answerScore >= 0"
        class="call-evaluation-answers-item__answer"
      >
        <div class="call-evaluation-answers-item__title">
          {{ answerName }}
        </div>
        <div
          class="call-evaluation-answers-item__score-wrap"
        >
          <div class="call-evaluation-answers-item__score">
            <wt-icon
              color="primary"
              icon="star--filled"
              size="md"
            />
            <wt-chip>
              {{ answerScore }}
            </wt-chip>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'CallEvaluationAnswers',
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {
    questions() {
      return this.result.questions.map(({ question, required, options }, index) => {
        return {
          question,
          required,
          answerScore: this.result.answers[index].score,
          answerName: options
            ? options.find(({ score }) => score === this.result.answers[index].score)?.name || ''
            : '',
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.call-evaluation-answers-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid var(--secondary-color);

  &__question {
    @extend %typo-subtitle-1;
    padding: var(--spacing-2xs) 0 var(--spacing-3xs);

    &--required::after {
      content: '*';
      color: var(--error-color);
    }
  }

  &__answer {
    padding: var(--spacing-2xs) 0;
  }

  &__score-wrap {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__score {
    display: flex;
    width: 100px;
  }
}

</style>
