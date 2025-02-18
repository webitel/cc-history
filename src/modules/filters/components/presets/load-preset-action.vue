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
import {WtIconBtn, WtPopup, WtButton } from "@webitel/ui-sdk/src/components";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const showPresetsList = ref(false);
</script>

<style scoped lang="scss">

</style>
