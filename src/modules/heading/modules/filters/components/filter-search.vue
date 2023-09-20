<template>
  <form
    @submit.prevent
    class="history-search">
    <wt-search-bar
      :hint="searchBarHint"
      :placeholder="$t('reusable.search')"
      :v="v$.filterSchema.value"
      :value="filterSchema.value"
      debounce
      @input="setValue({ filter: filterQuery, value: $event })"
      @search="setValueToQuery({ filterQuery, value: $event })"
    >
      <template v-slot:search-icon v-if="filterQuery === SearchMode.FTS">
        <wt-icon
          icon="stt-search"
        ></wt-icon>
      </template>
      <template v-slot:search-icon v-else-if="filterQuery === SearchMode.DESCRIPTION">
        <wt-icon
          icon="stt-search"
        ></wt-icon>
      </template>
      <template v-slot:additional-actions="options">
        <wt-context-menu
            :options="searchModeOptions"
            @click="changeMode($event.option)"
          >
            <template v-slot:activator>
              <wt-tooltip>
                <template v-slot:activator>
                  <wt-icon-btn
                    :color="options.invalid ? 'danger' : null"
                    icon="filter"
                  ></wt-icon-btn>
                </template>
                {{ $t('webitelUI.searchBar.settingsHint') }}
              </wt-tooltip>
            </template>
            <template v-slot:option="{ value, text }">
              <wt-radio
                :label="text"
                :selected="filterQuery === value"
                :value="true"
              ></wt-radio>
            </template>
          </wt-context-menu>
      </template>
    </wt-search-bar>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import variableSearchValidator from '../../../../../utils/validators/variableSearchValidator';
import SearchMode from '../enums/SearchMode.enum';

export default {
  name: 'history-search',
  mixins: [baseFilterMixin],
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
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
  setup: () => ({
    v$: useVuelidate({ $autoDirty: true }),
  }),
  validations() {
    return {
      filterSchema: {
        value: this.filterQuery === SearchMode.VARIABLE ? { variableSearchValidator } : {},
      },
    };
  },
  mounted() {
    this.v$.$touch();
  },
};
</script>

<style lang="scss" scoped>
</style>
