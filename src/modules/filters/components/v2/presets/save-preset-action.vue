<template>
  <div class="save-preset-action">
    <wt-icon-btn
      :disabled="disableAction"
      icon="save"
      @click="showSaveForm = true"
    />
    <wt-popup
      :shown="showSaveForm"
      @close="showSaveForm = false"
    >
      <template #title>
        {{ t('') + 'upd me' }}
      </template>

      <template #main>
        <wt-input
          v-model="presetName"
          :v="v$.presetName"
          required
        />
      </template>

      <template #actions>
        <wt-button
          :disabled="v$.$invalid"
          @click="savePreset"
        >
          {{ t('reusable.save') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="showSaveForm = false"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script lang="ts" setup>

import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import WtPopup from '@webitel/ui-sdk/src/components/wt-popup/wt-popup.vue';
import WtIconBtn from '@webitel/ui-sdk/src/components/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '@webitel/ui-sdk/src/components/wt-input/wt-input.vue';
import {addPreset} from '../../../api/PresetQuery.api.ts';
import {useRegistryStore as useRegistryTableStore} from '../../../../main/modules/registry/store/new/registry.store.ts';
import {storeToRefs} from 'pinia';

const props = defineProps({});

const emit = defineEmits([]);

const {t} = useI18n();

const tableStore = useRegistryTableStore();
const {filtersManager} = storeToRefs(tableStore);

const disableAction = computed(() => {
  return !filtersManager.value.getAllKeys().length;
});

const showSaveForm = ref(false);
const presetName = ref('');
const isSaving = ref(false);

const v$ = useVuelidate(computed(() => {
  return {
    presetName: {required},
  };
}), {presetName}, {$autoDirty: true});

const savePreset = async () => {
  isSaving.value = true;

  const preset = {
    name: presetName.value,
    preset: filtersManager.value.toString(),
  };

  try {
    await addPreset(preset);
  } finally {
    isSaving.value = false;
  }
};
</script>

<style lang="scss" scoped>
.save-preset-action {
}
</style>
