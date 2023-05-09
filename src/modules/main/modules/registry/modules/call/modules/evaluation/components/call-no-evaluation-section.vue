<template>
  <article class="call-no-evaluation">
    <div class="call-no-evaluation__wrapper">
      <wt-icon icon="scorecard" size="3xl"/>
      <p class="call-no-evaluation__text">
        {{ $t('registry.call.evaluation.noEvaluation') }}
      </p>
      <wt-button
        class="call-no-evaluation__button"
        @click="$emit('rate')"
      >
        {{ $t('registry.call.evaluation.rateTheCall') }}
      </wt-button>
    </div>
  </article>
</template>

<script>

export default {
  name: 'call-no-evaluation',
  props: {
    call: {
      type: Object,
    },
    namespace: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.call-no-evaluation {
  margin-top: var(--spacing-sm);
  border: 1px dashed var(--secondary-color);
  border-radius: var(--border-radius);

  &__wrapper {
    padding: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__text {
    text-align: center;
  }
}

</style>
