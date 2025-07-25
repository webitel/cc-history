<template>
  <div class="table-variable-column-select">
    <wt-badge
      v-tooltip="t('variableColumnSelect.title')"
      :hidden="!draft.length"
    >
      <wt-icon-btn
        icon="variable-select"
        @click="open"
      />
    </wt-badge>

    <wt-popup
      :shown="shownPopup"
      class="variable-column-popup"
      width="480"
      @close="close"
    >
      <template #title>
        {{ t('variableColumnSelect.title') }}
      </template>
      <template #main>
        <div class="variable-column-popup__form">
          <wt-input
            v-model="newVariableKey"
            :label="t('vocabulary.keys', 1)"
            :v="v$.newVariableKey"
            class="variable-column-popup__input"
          />
          <wt-button
            :disabled="v$.$error"
            @click="addVariableHeader(newVariableKey)"
          >
            {{ t('reusable.add') }}
          </wt-button>
        </div>

        <ul class="variable-column-popup__list">
          <li
            v-for="key in draft"
            :key="key"
            class="variable-column-popup__item"
          >
            <wt-checkbox
              v-model="key.show"
              :label="key.text"
              @change="key.show = $event"
            />
            <wt-icon-btn
              icon="bucket"
              @click="deleteKey(key)"
            />
          </li>
        </ul>
      </template>
      <template #actions>
        <wt-button
          :loading="isLoading"
          @click="save"
        >
          {{ t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script lang="ts" setup>
import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import {WtBadge, WtButton, WtCheckbox,WtIconBtn, WtInput, WtPopup, WtTooltip} from "@webitel/ui-sdk/components";
import { isEmpty } from '@webitel/ui-sdk/scripts';
import {WtTableHeader} from "@webitel/ui-sdk/src/components/wt-table/types/WtTable.d.ts";
import {computed, reactive, ref} from 'vue';
import {useI18n} from "vue-i18n";

/*
do we even need them?

interface Props {
  variableHeaders: WtTableHeader[];
}

const props = defineProps<Props>();
*/

const emit = defineEmits<{
  'update:variable-headers': (value: WtTableHeader[]) => void;
}>();

const {t} = useI18n();

const shownPopup = ref(false);

/* new variable key on input */
const newVariableKey = ref('');

/* new variable-headers list */
const draft = reactive([]);

const isLoading = ref(false);

const variablesFromDraft = computed(() => {
  return draft.map(({value}) => value.replace('variables.', ''))
});

const v$ = useVuelidate(
  computed(() => ({
    newVariableKey: {
      required,
      alreadyExists: (v) => {
        return !variablesFromDraft.value?.some((variable) => variable === v);
      },
    },
  })),
  {newVariableKey},
  {$autoDirty: true},
);
v$.value.$touch();

const open = () => {
  shownPopup.value = true;
};

const close = () => {
  shownPopup.value = false;
};

const deleteKey = (keyToDelete) => {
  draft.splice(draft.indexOf(keyToDelete), 1);
};


const localStorageKey = 'history/registry/variable-headers';
const localStorageSeparator = ';'

const setToLocalStorage = (variableHeaders) => {
  const storedValue = variableHeaders.join(localStorageSeparator);
  if (storedValue) {
    localStorage.setItem(localStorageKey, storedValue);
  } else {
    localStorage.removeItem(localStorageKey);
  }
}

const getFromLocalStorage = () => {
  return localStorage.getItem(localStorageKey)?.split(localStorageSeparator);
}

const addVariableHeader = (variableKey) => {
  const variableHeader = {
    value: `variables.${variableKey}`,
    show: true,
    field: `variables.${variableKey}`,
    text: variableKey,
  };

  draft.unshift(variableHeader);

  /* if input value is the source, clear it after adding do draft */
  if (newVariableKey.value) {
    newVariableKey.value = '';
  }
};

const save = () => {
  isLoading.value = true;
  try {
    setToLocalStorage(variablesFromDraft.value);
    emit('update:variable-headers', draft);
  } finally {
    isLoading.value = false;
  }
  close();
}

const restore = () => {
  const storedValue = getFromLocalStorage();
  if (!isEmpty(storedValue)) {
    storedValue.map((variableKey) => addVariableHeader(variableKey));
    save();
  }
};

restore();
</script>

<style lang="scss" scoped>
.table-variable-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}

.variable-column-popup {
  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--spacing-xs);
  }

  &__input {
    flex: 1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-top: var(--spacing-sm);
    gap: 16px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
