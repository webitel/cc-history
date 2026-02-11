<template>
  <section class="audit-rate-result">
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isConfirmationPopup"
      @close="closeDelete"
    />

    <audit-rate-summary
      :rate="rate"
      @rate:edit="emit('rate:edit')"
      @rate:delete="askDeleteConfirmation({ callback: () => emit('rate:delete') })"
    />

    <audit-rate-answers
      :rate="rate"
    />
  </section>
</template>

<script lang="ts" setup>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { EngineAuditRate } from 'webitel-sdk';

import AuditRateAnswers from './answers/audit-rate-answers.vue';
import AuditRateSummary from './summary/audit-rate-summary.vue';

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
</style>
