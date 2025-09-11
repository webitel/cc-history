<template>
  <section class="call-info">
    <wt-expansion-panel
      v-if="call.variables"
      class="call-info__wrapper"
    >
      <template #title>
        {{ $t('vocabulary.variables', 2) }}
      </template>
      <template>
        <ul>
          <li
            v-for="(variable, key) of variables"
            :key="key"
            class="call-info__item"
          >
            <h3 class="call-info__title">
              {{ variable.key }}:
            </h3>
            <span class="call-info__value">{{ variable.value }}</span>
          </li>
        </ul>
      </template>
    </wt-expansion-panel>
    <wt-expansion-panel
      v-if="isDisplayAmdLogs"
      class="call-info__wrapper"
    >
      <template #title>
        {{ $t('fields.amd') }}
      </template>
      <template>
        <div class="call-info__item">
          <h3 class="call-info__title">
            {{ $t('fields.amdResult') }}:
          </h3>
          <span>{{ call.amdResult }}</span>
        </div>
        <div
          v-if="amdLogs"
          class="call-info__item"
        >
          <h3 class="call-info__title">
            {{ $t('reusable.logs', 2) }}:
          </h3>
          <span>{{ amdLogs }}</span>
        </div>
      </template>
    </wt-expansion-panel>

    <wt-expansion-panel
      v-if="formFields.length"
      class="call-info__wrapper"
    >
      <template #title>
        {{ $t('fields.postProcessing') }}
      </template>
      <template>
        <ul>
          <li
            v-for="({ agent, variables }, idx) of formFields"
            :key="idx"
            class="call-info__item"
          >
            <div v-if="agent" class="call-info__title">
              <wt-icon icon="agent"></wt-icon>
              {{ agent.name }}
            </div>

            <ul>
              <li
                v-for="(variable, key) of variables"
                :key="key"
              >
                <wt-divider v-if="key"></wt-divider>

                <div class="call-info__inner">
                  <h3 class="call-info__title">
                    {{ variable.key }}:
                  </h3>
                  <span class="call-info__value">{{ variable.value }}</span>
                </div>

              </li>
            </ul>
          </li>
        </ul>
      </template>
    </wt-expansion-panel>

    <div v-if="emptyValue">
      {{ $t('registry.call.noInfo') }}
    </div>
  </section>
</template>

<script>
import { isEmpty } from '@webitel/ui-sdk/scripts';

export default {
  name: 'CallInfo',
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
      const postProcessingData = [];
      if (this.call.forms) {
        this.call.forms.map((form) => {
          if (!isEmpty(form.form_fields)) {
            const variables = [];

            Object.keys(form.form_fields).forEach((key) => {
              /*
              * @Lera24
              * convert this.call.forms from backend (examples key1: value1) to the form of
              * {key: key1, value: value1} for convenient drawing in the layout
              * */
              const transformedObj = { key, value: form.form_fields[key] };
              /*
              * https://my.webitel.com/browse/WTEL-3665
              * For fields of type 'filesOutcome' and 'filesIncome' get full data about files.
              * Need display only names separated by commas
              * */
              if (key === 'filesOutcome' || key === 'filesIncome') {
                const filenames = JSON.parse(form.form_fields[key]).map((item) => item.name);
                transformedObj.value = filenames.join(', ');
              }
              variables.push(transformedObj);
            });

            postProcessingData.push({
              variables,
              agent: form.agent,
            });
          }
        });
      }
      if (this.agentDescription) {
          postProcessingData.unshift({ variables: [this.agentDescription] });
      }
      return postProcessingData;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.call-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__wrapper {
    padding: var(--spacing-sm);
    border: 1px dashed var(--secondary-color);
    border-radius: var(--spacing-2xs);
  }

  &__item,
  &__inner {
    padding: var(--spacing-xs);
  }

  &__title {
    @extend %typo-subtitle-1;
    padding: var(--spacing-xs);
    display: inline;
  }

  &__value {
    word-break: break-word;
  }

  @media (min-width: $viewport-sm) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
