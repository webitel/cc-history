<template>
  <section class="audit-rate-result">
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isConfirmationPopup"
      @close="closeDelete"
    />

    <div class="audit-rate-result__summary">
      <audit-rate-summary :rate="rate" />
      <audit-rate-actions
        @rate:edit="emit('rate:edit')"
        @rate:delete="askDeleteConfirmation({ deleted: [rate], callback: () => emit('rate:delete') })"
      />
    </div>

    <audit-rate-answers :rate="rate" />
  </section>
</template>

<script lang="ts" setup>
import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import {
	AuditRateAnswers,
	AuditRateSummary,
} from '@webitel/ui-sdk/modules/AuditRate';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import AuditRateActions from './audit-rate-actions.vue';

defineProps<{
	rate: EngineAuditRate;
}>();

const emit = defineEmits<{
	'rate:edit': [];
	'rate:delete': [];
}>();

const {
	isVisible: isConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();
</script>

<style lang="scss" scoped>

.audit-rate-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);
}

.audit-rate-result__summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
