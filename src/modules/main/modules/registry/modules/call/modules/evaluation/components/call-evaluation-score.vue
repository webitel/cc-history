<template>
  <div
    class="call-evaluation-score"
    :class="{'call-evaluation-score--active': color === 'active'}"
  >
    <img
      src="../../../../../../../../../app/assets/icons/star--default.svg"
      alt="star-default"
      class="call-evaluation-score__icon--default"
    >
    <img
      src="../../../../../../../../../app/assets/icons/star--active.svg"
      alt="star-active"
      class="call-evaluation-score__icon--active"
    >
    <span class="call-evaluation-score__value">
      {{ Math.round(value) }}
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
      default: 'default',
      options: ['default', 'active'],
    },
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-score {
  position: relative;

  &__icon {
    &--active {
      display: none;
    }
  }

  &__value {
    @extend %typo-subtitle-1;
    position: absolute;
    left: 50%;
    top: 50%;
    color: var(--contrast-color);
    transform: translate(-50%, -50%);
  }
}

.call-evaluation-score--active {
  &__icon {
    &--default {
      display: none;
    }
    &--active {
      display: block;
    }
  }

  &__value {
    color: var(--main-color);
  }
}

</style>
