<template>
  <div class="scorecard-info">
    <div
      v-for="item in value"
      class="scorecard-info__item"
    >
      <span class="scorecard-info__item-title">
        {{ item.title }}
      </span>
      <span class="scorecard-info__item-value">
        {{ item.value }}
      </span>
    </div>
    <div
      v-if="comment"
      class="scorecard-info__comment"
    >
      <span class="scorecard-info__comment-title">
        Comment
      </span>
      <span class="scorecard-info__comment-text">
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

.scorecard-info {
  &__item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-sm);

    &-title {
      @extend %typo-subtitle-1;
    }

    &-value {
      @extend %typo-body-1;
    }
  }

  &__comment {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--secondary-color);
    gap: var(--spacing-xxs);
  }
}

</style>
