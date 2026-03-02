<template>
  <section class="call-evaluation-scores">
    <template v-for="({ title, value, icon, color, display }, index) in scoreWidgets" :key="index">
      <div
        v-if="display != null"
        class="call-evaluation-score"
      >
        <wt-icon
          :icon="icon"
          size="3xl"
          :color="color"
        />
        <span class="call-evaluation-score__value typo-subtitle-1">
          {{ value }}
        </span>
        <span class="call-evaluation-score__title typo-body-1">
          {{ title }}
        </span>
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	scoreRequired: number | null;
	scoreOptional: number | null;
	selectYesDisplay?: string | null;
	criticalDisplay?: string | null;
}>();

const { t } = useI18n();

type ScoreWidget = {
	title: string;
	value: string;
	icon: string;
	color: string;
	display: number | string | null | undefined;
};

const scoreWidgets = computed<ScoreWidget[]>(() => [
	{
		title: t('registry.call.evaluation.mandatory'),
		value: props.scoreRequired?.toFixed(2) ?? '',
		icon: 'star--filled',
		color: 'success',
		display: props.scoreRequired,
	},
	{
		title: t('registry.call.evaluation.optional'),
		value: props.scoreOptional?.toFixed(2) ?? '',
		icon: 'star--filled',
		color: 'disabled',
		display: props.scoreOptional,
	},
	{
		title: t('registry.call.evaluation.selectYes'),
		value: props.selectYesDisplay ?? '',
		icon: 'chat-message-status-sent',
		color: 'success',
		display: props.selectYesDisplay,
	},
	{
		title: t('registry.call.evaluation.criticalViolation'),
		value: props.criticalDisplay ?? '',
		icon: 'violation--filled',
		color: 'error',
		display: props.criticalDisplay,
	},
]);
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.call-evaluation-scores {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.call-evaluation-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-main-color);

  &__value {
  }

  &__title {
  }
}

</style>
