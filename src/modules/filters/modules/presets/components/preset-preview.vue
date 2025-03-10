<template>
  <article class="preset-preview">
    <header class="preset-preview-header">
      {{ preset.name }}
      <wt-icon-action
        action="delete"
        @click="emit('delete:preset', preset)"
      />
    </header>
    <section
      class="preset-filters-preview"
    ></section>
  </article>
</template>

<script setup lang="ts">
import { EnginePresetQuery } from "webitel-sdk";
import { createFiltersManager } from "@webitel/ui-sdk/src/modules/Filters/v2/filters/classes/FiltersManager.class.ts";
import {computed} from "vue";

type Props = EnginePresetQuery;

const props = defineProps<Props>();

/*
 * define special variable for preset
 * to prevent logic breaking if props interface has changed
 */
const preset: EnginePresetQuery = props;

const emit = defineEmits<{
  'rename:preset': [string, EnginePresetQuery];
  'delete:preset': [EnginePresetQuery];
}>();

const presetFilters = computed(() => {
  const filtersManager = createFiltersManager();
  filtersManager.fromString(JSON.stringify(preset.preset));

  return filtersManager.getFiltersList();
});
</script>

<style scoped lang="scss">

</style>
