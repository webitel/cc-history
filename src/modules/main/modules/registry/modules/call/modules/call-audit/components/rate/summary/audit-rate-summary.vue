<template>
  <div class="audit-rate-summary">
    <audit-rate-summary-info
      :rate="rate"
    />

    <audit-rate-summary-scores
      :score-required="rate.scoreRequired"
      :score-optional="rate.scoreOptional"
    />

    <footer class="audit-rate-actions">
      <wt-button
        :disabled="!hasUpdateAccess"
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
import { WtObject } from "@webitel/ui-sdk/enums";
import { useI18n } from 'vue-i18n';
import { EngineAuditRate } from 'webitel-sdk';

import {useUserAccessControl} from "../../../../../../../../../../../app/composables/useUserAccessControl.ts";
import AuditRateSummaryInfo from './audit-rate-summary-info.vue';
import AuditRateSummaryScores from './audit-rate-summary-scores.vue';

defineProps<{
  rate: EngineAuditRate;
}>();

const emit = defineEmits<{
  'rate:edit': [];
  'rate:delete': [];
}>();

const { t } = useI18n();
const {
  hasUpdateAccess,
  hasDeleteAccess,
} = useUserAccessControl(WtObject.AuditRating);
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
