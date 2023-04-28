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
          v-if="result.comment"
          class="call-evaluation-result__scorecard-info-comment"
        >
            <span class="call-evaluation-result__scorecard-info-item-title">
              Comment
            </span>
            <span class="call-evaluation-result__scorecard-info-item-value">
              {{ result.comment }}
            </span>
        </div>
        <div class="call-evaluation-result__scorecard-info-rating">
          <div class="call-evaluation-result__scorecard-info-rating-icon-wrap">
            <wt-icon
              icon="star--filled"
              size="xl"
              color="secondary"
              class="call-evaluation-result__scorecard-info-rating-icon"
            />
            <span class="call-evaluation-result__scorecard-info-rating-score">
            {{ result.score_optional }}
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
              Some Title
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
  components: {
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    resultMock: {
  answers: [
  {
    score: 0,
  },
],
  comment: 'string',
  created_at: 'string',
  created_by: {
  id: 'string',
    name: 'string'
},
  form: {
  id: 'string',
    name: 'string'
},
  id: 'string',
  questions: [
  {
    max: 0,
    min: 0,
    options: [
      {
        name: 'string',
        score: 0,
      },
    ],
    question: 'string',
    required: true,
    type: 'question_default',
  },
],
  rated_user: {
  id: 'string',
    name: 'string',
},
  score_optional: 0,
  score_required: 0,
  updated_at: 'string',
  updated_by: {
  id: 'string',
    name: 'string',
},
    },
    result: {
      id: '37',
      created_at: '1682510684602',
      created_by: {
        id: '9678',
        name: 'ye.pohranichna'
      },
      updated_at: '1682510684602',
      updated_by: {
        id: '9678',
        name: 'ye.pohranichna'
      },
      form: {
        id: '48',
        name: 'LeraLera11ww'
      },
      questions: [
        {
          type: 'question_score',
          question: 'Titlefggfgdsgdsgsgsg',
          min: 1,
          max: 4,
        },
        {
          type: 'question_option',
          question: 'Title',
          options: [
            {
              name: 'sssbbb',
              score: 100,
            },
          ],
        },
        {
          type: 'question_option',
          question: 'Title',
          options: [
            {
              name: 'sssbbb',
              score: 10,
            },
          ],
        },
        {
          type: 'question_score',
          question: 'Titlefggfgdsgdsgsgsg',
          min: 1,
          max: 4,
        },
      ],
      answers: [
        {
          score: 4,
        },
        {
          score: 10,
        },
        {
          score: 100,
        },
        {
          score: 2,
        },
      ],
      score_optional: 100,
      comment: '0',
      rated_user: {
        id: '10',
        name: 'igor igor igor igor igor igor'
      }
    },
  }),
  computed: {
    scorecardInfo() {
      return [
        { title: 'Rated by', value: this.result.created_by.name },
        { title: 'Agent', value: this.result.rated_user.name },
        { title: 'Date', value: this.result.created_at },
        { title: 'Scorecard', value: this.result.form.name },
      ];
    }
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
    display: flex;
    padding: var(--spacing-xs) 0;
    justify-content: space-between;
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
