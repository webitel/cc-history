<template>
  <div class="wt-table-variable-column-select">
    <wt-tooltip>
      <template #activator>
        <wt-icon-btn
          icon="variable-select"
          @click="openPopup"
        />
      </template>
      Display the variable column
    </wt-tooltip>
    <wt-popup
      v-if="isVariableColumnPopup"
      class="variable-column-popup"
      width="480"
      @close="close"
    >
      <template v-slot:title>
        Display the variable column
      </template>
      <template v-slot:main>
        <div class="variable-column-popup__form">
          <wt-input
            v-model="variableKey"
            :label="'Key'"
            :v="v$.variableKey"
            style="flex: 1"
          ></wt-input>
          <wt-button
            :disabled="v$.$error"
            @click="addVariableColumn"
          >
            Display
          </wt-button>
        </div>

        <ul class="variable-column-popup__list">
          <li v-for="key in keysDataList" :key="key" class="variable-column-popup__item">
            <wt-checkbox
              v-model="key.show"
              :label="key.value"
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
//TODO: add to webitel-ui-sdk and remove from cc-history
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';

const isVariableColumnPopup = ref(false);

const keysDataList = reactive([]);

const variableKey = ref('');

const isLoading = ref(false);

const v$ = useVuelidate({
  variableKey: { required },
}, { variableKey }, { $autoDirty: false });

function openPopup() {
  isVariableColumnPopup.value = true;
}

function close() {
  isVariableColumnPopup.value = false;
}

function deleteKey(keyToDelete) {
  const index = keysDataList.findIndex((key) => key === keyToDelete);
  if (index !== -1) {
    keysDataList.splice(index, 1);
  }
}

function addVariableColumn() {
  const variableColumn = {
    value: variableKey.value,
    show: true,
    sort: null,
    field: variableKey.value,
  };

  if (variableKey.value) {
    keysDataList.unshift(variableColumn);
  }
  variableKey.value = '';
}
function showLocalStorageContent() {
  const keysDataListFromLocalStorage = JSON.parse(localStorage.getItem('keysDataList'));
  if (keysDataListFromLocalStorage) {
    keysDataList.push(...keysDataListFromLocalStorage);
  }
}


async function save() {
  isLoading.value = true;
  try {
    localStorage.setItem('keysDataList', JSON.stringify([...new Set(keysDataList)]));
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
.wt-table-variable-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}

.variable-column-popup {
  &__form {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
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
