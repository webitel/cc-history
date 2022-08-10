<template>
  <section class="call-info">
    <ul v-if="call.variables" class="call-variables">
      <li
        v-for="(variable, key) of variables"
        :key="key"
        class="call-variable"
      >
        <h3 class="call-variable__key">{{ variable.key }}:</h3>
        <span class="call-variable__value">{{ variable.value }}</span>
      </li>
    </ul>
    <div v-else class="call-variables__empty-variables">
      {{ $t('registry.call.noVariables') }}
    </div>
    <article v-if="call.agentDescription" class="call-info__wrapper">
      <h2 class="call-info-heading">{{ $t('registry.call.agentDescription') }}</h2>
      <div class="call-agent-description">{{ call.agentDescription }}</div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'call-info',
  props: {
    call: {
      type: Object,
      required: true,
    },
  },
  computed: {
    variables() {
      return Object.keys(this.call.variables)
      .map((key) => ({ key, value: this.call.variables[key] }));
    },
  },
};
</script>

<style lang="scss" scoped>
.call-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.call-variables {
  min-width: 0;
}

.call-variable {
  display: flex;
  align-items: center;
  min-width: 0;

  &__key {
    @extend %typo-subtitle-1;
    margin-right: var(--spacing-xs);
  }

  &__value {
    word-break: break-all;
  }
}
</style>
