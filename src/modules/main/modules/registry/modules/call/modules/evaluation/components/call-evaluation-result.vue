<template>
  <section class="call-evaluation-result">
      <div class="call-evaluation-result__scorecard-info">
        <div
          v-for="item in scorecardInfo"
          class="call-evaluation-result__scorecard-info-item"
        >
          <span class="call-evaluation-result__scorecard-info-item-title">
            {{ item.title }}
          </span>
          <span class="call-evaluation-result__scorecard-info-item-value">
            {{ item.value }}
          </span>
        </div>
        <div
          v-if="value.comment"
          class="call-evaluation-result__scorecard-info-comment"
        >
            <span class="call-evaluation-result__scorecard-info-item-title">
              Comment
            </span>
            <span class="call-evaluation-result__scorecard-info-item-value">
              {{ value.comment }}
            </span>
        </div>
        <div class="call-evaluation-result__scorecard-info-rating">
          <div
            v-if="value.scoreRequired"
            class="call-evaluation-result__scorecard-info-rating-icon-wrap"
          >
            <img
              src="../../../../../../../../../../src/app/assets/icons/star--filled.svg"
              alt="star"
              class="call-evaluation-result__scorecard-info-rating-icon"
            >
            <span class="call-evaluation-result__scorecard-info-rating-score">
            {{ Math.round(value.scoreRequired) }}
            </span>
          </div>
          <div
            v-if="value.scoreOptional"
            class="call-evaluation-result__scorecard-info-rating-icon-wrap"
          >
            <img
              src="../../../../../../../../../../src/app/assets/icons/star--filled.svg"
              alt="star"
              class="call-evaluation-result__scorecard-info-rating-icon"
            >
            <span class="call-evaluation-result__scorecard-info-rating-score">
            {{ Math.round(value.scoreOptional) }}
            </span>
          </div>
        </div>
      </div>
      <ul class="call-evaluation-result__scorecard-items">
        <li
          v-for="(item, index) in value.questions"
          :key="item.question"
          class="call-evaluation-result__scorecard-item"
        >
          <div class="call-evaluation-result__scorecard-item-question">
            {{ item.question }}
          </div>
          <div class="call-evaluation-result__scorecard-item-answer">
            <div class="call-evaluation-result__scorecard-item-answer-title">
              {{ answerTitle(item, index) }}
            </div>
            <div class="call-evaluation-result__scorecard-item-answer-score">
              <wt-icon icon="star--filled" size="md" color="accent"/>
              <div class="call-evaluation-result__scorecard-item-answer-score-number">
                {{ value.answers[index].score }}
              </div>
            </div>
          </div>
        </li>
      </ul>
  </section>
</template>

<script>

export default {
  name: 'call-evaluation-result',
  components: {},
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
        {title: 'Rated by', value: this.value.createdBy.name},
        {title: 'Agent', value: this.value.ratedUser.name},
        {title: 'Date', value: date.toLocaleDateString()},
        {title: 'Scorecard', value: this.value.form.name},
      ];
    },
  },
  methods: {
    answerTitle(item, index) {
      if(item.options) {
        const currentOption = item.options.find(option => option.score === this.value.answers[index].score);
        return currentOption.name;
        // because this.value.answers[index] doesn`t have field 'name'
      }
    },
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

  &__scorecard-info-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-sm);

    &-title {
      @extend %typo-subtitle-1;
    }

    &-value {
      @extend %typo-body-1;
    }
  }

  &__scorecard-info-comment {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-xxs);
  }

  &__scorecard-info-rating {
    width: 100%;
    margin: var(--spacing-sm) 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &-icon-wrap {
      position: relative;
    }

    &-score {
      @extend %typo-subtitle-1;
      position: absolute;
      left: 50%;
      top: 50%;
      color: var(--contrast-color);
      transform: translate(-50%, -50%);
    }
  }

  &__scorecard-info-rating-icon {
    fill: var(--secondary-color);
  }

  &__scorecard-items {
    flex: 1;
  }

  &__scorecard-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid var(--secondary-color);
  }

  &__scorecard-item-question {
    @extend %typo-subtitle-1;
    padding: var(--spacing-xs) 0;
  }

  &__scorecard-item-answer {
    display: grid;
    grid-template-columns: 1fr 100px;
    padding: var(--spacing-xs) 0;
  }

  &__scorecard-item-answer-score {
    display: flex;
  }

  &__scorecard-item-answer-score-number {
      @extend %typo-body-2;
      margin-left: var(--spacing-sm);
      padding: var(--chip-padding);
      background-color: var(--chip-bg-color);
      border-radius: var(--chip-border-radius);
      color: var(--contrast-color);
  }
}
</style>
