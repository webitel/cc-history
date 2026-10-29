<template>
  <div>
    <div class="call-wave-range-edit-bar">
      <span class="call-wave-range-edit-bar__title typo-subtitle-1">
        <wt-icon
          icon="note"
          icon-prefix="hs"
          color="success"
        />
        {{ t('registry.call.wave.changeNoteRange') }}
      </span>
      <div class="call-wave-range-edit-bar__actions">
        <wt-button
          :disabled="!isChanged"
          :loading="isSaving"
          @click="emit('save')"
        >
          {{ t('reusable.save') }}
        </wt-button>
        <wt-button
          color="secondary"
          :disabled="isSaving"
          @click="emit('cancel')"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </div>
    </div>
    <wt-divider />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineOptions({
	name: 'CallWaveRangeEditBar',
});

defineProps<{
	isChanged: boolean;
	isSaving: boolean;
}>();

const emit = defineEmits<{
	(event: 'save'): void;
	(event: 'cancel'): void;
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.call-wave-range-edit-bar {
  display: flex;
  padding-bottom: var(--spacing-xs);
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);

  &__title {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-xs);
  }
}
</style>
