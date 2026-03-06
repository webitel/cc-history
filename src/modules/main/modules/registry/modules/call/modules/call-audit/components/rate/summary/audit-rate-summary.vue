<template>
  <div class="audit-rate-summary">
    <audit-rate-summary-info
      :rate="rate"
    />

    <audit-rate-summary-scores
      :score-required="rate.scoreRequired"
      :score-optional="rate.scoreOptional"
      :select-yes-display="selectYesDisplay"
      :critical-display="criticalDisplay"
    />

    <footer class="audit-rate-actions">
      <wt-button
        :disabled="!hasEditRateAccess"
        color="secondary"
        @click="emit('rate:edit')"
      >{{ t('reusable.edit') }}
      </wt-button>
      <wt-button
        :disabled="!hasDeleteAccess"
        color="error"
        @click="emit('rate:delete')"
      >{{ t('reusable.delete') }}
      </wt-button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { WtButton } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';

import { useUserAccessControl } from '../../../../../../../../../../../app/composables/useUserAccessControl.ts';
import AuditRateSummaryInfo from './audit-rate-summary-info.vue';
import AuditRateSummaryScores from './audit-rate-summary-scores.vue';

const props = defineProps<{
	rate: EngineAuditRate;
}>();

const emit = defineEmits<{
	'rate:edit': [];
	'rate:delete': [];
}>();

const { t } = useI18n();

const { hasReadAccess: hasScorecardsReadAccess } = useUserAccessControl(
	WtObject.AuditForm,
);

const { hasUpdateAccess, hasDeleteAccess } = useUserAccessControl(
	WtObject.AuditRating,
);

const hasEditRateAccess = computed(() => {
	return hasScorecardsReadAccess.value && hasUpdateAccess.value;
});

function getScoreDisplay(
	questions: EngineAuditRate['questions'],
	answers: EngineAuditRate['answers'],
	includeQuestion: (
		question: NonNullable<EngineAuditRate['questions']>[number],
		index: number,
	) => boolean,
): string | null {
	const normalizedQuestions = questions ?? [];
	const normalizedAnswers = answers ?? [];

	const { total, hits } = normalizedQuestions.reduce(
		(accumulator, question, index) => {
			if (!includeQuestion(question, index)) return accumulator;

			const isHit = normalizedAnswers[index]?.score === 1;

			return {
				total: accumulator.total + 1,
				hits: accumulator.hits + (isHit ? 1 : 0),
			};
		},
		{
			total: 0,
			hits: 0,
		},
	);

	if (total === 0) return null;

	return `${hits}/${total}`;
}

const selectYesDisplay = computed(() =>
	getScoreDisplay(
		props.rate.questions,
		props.rate.answers,
		(question) => question.type === EngineAuditQuestionType.QuestionYes,
	),
);

const criticalDisplay = computed(() =>
	getScoreDisplay(
		props.rate.questions,
		props.rate.answers,
		(question) => question.criticalViolation === true,
	),
);
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.audit-rate-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.audit-rate-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
}

</style>
