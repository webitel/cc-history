<template>
  <section class="opened-call-info">
    <article class="call-info__wrapper">
      <h2 class="call-info-heading">{{ $t('registry.openedCall.callInfo') }}</h2>
      <ul class="call-variables" v-if="mainCall.variables">
        <li
          class="call-variable"
          v-for="(variable, key) of variables"
          :key="key"
        >
          <h3 class="call-variable__key">{{ variable.key }}:</h3>
          <span class="call-variable__value">{{ variable.value }}</span>
        </li>
      </ul>
      <div v-else class="call-variables__empty-variables">
        {{ $t('registry.openedCall.noVariables') }}
      </div>
    </article>
    <article v-if="mainCall.agentDescription" class="call-info__wrapper">
      <h2 class="call-info-heading">{{ $t('registry.openedCall.agentDescription') }}</h2>
      <div class="call-agent-description">{{ mainCall.agentDescription }}</div>
    </article>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'opened-call-info',
  components: {},
  mixins: [],

  computed: {
    ...mapState('registry/opened-call', {
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
.opened-call-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.call-info-heading {
  @extend %typo-strong-md;
  margin-bottom: 30px;
}

.call-variable {
  display: flex;
  align-items: center;

  &__key {
    @extend %typo-strong-md;
  }

  &__value {
    @extend %typo-body-md;
    margin-left: (5px);
  }
}

.call-variables__empty-variables {
  @extend %typo-body-md;
}

.call-agent-description {
  @extend %typo-body-md;
}
</style>
