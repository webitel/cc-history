<template>
  <ul class="call-evaluation-answers">
    <li
      v-for="({ questionText, questionRequired, answerScore, answerName, thisAnswer }, index) in composedResultData"
      :key="questionText+index"
      class="call-evaluation-answers-item"
    >
      <div
        class="call-evaluation-answers-item__question"
        :class="{'call-evaluation-answers-item__question--required': questionRequired }"
      >
        {{ questionText }}
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
      <audit-form-answer-editing-info
        v-if="thisAnswer?.updatedAt"
        :answer="thisAnswer"
        collapsible
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import AuditFormAnswerEditingInfo from '@webitel/ui-sdk/src/modules/AuditForm/components/form-answers/answer-editing-info/audit-form-answer-editing-info.vue';
import { computed, defineProps } from 'vue';
import {EngineAuditRate} from "webitel-sdk";

const props = defineProps<{
  result: EngineAuditRate;
}>();

const composedResultData = computed(() =>
  props.result.questions.map((thisQuestion, index) => {
    const thisAnswer = props.result.answers[index];

    const hasQuestionOptions = thisQuestion.options && thisQuestion.options.length > 0;

    const composedQuestionData = {
      questionText: thisQuestion.question,
      questionRequired: thisQuestion.required,
      answerScore: thisAnswer.score,
      thisQuestion,
      thisAnswer,
    };

    if (hasQuestionOptions) {
      const answeredOption = thisQuestion.options.find(({ score }) => score === thisAnswer.score);
      composedQuestionData.answerName = answeredOption?.name || '';
    }

    return composedQuestionData;
  })
);
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
