<template>
  <form
    class="history-search"
    @submit.prevent
  >
    <wt-search-bar
      :hint="searchBarHint"
      :placeholder="$t('reusable.search')"
      :v="v$.filterSchema.value"
      :value="filterSchema.value"
      debounce
      @input="setValue({ filter: filterQuery, value: $event })"
      @search="setValueToQuery({ filterQuery, value: $event })"
    >
      <template
        v-if="filterQuery === SearchMode.FTS"
        #search-icon
      >
        <wt-icon
          icon="stt-search"
        />
      </template>
      <template
        v-else-if="filterQuery === SearchMode.DESCRIPTION"
        #search-icon
      >
        <wt-icon
          icon="stt-search"
        />
      </template>
      <template #additional-actions="options">
        <wt-context-menu
          :options="searchModeOptions"
          @click="changeMode($event.option)"
        >
          <template #activator>
            <wt-tooltip>
              <template #activator>
                <wt-icon-btn
                  :color="options.invalid ? 'error' : 'default'"
                  icon="filter"
                />
              </template>
              {{ $t('webitelUI.searchBar.settingsHint') }}
            </wt-tooltip>
          </template>
          <template #option="{ value, text }">
            <wt-radio
              :label="text"
              :selected="filterQuery === value"
              :value="true"
            />
          </template>
        </wt-context-menu>
      </template>
    </wt-search-bar>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import variableSearchValidator from '@webitel/ui-sdk/src/validators/variableSearchValidator/variableSearchValidator';
import SearchMode from '../enums/SearchMode.enum';

export default {
  name: 'HistorySearch',
  mixins: [baseFilterMixin],
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  setup: () => ({
    v$: useVuelidate({ $autoDirty: true }),
  }),
  data: () => ({
    SearchMode,
    filterQuery: SearchMode.SEARCH,
  }),
  computed: {
    searchModeOptions() {
      return [
        {
          value: SearchMode.SEARCH,
          text: this.$t(`filters.search.${SearchMode.SEARCH}`),
        },
        {
          value: SearchMode.FTS,
          text: this.$t(`filters.search.${SearchMode.FTS}`),
        },
        {
          value: SearchMode.DESCRIPTION,
          text: this.$t(`filters.search.${SearchMode.DESCRIPTION}`),
        },
        {
          value: SearchMode.VARIABLE,
          text: this.$t(`filters.search.${SearchMode.VARIABLE}`),
        },
      ];
    },
    searchBarHint() {
      switch (this.filterQuery) {
        case SearchMode.VARIABLE:
          return this.$t('filters.variableSearchHint');
        default:
          return null;
      }
    },
  },
  mounted() {
    this.v$.$touch();
  },
  methods: {
    changeMode({ value }) {
      this.setValue({ filter: this.filterQuery, value: '' });
      this.setValueToQuery({ filterQuery: this.filterQuery, value: '' });
      this.filterQuery = value;
    },
    restore() {
      const search = this.getValueFromQuery({ filterQuery: SearchMode.SEARCH });
      if (search) {
        this.restoreValue({ value: search, filterQuery: SearchMode.SEARCH });
        return;
      }

      const fts = this.getValueFromQuery({ filterQuery: SearchMode.FTS });
      if (fts) {
        this.restoreValue({ value: fts, filterQuery: SearchMode.FTS });
        this.changeMode({ value: SearchMode.FTS });
        return;
      }

      const desc = this.getValueFromQuery({ filterQuery: SearchMode.DESCRIPTION });
      if (desc) {
        this.restoreValue({ value: desc, filterQuery: SearchMode.DESCRIPTION });
        this.changeMode({ value: SearchMode.DESCRIPTION });
        return;
      }

      const variable = this.getValueFromQuery({ filterQuery: SearchMode.VARIABLE });
      if (variable) {
        this.restoreValue({ value: variable, filterQuery: SearchMode.VARIABLE });
        this.changeMode({ value: SearchMode.VARIABLE });
        return;
      }
    },
    restoreValue({ filterQuery, value }) {
      this.setValue({ filter: filterQuery, value });
    },
  },
  validations() {
    return {
      filterSchema: {
        value: this.filterQuery === SearchMode.VARIABLE ? { variableSearchValidator } : {},
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
