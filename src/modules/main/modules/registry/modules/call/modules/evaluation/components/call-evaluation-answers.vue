<template>
  <ul class="call-evaluation-answers">
      <li
        v-for="(item, index) in value.questions"
        :key="item.question"
        class="call-evaluation-answers__item"
      >
        <div class="call-evaluation-answers__question">
          {{ item.question }}
        </div>
        <div class="call-evaluation-answers__answer">
          <div class="call-evaluation-answers__answer-title">
            {{ answerTitle(item, index) }}
          </div>
          <div class="call-evaluation-answers__answer-score-wrap">
            <div class="call-evaluation-answers__answer-score">
              <wt-icon icon="star--filled" size="md" color="accent"/>
              <div class="call-evaluation-answers__answer-score-number">
                {{ value.answers[index].score }}
              </div>
            </div>
          </div>
        </div>
      </li>
  </ul>
</template>

<script>

export default {
  name: 'call-evaluation-answers',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    answerTitle(item, index) {
      if (item.options) {
        const currentOption = item.options.find((option) => option.score === this.value.answers[index].score);
        return currentOption.name;
        // because this.value.answers[index] doesn`t have field 'name'
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-answers {
  flex: 1;

  &__item {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid var(--secondary-color);
  }

  &__question {
    @extend %typo-subtitle-1;
    padding: var(--spacing-2xs) 0 var(--spacing-3xs);
  }

  &__answer {
    padding: var(--spacing-2xs) 0;
  }

  &__answer-score-wrap {
    width: 100%;
    display: flex;
    justify-content: right;
  }

  &__answer-score {
    width: 100px;
    display: flex;
  }

  &__answer-score-number {
    @extend %typo-body-2;
    margin-left: var(--spacing-xs);
    padding: var(--chip-padding);
    background-color: var(--chip-bg-color);
    border-radius: var(--chip-border-radius);
    color: var(--contrast-color);
  }
}

</style>
