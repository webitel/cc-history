<template>
  <ul class="call-evaluation-answers">
      <li
        v-for="(item, index) in result.questions"
        :key="item.question"
        class="call-evaluation-answers-item"
      >
        <div
          class="call-evaluation-answers-item__question"
          :class="{'call-evaluation-answers__question--required': item.required }"
        >
          {{ item.question }}
        </div>
        <div class="call-evaluation-answers-item__answer">
          <div class="call-evaluation-answers-item__title">
            {{ answerTitle(item, index) }}
          </div>
          <div class="call-evaluation-answers-item__score-wrap">
            <div class="call-evaluation-answers-item__score">
              <wt-icon
                icon="star--filled"
                size="md"
                color="accent"
              />
              <div class="call-evaluation-answers-item__score-number">
                {{ result.answers[index].score }}
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
    result: {
      type: Object,
      required: true,
    },
  },
  methods: {
    answerTitle(item, index) {
      if (item.options) {
        const currentOption = item.options.find((option) => option.score === this.result.answers[index].score);
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
}

.call-evaluation-answers-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid var(--secondary-color);

  &__question {
    @extend %typo-subtitle-1;
    padding: var(--spacing-2xs) 0 var(--spacing-3xs);

    &--required::after {
      content: "*";
      color: var(--false-color);
    }
  }

  &__answer {
    padding: var(--spacing-2xs) 0;
  }

  &__score-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &__score {
    width: 100px;
    display: flex;
  }

  &__score-number {
    @extend %typo-body-2;
    margin-left: var(--spacing-xs);
    padding: var(--chip-padding);
    background-color: var(--chip-bg-color);
    border-radius: var(--chip-border-radius);
    color: var(--contrast-color);
  }
}

</style>
