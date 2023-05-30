<template>
  <section class="history-section history-filters-section">
<!--    <filter-fields-->
<!--      v-show="isFilterFieldsOpened"-->
<!--      @close="isFilterFieldsOpened = false"-->
<!--    ></filter-fields>-->
    <preset-form-popup
      v-if="isPresetFormPopup"
      :name="preset.name"
      :callback="savePreset"
      @close="closePresetFormPopup"
    ></preset-form-popup>
    <form class="history-filters" :class="{'history-filters--opened': isOpened}">
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
      ></preset-filter>
      <filter-from class="history-filters__filter" />
      <filter-to class="history-filters__filter" />
      <component
        class="history-filters__filter"
        v-for="(filter, key) of selectFilters"
        :key="key"
        :is="`abstract-${filter.type}-filter`"
        :filter-query="filter.filterQuery"
        :namespace="namespace"
      ></component>
      <filter-from-to
        class="history-filters__filter"
        v-for="(filter, key) of filtersFromTo"
        :key="key"
        :filter-query="filter.filterQuery"
        :number-max="filter.numberMax"
        :label="$t(filter.label)"
        :namespace="namespace"
      />
      <div class="history-filters__filter preset-actions">
        <wt-button-select
          :options="presetSaveOptions"
          @click="openPresetFormPopup"
          @click:option="$event.handler()"
        >{{ $t('reusable.save') }}
        </wt-button-select>
        <wt-button
          :loading="isDeletePresetLoading"
          color="secondary"
          :disabled="!preset.id"
          @click="deletePreset"
        >{{ $t('reusable.delete') }}
        </wt-button>
      </div>
    </form>
    <wt-table-actions
      :icons="['refresh', 'filter-reset', 'settings']"
      @input="tableActionsHandler"
    >
      <filter-fields />
    </wt-table-actions>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import FilterFromTo from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-from-to.vue';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { EnginePresetQuerySection } from 'webitel-sdk';
import FilterFields
  from '../../main/modules/registry/modules/filters/components/filter-table-fields/filter-table-fields.vue';
import FilterFrom from './filters/filter-from.vue';
import FilterTo from './filters/filter-to.vue';
import tableActionsHandlerMixin from '../mixins/tableActions/tableActionsHandlerMixin';
import PresetQueryAPI from '../api/PresetQueryAPI';
import PresetFormPopup from './preset-form-popup.vue';
import PresetFilter from './preset-filter.vue';

export default {
  name: 'the-history-filters',
  mixins: [tableActionsHandlerMixin],
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

  data: () => ({
    preset: {},
    isDeletePresetLoading: false,
    isPresetFormPopup: false,
    isPresetSaveAsMode: false,

    isOpened: false,
    isFilterFieldsOpened: false,
    selectFilters: [
      { type: 'enum', filterQuery: 'direction' },
      { type: 'api', filterQuery: 'user' },
      { type: 'api', filterQuery: 'gateway' },
      { type: 'api', filterQuery: 'agent' },
      { type: 'api', filterQuery: 'team' },
      { type: 'api', filterQuery: 'queue' },
      { type: 'api', filterQuery: 'grantee' },
      { type: 'enum', filterQuery: 'tags' },
      { type: 'enum', filterQuery: 'cause' },
      { type: 'enum', filterQuery: 'amdResult' },
      { type: 'enum', filterQuery: 'hasFile' },
      { type: 'enum', filterQuery: 'hasTranscription' },
      { type: 'api', filterQuery: 'ratedBy' },
      { type: 'enum', filterQuery: 'rated' },
    ],
    filtersFromTo: [
      { label: 'filters.duration', filterQuery: 'duration' },
      { label: 'filters.talkSec', filterQuery: 'talkSec' },
      { label: 'filters.score', filterQuery: 'score', numberMax: 100 },
    ],
    namespace: 'filters',
  }),
  computed: {
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
  flex: 1 1 auto;
  display: grid;
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
  gap: var(--spacing-sm);
  align-items: center;
}
</style>
