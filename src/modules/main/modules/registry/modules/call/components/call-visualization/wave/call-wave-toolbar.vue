<template>
  <call-visualization-header class="call-wave-toolbar">
    <template #main>
      <wt-single-select
        class="call-wave-toolbar__file-select"
        :model-value="file"
        :show-clear="false"
        :placeholder="t('vocabulary.file')"
        :options="files"
        data-key="id"
        @update:model-value="emit('update:file', $event)"
      />
      <div
        v-if="!isLoading"
        class="call-wave-toolbar__layers"
      >
        <wt-checkbox
          :label="t('registry.call.hold', 2)"
          :selected="showHolds"
          :value="showHolds"
          @update:selected="emit('toggle-holds')"
        />
        <wt-chip>
          {{ holdsCount }}
        </wt-chip>
        <wt-checkbox
          :label="t('registry.call.comment', 2)"
          :selected="showComments"
          :value="showComments"
          @update:selected="emit('toggle-comments')"
        />
        <wt-chip>
          {{ commentsCount }}
        </wt-chip>
      </div>
    </template>
    <template
      v-if="!isLoading"
      #actions
    >
      <wt-button
        color="secondary"
        :variant="isRangeEditing ? 'active' : 'outlined'"
        icon="note"
        icon-prefix="hs"
        @click="!isRangeEditing && emit('add-note')"
      />
      <wt-button
        color="secondary"
        variant="outlined"
        icon="download-record"
        icon-prefix="hs"
        @click="emit('download')"
      />
    </template>
  </call-visualization-header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CallVisualizationHeader from '../call-visualization-header.vue';

defineOptions({
	name: 'CallWaveToolbar',
});

defineProps<{
	file: unknown;
	files: unknown[];
	isLoading: boolean;
	showHolds: boolean;
	showComments: boolean;
	holdsCount: number;
	commentsCount: number;
	isRangeEditing: boolean;
}>();

const emit = defineEmits<{
	(event: 'update:file', value: unknown): void;
	(event: 'toggle-holds'): void;
	(event: 'toggle-comments'): void;
	(event: 'add-note'): void;
	(event: 'download'): void;
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.call-wave-toolbar {
  margin-bottom: var(--spacing-sm);

  &__file-select {
    width: 280px;
  }

  &__layers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }
}
</style>
