<template>
  <div class="save-preset-action">
    <wt-icon-btn
      :disabled="disableAction"
      icon="save"
      @click="showSaveForm = true"
    />
    <wt-popup
      :shown="showSaveForm"
      size="sm"
      @close="showSaveForm = false"
    >
      <template #title>
        {{ `${t('reusable.save')} ${t('filters.preset.preset').toLowerCase()}` }}
      </template>

      <template #main>
        <form
          class="save-preset-form"
          @submit.prevent="() => !v$.$invalid && savePreset()"
        >
          <preset-name-field
            v-model="presetForm.name"
            :v="v$.name"
          />

          <preset-description-field
            v-model="presetForm.description"
          />
        </form>

        <preset-filters-preview
          :filters="appliedFilters"
        />
      </template>

      <template #actions>
        <wt-button
          :disabled="v$.$invalid"
          :loading="isSaving"
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

import {computed, reactive, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import WtPopup from '@webitel/ui-sdk/src/components/wt-popup/wt-popup.vue';
import WtIconBtn from '@webitel/ui-sdk/src/components/wt-icon-btn/wt-icon-btn.vue';
import {addPreset} from '../api/PresetQuery.api.ts';
import {useRegistryStore as useRegistryTableStore} from '../../../../main/modules/registry/store/new/registry.store.ts';
import PresetNameField from "./input-fields/preset-name-field.vue";
import PresetDescriptionField from "./input-fields/preset-description-field.vue";
import PresetFiltersPreview from "./preset-filters-preview.vue";

const props = defineProps({});

const emit = defineEmits([]);

const {t} = useI18n();

const tableStore = useRegistryTableStore();
const {filtersManager} = storeToRefs(tableStore);

const appliedFilters = computed(() => {
  return filtersManager.value.getFiltersList();
});

const disableAction = computed(() => {
  return !filtersManager.value.getAllKeys().length;
});

const showSaveForm = ref(false);

const getPresetForm = () => ({
  name: '',
  description: '',
});

const presetForm = reactive(getPresetForm());
const isSaving = ref(false);

const v$ = useVuelidate(computed(() => {
  return {
    name: {required},
  };
}), presetForm, {$autoDirty: true});
v$.value.$touch();

const savePreset = async () => {
  isSaving.value = true;

  const preset = {
    ...presetForm,
    preset: {
      'filtersManager.toString': filtersManager.value.toString(),
    },
  };

  try {
    await addPreset(preset);
    Object.assign(preset, getPresetForm());
    isSaving.value = false;
    showSaveForm.value = false;
  } catch (err) {
    isSaving.value = false;
    throw err;
  }
};
</script>

<style lang="scss" scoped>
.save-preset-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.save-preset-filters-preview-wrapper {
  @extend %wt-scrollbar;
  max-height: 140px;
  margin-top: var(--spacing-sm);
  overflow-y: auto;
}
</style>
