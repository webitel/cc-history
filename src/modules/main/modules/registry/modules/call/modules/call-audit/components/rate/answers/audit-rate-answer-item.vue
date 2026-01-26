<template>
  <li class="audit-rate-answer-item">
    <h4
      class="audit-rate-answer-item-question-text typo-subtitle-1"
      :class="{'audit-rate-answer-item-question-text--required': question.required }"
    >
      {{ question.question }} <!-- lol -->
    </h4>

    <div
      v-if="answer.score >= 0 /* coz be null, if not answered */"
      class="audit-rate-answer-item-answer"
    >
      <p class="audit-rate-answer-item-answer__name typo-body-1">
        {{ answerName }}
      </p>

      <div class="audit-rate-answer-item-answer__score">
        <wt-icon
          color="primary"
          icon="star--filled"
          size="md"
        />
        <wt-chip>
          {{ answer.score }}
        </wt-chip>
      </div>
    </div>

    <audit-form-answer-editing-info
      v-if="answer.updatedAt"
      :answer="answer"
      collapsible
    />
  </li>
</template>

<script setup lang="ts">
import AuditFormAnswerEditingInfo from "@webitel/ui-sdk/modules/AuditForm/components/form-answers/answer-editing-info/audit-form-answer-editing-info.vue";
import { computed } from "vue";
import { EngineQuestion, EngineQuestionAnswer } from "webitel-sdk";

const props = defineProps<{
	question: EngineQuestion;
	answer: EngineQuestionAnswer;
}>();

const answerName = computed(() => {
	const answeredOption = props.question.options?.find(
		({ score }) => score === props.answer.score,
	);
	return answeredOption?.name || "";
});
</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.audit-rate-answer-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid var(--secondary-color);
}

.audit-rate-answer-item-question-text {
  overflow-wrap: anywhere; // break words in text with no spaces, but preserve words if text has spaces
  padding: var(--spacing-2xs) 0 var(--spacing-3xs);

  &--required::after {
    content: '*';
    color: var(--error-color);
  }
}

.audit-rate-answer-item-answer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2xs) 0;

  &__name {
    padding-right: var(--spacing-2xs);
  }

  &__score {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-2xs);
  }
}
</style>
