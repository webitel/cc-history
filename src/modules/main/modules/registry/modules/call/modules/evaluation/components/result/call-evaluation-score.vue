<template>
  <div class="call-evaluation-score">
      <wt-icon
        icon="star--filled"
        size="3xl"
        :color="color"
        class="call-evaluation-score__icon"
      />
    <span class="call-evaluation-score__value">
      {{ value.toFixed(2) }}
    </span>
    <span class="call-evaluation-score__title">
    {{ title }}
  </span>
  </div>
</template>

<script>

export default {
  name: 'call-evaluation-score',
  props: {
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--contrast-color);

  &__value {
    @extend %typo-subtitle-1;
  }

  &__title {
    @extend %typo-body-1;
  }
}

</style>
