<template>
  <div class="table-variable-column-select">
    <wt-popup
      v-bind="attrs"
      class="variable-column-popup"
      width="480"
      @close="close"
    >
      <template #title>
        {{ $t('variableColumnSelect.title') }}
      </template>
      <template #main>
        <div class="variable-column-popup__form">
          <wt-input
            :label="$tc('vocabulary.keys', 1)"
            :v="v$.newVariableKey"
            :value="newVariableKey"
            class="variable-column-popup__input"
            @input="inputNewVariableKey"
          />
          <wt-button
            :disabled="v$.$error"
            @click="addVariableColumn"
          >
            {{ $t('reusable.display') }}
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
              :label="key.label"
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
          {{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import deepEqual from 'deep-equal';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAttrs } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
  }
});

const emit = defineEmits(['add-variables-headers']);

const isVariableColumnPopup = ref(false);
const draft = reactive([]);
const newVariableKey = ref('');
const isLoading = ref(false);

const t = useI18n();
const attrs = useAttrs();

const variablesFromHeaders = computed(() => props.headers.filter((header) => header.field.includes('variables.')))

const v$ = useVuelidate(
  { newVariableKey: { required } },
  { newVariableKey },
  { $autoDirty: false },
);

function openPopup() {
  isVariableColumnPopup.value = true;
}

function close() {
  isVariableColumnPopup.value = false;
}

const deleteKey = (keyToDelete) => {
  draft.splice(draft.indexOf(keyToDelete), 1);
};

const inputNewVariableKey = (e) => {
  newVariableKey.value = e;
};

function updateDraft(list) {
  // NOTE: needed to firstly clear the array and then push new values avoiding duplicates
  draft.splice(0, draft.length, ...list);
}

function setToLocalStorage(list) {
  const storedValue = JSON.stringify([...new Set(list)]);
  localStorage.setItem('variablesKeysList', storedValue);
}

function addVariableColumn() {
  const variableKeyText = newVariableKey.value.replace(/^fields\.variables\./, '');
  const variableColumn = {
    value: `variables.${newVariableKey.value}`,
    show: true,
    field: `variables.${newVariableKey.value}`,
    label: variableKeyText,
  };

  // NOTE: checking if the variable column is already in the list and if the key is not empty
  if (!draft.some((key) => key.value === variableColumn.value) && newVariableKey.value) {
    draft.unshift(variableColumn);
  }

  newVariableKey.value = '';
}

function showLocalStorageVariablesKeys() {
  const localStorageHeaders = JSON.parse(localStorage.getItem('variablesKeysList'));
  const isChangedVariables = !deepEqual(localStorageHeaders, variablesFromHeaders.value);
  const newValue = isChangedVariables ? variablesFromHeaders.value : localStorageHeaders;

  if (isChangedVariables) setToLocalStorage(newValue);

  if (localStorageHeaders) {
    updateDraft(newValue);
  }
}

watch(isVariableColumnPopup, () => {
  // NOTE: refreshing the list every time the popup is opened
  if (isVariableColumnPopup.value) {
    showLocalStorageVariablesKeys();
  }
});

async function save() {
  isLoading.value = true;
  try {
    setToLocalStorage(draft);
    emit('add-variables-headers', draft);
  } finally {
    isLoading.value = false;
  }
  close();
}

onMounted(() => {
  v$.value.$touch();
  showLocalStorageVariablesKeys();
  isVariableColumnPopup.value = true;
});
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
