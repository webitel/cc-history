<template>
  <section class="call-info">
    <wt-expansion-panel
      v-if="call.variables"
      class="call-info__wrapper"
    >
      <template v-slot:title>{{ $tc('vocabulary.variables', 2) }}</template>
      <template>
        <ul>
          <li
            v-for="(variable, key) of variables"
            :key="key"
            class="call-info__item"
          >
            <h3 class="call-info__title">{{ variable.key }}: </h3>
            <span class="call-info__value">{{ variable.value }}</span>
          </li>
        </ul>
      </template>
    </wt-expansion-panel>

    <wt-expansion-panel
      v-if="isDisplayAmdLogs"
      class="call-info__wrapper"
    >
      <template v-slot:title>{{ $t('fields.amd') }}</template>
      <template>
        <div class="call-info__item">
          <h3 class="call-info__title">{{ $t('fields.amdResult') }}: </h3>
          <span>{{ call.amdResult }}</span>
        </div>
        <div class="call-info__item" v-if="amdLogs">
          <h3 class="call-info__title">{{ $tc('reusable.logs', 2) }}: </h3>
          <span>{{ amdLogs }}</span>
        </div>
      </template>
    </wt-expansion-panel>

    <wt-expansion-panel
      v-if="formFields.length"
      class="call-info__wrapper"
    >
      <template v-slot:title>{{ $t('fields.postProcessing') }}</template>
      <template>
        <ul>
          <li
            v-for="(variable, key) of formFields"
            :key="key"
            class="call-info__item"
          >
            <h3 class="call-info__title">{{ variable.key }}: </h3>
            <span>{{ variable.value }}</span>
          </li>
        </ul>
      </template>
    </wt-expansion-panel>

    <div v-if="emptyValue">{{ $t('registry.call.noInfo') }}</div>
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
      return this.call.amdAiLogs && this.call.amdAiLogs.join(', ');
    },
    isDisplayAmdLogs() {
      return this.call.amdResult && this.call.amdResult !== 'undefined';
    },
    emptyValue() {
      return !this.call.variables && !this.isDisplayAmdLogs && !this.formFields.length;
    },
    agentDescription() {
      return this.call.agentDescription && {
        key: this.$t('registry.call.agentDescription'),
        value: this.call.agentDescription,
      };
    },
    formFields() {
      let arrayValues = [];
      if (this.call.formFields) arrayValues = Object.keys(this.call.formFields)
      .map((key) => {
        const transformedObj = { key, value: this.call.formFields[key] };
        /*
        * https://my.webitel.com/browse/WTEL-3665
        * For fields of type 'filesOutcome' and 'filesIncome' get full data about files.
        * Need display only names separated by commas
        * */
        if (key === 'filesOutcome' || key === 'filesIncome') {
          const arrayFilenames = JSON.parse(this.call.formFields[key]).map((item) => item.name);
          transformedObj.value = arrayFilenames.join(', ');
        }
        return transformedObj;
      });
      if (this.agentDescription) arrayValues.unshift(this.agentDescription);
      return arrayValues;
    },
  },
};
</script>

<style lang="scss" scoped>
.call-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__wrapper {
    padding: var(--spacing-sm);
    border: 1px dashed var(--secondary-color);
    border-radius: var(--spacing-2xs);
  }

  &__item {
    display: flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs);

    &:not(:last-child) {
      border-bottom: 1px solid var(--secondary-color);
    }
  }

  &__title {
    @extend %typo-subtitle-1;
    display: inline;
  }

  &__value {
    max-width: 300px;
    word-wrap: break-word;
  }

  @media (min-width: $viewport-sm) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
