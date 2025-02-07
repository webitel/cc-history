<template>
  <wt-search-bar
    :placeholder="$t('reusable.search')"
    :search-mode="searchMode"
    :search-mode-options="searchModeOptions"
    :value="localValue"
    :v="v$"
    @input="localValue = $event"
    @search="handleSearch"
    @update:search-mode="searchMode = $event.value"
  >
    <template
      v-if="showTextSearchIcon"
      #search-icon
    >
      <wt-icon icon="stt-search" />
    </template>
  </wt-search-bar>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ref, watch, WatchHandle } from 'vue';
import WtSearchBar from '@webitel/ui-sdk/src/components/wt-search-bar/wt-search-bar.vue';
import { useI18n } from 'vue-i18n';

import { useTableStore } from '../../../../main/modules/registry/store/new/registry.store.ts';
import { SearchMode } from '../../../../heading/modules/filters/enums/SearchMode.enum.ts';
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const { t } = useI18n();
const tableStore = useTableStore();

const {
  filtersManager,
  isFiltersRestoring,
} = storeToRefs(tableStore); // tf is this error?

const {
  hasFilter,
  addFilter,
  updateFilter,
  deleteFilter,
} = tableStore;

const searchMode = ref(SearchMode.Search);
const localValue = ref('');

const v$ = useVuelidate(
  computed(() => ({
    localValue: {
      required,
    },
  })),
  { localValue },
  { $autoDirty: true },
)

let unwatchSearchMode: WatchHandle;

watch(isFiltersRestoring, (next) => {
  if (next) return;

  for (const mode of Object.values(SearchMode)) {
    if (hasFilter(mode as string)) {
      searchMode.value = mode;
      localValue.value = filtersManager.value.filters.get(mode).value;

      break;
    }
  }

  /**
   * start watching for searchMode change
   * only after initial searchMode restoration
   */
  if (unwatchSearchMode) {
    unwatchSearchMode();
  }

  unwatchSearchMode = watch(searchMode, (_, prev) => {
    deleteFilter(prev);
    localValue.value = '';
  });
}, { immediate: true });

const showTextSearchIcon = computed(() => {
  const textSearchModes = [
    SearchMode.Fts,
    SearchMode.Description,
  ];

  return textSearchModes.includes(searchMode.value);
});

const handleSearch = () => {
  const filter = {
    name: searchMode.value,
    value: localValue.value,
  };

  if (hasFilter(searchMode.value)) {
    if (localValue.value) {
      updateFilter(filter);
    } else {
      deleteFilter(searchMode.value);
    }
  } else {
    addFilter(filter);
  }
};

const searchModeOptions = computed(() => Object.values(SearchMode).map((mode) => {
  return {
    value: mode,
    text: t(`filters.search.${mode}`),
  };
}));
</script>

<style lang="scss" scoped>
</style>
