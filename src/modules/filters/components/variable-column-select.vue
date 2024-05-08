<template>
  <div class="table-variable-column-select">
    <wt-tooltip>
      <template #activator>
        <wt-icon-btn
          icon="variable-select"
          @click="openPopup"
        />
      </template>
      {{ $t('variableColumnSelect.title') }}
    </wt-tooltip>
    <wt-popup
      v-if="isVariableColumnPopup"
      class="variable-column-popup"
      width="480"
      @close="close"
    >
      <template v-slot:title>
        {{ $t('variableColumnSelect.title') }}
      </template>
      <template v-slot:main>
        <div class="variable-column-popup__form">
          <wt-input
            :label="$tc('vocabulary.keys', 1)"
            :v="v$.newVariableKey"
            :value="newVariableKey"
            class="variable-column-popup__input"
            @input="inputNewVariableKey"
          ></wt-input>
          <wt-button
            :disabled="v$.$error"
            @click="addVariableColumn"
          >
            {{ $t('reusable.display') }}
          </wt-button>
        </div>

        <ul class="variable-column-popup__list">
          <li v-for="key in draft" :key="key" class="variable-column-popup__item">
            <wt-checkbox
              v-model="key.show"
              :label="key.label"
              @change="key.show = $event"
            ></wt-checkbox>
            <wt-icon-btn
              icon="bucket"
              @click="deleteKey(key)"
            ></wt-icon-btn>
          </li>
        </ul>

      </template>
      <template v-slot:actions>
        <wt-button
          :loading="isLoading"
          @click="save"
        >{{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >{{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import deepCopy from 'deep-copy';
import deepEqual from 'deep-equal';
import { computed, onMounted, reactive, ref, watch } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
  }
});

const emit = defineEmits(['add-variables-headers']);

const isVariableColumnPopup = ref(false);
const variablesKeysList = reactive([]);
const draft = reactive([]);
const newVariableKey = ref('');
const isLoading = ref(false);

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

function clearVariablesKeysList(list) {
  variablesKeysList.splice(0, variablesKeysList.length, ...list);
}

function clearDraft(list) {
  draft.splice(0, draft.length, ...list);
}

function setHeadersInLocalStorage(list) {
  localStorage.setItem('variablesKeysList', JSON.stringify([...new Set(list)]));
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

  if (isChangedVariables) setHeadersInLocalStorage(newValue);

  if (localStorageHeaders) {
    // NOTE: needed to firstly clear the array and then push new values avoiding duplicates
    clearVariablesKeysList(newValue);
    clearDraft(newValue);
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
    clearVariablesKeysList(deepCopy(draft))
    setHeadersInLocalStorage(variablesKeysList)
    emit('add-variables-headers', variablesKeysList);
  } finally {
    isLoading.value = false;
  }
  close();
}

onMounted(() => {
  v$.value.$touch();
  showLocalStorageVariablesKeys();
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
