<template>
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
</template>

<script lang="ts" setup>
import { WtButton } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../../../../app/composables/useUserAccessControl';

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
</script>

<style lang="scss" scoped>
.audit-rate-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
}
</style>
