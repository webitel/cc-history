<template>
  <ul class="audit-rate-summary-info">
    <li
      v-for="{ title, value } in auditFormInfo"
      :key="title"
      class="audit-rate-summary-row"
    >
      <h5 class="audit-rate-summary-row__title">
        {{ title }}
      </h5>
      <span class="audit-rate-summary-row__value">
        {{ value }}
      </span>
    </li>

    <li
      v-if="rate.comment"
      class="audit-rate-summary-row audit-rate-summary-row--comment"
    >
      <span class="audit-rate-summary-row__title">
        {{ $t('registry.call.evaluation.comment') }}
      </span>
      <p class="audit-rate-summary-row__value">
        {{ rate.comment }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineAuditRate } from 'webitel-sdk';

const props = defineProps<{
  rate: EngineAuditRate;
}>();

const { t } = useI18n();

const auditFormInfo = computed(() => [
  { title: t('fields.ratedBy'), value: props.rate.createdBy.name },
  { title: t('fields.agent'), value: props.rate.ratedUser?.name },
  {
    title: t('fields.date'),
    value: formatDate(+props.rate.createdAt, 'datetime'),
  },
  {
    title: t('registry.call.evaluation.scorecard'),
    value: props.rate.form.name,
  },
]);
</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.audit-rate-summary-row {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--secondary-color);
  padding: var(--spacing-xs) 0;

  .audit-rate-summary-row__title {
    @extend %typo-subtitle-1;
  }

  .audit-rate-summary-row__value {
    @extend %typo-body-1;
  }

  &--comment {
    flex-direction: column;

    .audit-rate-summary-row__value {
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}
</style>
