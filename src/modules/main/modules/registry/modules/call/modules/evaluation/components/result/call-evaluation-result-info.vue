<template>
  <div class="call-evaluation-result">
    <div
      v-for="({ title, value }) in info"
      :key="title"
      class="call-evaluation-result-item"
    >
      <span class="call-evaluation-result-item__title">
        {{ title }}
      </span>
      <span class="call-evaluation-result-item__value">
        {{ value }}
      </span>
    </div>
    <div
      v-if="comment"
      class="call-evaluation-result-comment"
    >
      <span class="call-evaluation-result-comment__title">
        {{ $t('registry.call.evaluation.comment') }}
      </span>
      <span class="call-evaluation-result-comment__text">
        {{ comment }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CallEvaluationResultInfo',
  props: {
    info: {
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
@use '@webitel/ui-sdk/src/css/main' as *;

.call-evaluation-result {
  display: flex;
  flex-direction: column;
}

.call-evaluation-result-item {
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

.call-evaluation-result-comment {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--secondary-color);
  gap: var(--spacing-xxs);

  &__title {
    @extend %typo-subtitle-1;
  }

  &__text {
    white-space: pre;
  }
}

</style>
