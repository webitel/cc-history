<template>
  <div
    class="call-evaluation-score"
    :class="{'call-evaluation-score--active': color === 'active'}"
  >
    <div class="call-evaluation-score__icon">
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
    <span v-if="title" class="call-evaluation-score__title">
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
      default: 'default',
      options: ['default', 'active'],
    },
    title: {
      type: String,
    }
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-score {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    position: relative;
    width: 80px;
    height: 80px;

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

  &__title {
    @extend %typo-subtitle-1;
    color: var(--contrast-color);
  }
}

.call-evaluation-score--active {
  .call-evaluation-score__icon {
    &--default {
      display: none;
    }
    &--active {
      display: block;
    }
  }

  .call-evaluation-score__value {
    color: var(--main-color);
  }
}

</style>
