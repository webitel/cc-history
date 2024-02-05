<template>
  <article class="call-no-evaluation">
    <div class="call-no-evaluation__wrapper">
      <wt-icon
        icon="scorecard"
        size="3xl"
        color="disabled"
      />
      <p class="call-no-evaluation__text">
        {{ $t('registry.call.evaluation.noEvaluation') }}
      </p>
      <wt-button
        v-if="hasLicenseOnAudit"
        class="call-no-evaluation__button"
        @click="$emit('rate')"
      >
        {{ $t('registry.call.evaluation.rateTheCall') }}
      </wt-button>
    </div>
  </article>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'call-no-evaluation',
  computed: {
    ...mapState('userinfo', {
      scope: (state) => state.scope,
    }),
    hasLicenseOnAudit() {
      return this.scope.some((item) => item.class === 'cc_audit_form');
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  &__text {
    text-align: center;
  }
}

</style>
