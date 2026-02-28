<template>
  <section class="call-evaluation-scores">
    <div
      v-for="({ title, value, icon, color }, index) in scoreWidgets"
      :key="index"
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
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	scoreRequired: number | null;
	scoreOptional: number | null;
	selectYesCount?: string | null;
	criticalCount?: string | null;
}>();

const { t } = useI18n();

const scoreWidgets = computed(() => {
	const widgets: Array<{
		title: string;
		value: string;
		icon: string;
		color: string;
	}> = [];

	if (props.scoreRequired != null) {
		widgets.push({
			title: t('registry.call.evaluation.mandatory'),
			value: props.scoreRequired.toFixed(2),
			icon: 'star--filled',
			color: 'success',
		});
	}

	if (props.scoreOptional != null) {
		widgets.push({
			title: t('registry.call.evaluation.optional'),
			value: props.scoreOptional.toFixed(2),
			icon: 'star--filled',
			color: 'disabled',
		});
	}

	if (props.selectYesCount != null) {
		widgets.push({
			title: t('registry.call.evaluation.selectYes'),
			value: props.selectYesCount,
			icon: 'chat-message-status-sent',
			color: 'success',
		});
	}

	if (props.criticalCount != null) {
		widgets.push({
			title: t('registry.call.evaluation.criticalViolation'),
			value: props.criticalCount,
			icon: 'violation--filled',
			color: 'error',
		});
	}

	return widgets;
});
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
