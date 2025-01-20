<template>
  <section class="history-section history-filters-section">
    <preset-form-popup
      :callback="savePreset"
      :name="preset.name"
      :shown="isPresetFormPopup"
      @close="closePresetFormPopup"
    />
    <form
      :class="{'history-filters--opened': isOpened}"
      class="history-filters"
    >
      <preset-filter
        ref="preset-select"
        :preset-filter-schema="{
          value: preset,
          defaultValue: {},
          multiple: false,
          storedProp: 'id',
          locale: { label: ['filters.preset.preset', 1] },
        }"
        @input="setPreset"
      />
      <filter-from class="history-filters__filter" />
      <filter-to class="history-filters__filter" />
      <component
        :is="`abstract-${filter.type}-filter`"
        v-for="(filter, key) of selectFilters"
        :key="key"
        :allow-custom-values="filter.allowCustomValues"
        :disabled="filter.disabled"
        :filter-query="filter.filterQuery"
        :namespace="namespace"
        class="history-filters__filter"
      />
      <filter-from-to
        v-for="(filter, key) of filtersFromTo"
        :key="key"
        :filter-query="filter.filterQuery"
        :label="$t(filter.label)"
        :namespace="namespace"
        :number-max="filter.numberMax"
        class="history-filters__filter"
      />
      <div class="history-filters__filter preset-actions">
        <wt-button-select
          :options="presetSaveOptions"
          @click="openPresetFormPopup"
          @click:option="$event.handler()"
        >
          {{ $t('reusable.save') }}
        </wt-button-select>
        <wt-button
          :disabled="!preset.id"
          :loading="isDeletePresetLoading"
          color="secondary"
          @click="deletePreset"
        >
          {{ $t('reusable.delete') }}
        </wt-button>
      </div>
    </form>
    <wt-table-actions
      :icons="['refresh', 'filter-reset', 'settings']"
      @input="tableActionsHandler"
    >
      <filter-fields v-model="headers" />
    </wt-table-actions>
  </section>
</template>

<script>
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import FilterFromTo from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-from-to.vue';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { mapActions, mapState } from 'vuex';
import { EnginePresetQuerySection } from 'webitel-sdk';
import historyHeadersMixin from '../../main/modules/registry/mixins/historyHeadersMixin';
import FilterFields
  from '../../main/modules/registry/modules/filters/components/filter-table-fields/filter-table-fields.vue';
import PresetQueryAPI from '../api/PresetQuery.api.js';
import tableActionsHandlerMixin from '../mixins/tableActions/tableActionsHandlerMixin';
import FilterFrom from './filters/filter-from.vue';
import FilterTo from './filters/filter-to.vue';
import PresetFilter from './preset-filter.vue';
import PresetFormPopup from './preset-form-popup.vue';

export default {
  name: 'TheHistoryFilters',
  components: {
    AbstractApiFilter,
    AbstractEnumFilter,
    FilterFields,
    FilterFrom,
    FilterTo,
    FilterFromTo,
    PresetFormPopup,
    PresetFilter,
  },
  mixins: [tableActionsHandlerMixin, historyHeadersMixin],

  data: () => ({
    preset: {},
    isDeletePresetLoading: false,
    isPresetFormPopup: false,
    isPresetSaveAsMode: false,

    isOpened: false,
    isFilterFieldsOpened: false,
    filtersFromTo: [
      { label: 'filters.duration', filterQuery: 'duration' },
      { label: 'filters.talkSec', filterQuery: 'talkSec' },
      { label: 'filters.score', filterQuery: 'score', numberMax: 100 },
    ],
    namespace: 'filters',
  }),
  computed: {
    ...mapState('userinfo', {
      scope: (state) => state.scope,
    }),
    scopeClasses() {
      // initial value of scope in store is {}, sadly :(
      // seems like bad decision
      return Array.isArray(this.scope)
        ? this.scope.reduce((classes, item) => ({ ...classes, [item.class]: true }), {})
        : {};
    },
    selectFilters() {
      return [
        { type: 'enum', filterQuery: 'direction' },
        { type: 'api', filterQuery: 'user', disabled: !this.scopeClasses['users'] },
        { type: 'api', filterQuery: 'gateway', disabled: !this.scopeClasses['gateways'] },
        { type: 'api', filterQuery: 'agent', disabled: !this.scopeClasses['cc_agent'] },
        { type: 'api', filterQuery: 'team', disabled: !this.scopeClasses['cc_team'] },
        { type: 'api', filterQuery: 'queue', disabled: !this.scopeClasses['cc_queue'] },
        { type: 'api', filterQuery: 'grantee', disabled: !this.scopeClasses['roles'] },
        { type: 'api', filterQuery: 'contact', disabled: !this.scopeClasses['contacts'] },
        { type: 'enum', filterQuery: 'tags' },
        { type: 'enum', filterQuery: 'cause' },
        { type: 'enum', filterQuery: 'amdResult', allowCustomValues: true },
        { type: 'enum', filterQuery: 'hasFile' },
        { type: 'enum', filterQuery: 'hasTranscription' },
        { type: 'api', filterQuery: 'ratedBy', disabled: !this.scopeClasses['users'] },
        { type: 'enum', filterQuery: 'rated' },
      ];
    },
    filters() {
      return this.$store.getters[`${this.namespace}/GET_FULL_FILTER_VALUES`];
    },
    presetSaveOptions() {
      return [
        {
          value: 'saveAs',
          text: this.$t('reusable.saveAs'),
          handler: () => {
            this.openPresetFormPopup();
            this.isPresetSaveAsMode = true;
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      loadData: 'LOAD_DATA',
      resetFilters: 'RESET_FILTERS',
    }),
    ...mapActions({
      setFilter(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_FILTER`, payload);
      },
    }),
    openPresetFormPopup() {
      this.isPresetFormPopup = true;
    },
    closePresetFormPopup() {
      this.isPresetFormPopup = false;
      this.isPresetSaveAsMode = false;
    },
    updatePresetOptions() {
      // We need to force a reload of options list after preset deletion
      return this.$refs['preset-select'].$refs['preset-filter'].fetchOptions();
    },
    setPreset(preset) {
      this.resetFilters();
      this.preset = preset;
      if (!isEmpty(preset)) {
        Object.entries(preset.preset).forEach(([filter, value]) => {
          this.setFilter({ filter, value });
        });
      }
      this.loadData();
    },
    async savePreset(payload) {
      if (!isEmpty(this.preset) && !this.isPresetSaveAsMode) await this.updatePreset(payload);
      else await this.addPreset(payload);
      await this.updatePresetOptions();
    },

    async addPreset({ name }) {
      const item = {
        name,
        preset: this.filters,
        section: EnginePresetQuerySection.Calls,
      };
      const preset = await PresetQueryAPI.add(item);
      this.setPreset(preset);
    },

    async updatePreset({ name }) {
      const item = {
        name,
        preset: this.filters,
        section: EnginePresetQuerySection.Calls,
      };
      const preset = await PresetQueryAPI.update({ item, id: this.preset.id });
      this.setPreset(preset);
    },

    async deletePreset() {
      try {
        this.isDeletePresetLoading = true;
        await PresetQueryAPI.delete({ id: this.preset.id });
        this.setPreset({});
        await this.updatePresetOptions();
      } finally {
        this.isDeletePresetLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 30px*2 outer paddings, 30px*2 inner paddings, 216px table actions with 4 buttons
$width-except-filters: 60px + 60px + 176px;
$filter-width: 300px;
$filter-gap: 20px;
@function filtersWidth($num) {
  // 1px corrects max width
  @return ($filter-width * $num) + ($filter-gap * ($num - 1)) + $width-except-filters - 1px;
}

.history-section.history-filters-section {
  display: flex;
  align-items: flex-start;

  .wt-table-actions {
    flex: 0 0 auto;
    margin-top: 24px;
  }
}

.history-filters {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: $filter-gap;

  @media (max-width: filtersWidth(5)) {
    grid-template-columns: repeat(4, 1fr);

    .history-filters__filter:nth-child(n+5) {
      display: none;
    }
  }

  @media (max-width: filtersWidth(4)) {
    grid-template-columns: repeat(3, 1fr);

    .history-filters__filter:nth-child(n+4) {
      display: none;
    }
  }

  @media (max-width: filtersWidth(3)) {
    grid-template-columns: repeat(2, 1fr);

    .history-filters__filter:nth-child(n+3) {
      display: none;
    }
  }

  @media (max-width: filtersWidth(2)) {
    grid-template-columns: repeat(1, 1fr);

    .history-filters__filter:nth-child(n+2) {
      display: none;
    }
  }

  &.history-filters--opened {
    .history-filters__filter {
      display: block;
    }
  }
}

.history-filters__filter {
  margin-bottom: 18px;

  &:nth-child(n+6) {
    display: none;
  }
}

.history-filters.history-filters--opened .history-filters__filter.preset-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
