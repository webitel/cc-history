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
            v-model="variableKey"
            :label="$tc('vocabulary.keys', 1)"
            :v="v$.variableKey"
            class="variable-column-popup__input"
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
import { onMounted, reactive, ref, watch } from 'vue';

const emit = defineEmits(['addVariablesHeaders']);

const isVariableColumnPopup = ref(false);
const variablesKeysList = reactive([]);
const draft = reactive([]);
const variableKey = ref('');
const isLoading = ref(false);

const v$ = useVuelidate({ variableKey: { required } }, { variableKey }, { $autoDirty: false });

function openPopup() {
  isVariableColumnPopup.value = true;
}

function close() {
  isVariableColumnPopup.value = false;
}

const deleteKey = (keyToDelete) => {
  draft.splice(draft.indexOf(keyToDelete), 1);
};

function addVariableColumn() {
  const variableKeyText = variableKey.value.replace(/^fields\.variables\./, '');
  const variableColumn = {
    value: `variables.${variableKey.value}`,
    show: true,
    field: `variables.${variableKey.value}`,
    label: variableKeyText,
  };

  // NOTE: checking if the variable column is already in the list and if the key is not empty
  if (!draft.some((key) => key.value === variableColumn.value) && variableKey.value) {
    draft.unshift(variableColumn);
  }
  variableKey.value = '';
}

function showLocalStorageContent() {
  const localStorageHeaders = JSON.parse(localStorage.getItem('variablesKeysList'));
  if (localStorageHeaders) {
    // NOTE: needed to firstly clear the array and then push new values avoiding duplicates
    variablesKeysList.splice(0, variablesKeysList.length, ...localStorageHeaders);
    draft.splice(0, draft.length, ...localStorageHeaders);
  }
}

watch(isVariableColumnPopup, () => {
  // NOTE: refreshing the list every time the popup is opened
  if (isVariableColumnPopup.value) {
    showLocalStorageContent();
  }
});

async function save() {
  isLoading.value = true;
  try {
    variablesKeysList.splice(0, variablesKeysList.length, ...deepCopy(draft));
    localStorage.setItem('variablesKeysList', JSON.stringify([...new Set(variablesKeysList)]));
    emit('addVariablesHeaders', variablesKeysList);
  } finally {
    isLoading.value = false;
  }
  close();
}

onMounted(() => {
  v$.value.$touch();
  showLocalStorageContent();
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
    gap: 8px;
  }

  &__input {
    flex: 1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    gap: 16px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
