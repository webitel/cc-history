<template>
  <div class="load-preset-action">
    <wt-icon-btn
      icon="load-preset"
      @click="showPresetsList = true"
    />
    <wt-popup
      :shown="showPresetsList"
      @close="showPresetsList = false"
    >
      <template #title>
        {{ t('reusable.load') }}
      </template>

      <template #body>
        {{ dataList }}

        <wt-intersection-observer
          :loading="isLoading"
          :next="false"
          @next="updatePage(page + 1)"
        />
      </template>

      <template #actions>
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
import {useFiltersPresetStore} from "../stores/useFiltersPresetStore.ts";
import {storeToRefs} from "pinia";

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
} = presetsStore;

watch(showPresetsList, (value) => {
  if (value) {
    loadDataList();
  }
});
</script>

<style scoped lang="scss">

</style>
