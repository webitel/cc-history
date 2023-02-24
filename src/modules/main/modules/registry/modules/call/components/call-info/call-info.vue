<template>
  <section class="call-info">
    <ul
      v-if="call.variables"
      class="call-info__wrapper"
    >
      <li
        v-for="(variable, key) of variables"
        :key="key"
        class="call-info__item"
      >
        <h3 class="call-info__title">{{ variable.key }}:</h3>
        <span class="call-info__value">{{ variable.value }}</span>
      </li>
    </ul>
    <div
      v-if="isDisplayAmdLogs"
      class="call-info__wrapper"
    >
      <div class="call-info__item">
        <h3 class="call-info__title">{{ $t('fields.amdResult') }}:</h3>
        <span class="call-info__value">{{ call.amdResult }}</span>
      </div>
      <div class="call-info__item">
        <h3 class="call-info__title">{{ $tc('reusable.logs', 2) }}:</h3>
        <span class="call-info__value">{{ amdLogs }}</span>
      </div>

    </div>
    <div v-if="emptyValue">
      {{ $t('registry.call.noInfo') }}
    </div>
    <div
      v-if="call.agentDescription"
      class="call-info__item"
    >
      <h3 class="call-info__title">{{ $t('registry.call.agentDescription') }}:</h3>
      <span class="call-info__value">{{ call.agentDescription }}</span>
    </div>
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
    amdLogs() {
      return this.call.amdAiLogs.join(', ');
    },
    emptyValue() {
      return !this.call.variables && (!this.call.amdResult || this.call.amdResult === 'undefined');
    },
    isDisplayAmdLogs() {
      return this.call.amdResult && this.call.amdResult !== 'undefined';
    },
  },
};
</script>

<style lang="scss" scoped>
.call-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);

  &__wrapper {
    padding: var(--spacing-sm);
    border: 1px dashed var(--secondary-color);
    border-radius: var(--spacing-2xs);
  }

  &__item {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__title {
    @extend %typo-subtitle-1;
    margin-right: var(--spacing-xs);
  }

  &__value {
    word-break: break-all;
  }
}
</style>
