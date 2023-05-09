<template>
  <div class="scorecard-info">
    <div
      v-for="item in value"
      :key="item.title"
      class="scorecard-info-item"
    >
      <span class="scorecard-info-item__title">
        {{ item.title }}
      </span>
      <span class="scorecard-info-item__value">
        {{ item.value }}
      </span>
    </div>
    <div
      v-if="comment"
      class="scorecard-info-comment"
    >
      <span class="scorecard-info-comment__title">
        {{ $t('registry.call.evaluation.comment') }}
      </span>
      <span class="scorecard-info-comment__text">
        {{ comment }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'scorecard-info',
  props: {
    value: {
      type: Array,
      required: true,
    },
    comment: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>

.scorecard-info-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-sm);

    &__title {
      @extend %typo-subtitle-1;
    }

    &__value {
      @extend %typo-body-1;
    }
  }

  .scorecard-info-comment {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-xxs);
  }

</style>
