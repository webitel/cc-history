<template>
  <div class="use-preset-action">
    <wt-icon-btn
      icon="load-preset"
      @click="showPresetsList = true"
    />
    <wt-popup
      :shown="showPresetsList"
      size="sm"
      @close="showPresetsList = false"
    >
      <template #title>
        {{ t('reusable.load') }}
      </template>

      <template #main>
        <section class="available-presets-list">
          <preset-preview
            v-for="(preset, index) of dataList"
            :preset="preset"
            :key="preset.id"
            :collapsed="!!index"
            :is-selected="preset === selectedPreset"
            @preset:select="selectedPreset = preset"
            @preset:update="updatePreset"
            @preset:delete="() => deleteEls([preset])"
          />
        </section>

        <wt-intersection-observer
          :loading="isLoading"
          :next="false"
          @next="updatePage(page + 1)"
        />
      </template>

      <template #actions>
        <wt-button
          :disabled="!selectedPreset"
          @click="useSelectedPreset"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="showPresetsList = false"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup lang="ts">
import {WtIconBtn, WtPopup, WtButton, WtIntersectionObserver } from "@webitel/ui-sdk/components";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import PresetQueryAPI from '../api/PresetQuery.api.ts';
import {useFiltersPresetStore} from "../stores/useFiltersPresetStore.ts";
import PresetPreview from "./preset-preview.vue";

const emit = defineEmits<{
  // use: [preset: Preset], // TODO
}>();

const {t} = useI18n();

const showPresetsList = ref(false);

const presetsStore = useFiltersPresetStore();
const {
  dataList,
  next,
  isLoading,
  page,
} = storeToRefs(presetsStore);

const {
  loadDataList,
  updatePage,
  initialize,
  deleteEls,
} = presetsStore;

initialize();

watch(showPresetsList, () => {
  initialize();

  watch(showPresetsList, (value) => {
    if (value) {
      loadDataList();
    }
  });
}, { once: true });

const selectedPreset = ref();

const useSelectedPreset = () => {};

const updatePreset = async ({ preset, onSuccess, onFailure }) => {
  try {
    await PresetQueryAPI.update({ item: preset, id: preset.id });
    onSuccess();
    return loadDataList();
  } catch (err) {
    onFailure(err);
    throw err;
  }
};

showPresetsList.value = true;
</script>

<style scoped lang="scss">
.available-presets-list {
  @extend %wt-scrollbar;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-height: 400px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
</style>
