<template>
  <section class="call-info">
    <ul v-if="mainCall.variables" class="call-variables">
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
    <article v-if="mainCall.agentDescription" class="call-info__wrapper">
      <h2 class="call-info-heading">{{ $t('registry.call.agentDescription') }}</h2>
      <div class="call-agent-description">{{ mainCall.agentDescription }}</div>
    </article>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'call-info',
  components: {},
  mixins: [],

  computed: {
    ...mapState('registry/call', {
      mainCall: (state) => state.mainCall,
    }),

    variables() {
      return Object.keys(this.mainCall.variables)
      .map((key) => ({ key, value: this.mainCall.variables[key] }));
    },
  },
};
</script>

<style lang="scss" scoped>
.call-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.call-variable {
  display: flex;
  align-items: center;

  &__key {
    @extend %typo-subtitle-1;
    margin-right: var(--spacing-xs);
  }
}
</style>
