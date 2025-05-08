<template>
  <section class="audit-rate-result">
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isConfirmationPopup"
      @close="closeDelete"
    />

    <audit-rate-summary
      :rate="result"
    />
    <audit-rate-answers :result="props.result" />

  </section>
</template>

<script lang="ts" setup>
import { WtButton } from '@webitel/ui-sdk/components';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineAuditRate } from 'webitel-sdk';

import AuditRateAnswers from './answers/audit-rate-answers.vue';
import AuditRateSummary from './summary/audit-rate-summary.vue';
import AuditRateSummaryScores from './summary/audit-rate-summary-scores.vue';

const props = defineProps<{
  result: EngineAuditRate;
}>();

const emit = defineEmits<{
  'result:edit': [];
  'result:delete': [];
}>();

const { t } = useI18n();

const {
  isVisible: isConfirmationPopup,
  deleteCount,
  deleteCallback,
  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const deleteEvaluationResult = () => {
  emit('result:delete');
};
</script>

<style lang="scss" scoped>

.audit-rate-result {
  display: flex;
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);

  &__scorecard-info-rating {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }
}

.audit-rate-summary {
  flex: 1;
}

.call-evaluation-answers {
  flex: 1;
}

</style>
