<template>
  <section class="call-evaluation-scores">
    <div
      v-for="({ title, value, color }, index) in scores"
      :key="index"
      class="call-evaluation-score"
    >
      <wt-icon
        icon="star--filled"
        size="3xl"
        :color="color"
      />
      <span class="call-evaluation-score__value typo-subtitle-1">
      {{ value.toFixed(2) }}
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
}>();

const { t } = useI18n();

const scores = computed(() => {
	const scores = [];
	if (props.scoreRequired != null) {
		scores.push({
			title: t('registry.call.evaluation.mandatory'),
			value: props.scoreRequired,
			color: 'success',
		});
	}

	if (props.scoreOptional != null) {
		scores.push({
			title: t('registry.call.evaluation.optional'),
			value: props.scoreOptional,
			color: 'disabled',
		});
	}

	return scores;
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
