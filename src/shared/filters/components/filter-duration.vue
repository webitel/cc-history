<template>
  <div class="filter-duration">
    <wt-label>{{ $t('fields.duration') }}</wt-label>
    <div class="filter-duration__inputs-wrapper">
      <div class="filter-duration__input-wrapper">
        <wt-label
          class="filter-duration__input-label"
          for="filter-duration-from"
        >{{ $t('components.duration.from') }}
        </wt-label>
        <wt-input
          :number-min="0"
          :value="value.from"
          class="filter-duration-input"
          name="filter-duration-from"
          type="number"
          @input="setFrom"
        ></wt-input>
      </div>
      <div class="filter-duration__input-wrapper">
        <wt-label
          class="filter-duration__input-label"
          for="filter-duration-to"
        >{{ $t('components.duration.to') }}
        </wt-label>
        <wt-input
          :number-min="0"
          :value="value.to"
          class="filter-duration-input"
          name="filter-duration-to"
          type="number"
          @input="setTo"
        ></wt-input>
      </div>
    </div>
  </div>
</template>

<script>
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import { mapState } from 'vuex';

export default {
  name: 'filter-duration',
  mixins: [baseFilterMixin],

  created() {
    this.setFrom = debounce(this.setFrom);
    this.setTo = debounce(this.setTo);
  },

  computed: {
    ...mapState('filters', { value: (state) => state.duration.value }),
  },

  methods: {
    restore() {
      const defaultFrom = 0;
      const fromQuery = this.getValueFromQuery({ filterQuery: 'durationFrom' });

      const defaultTo = null;
      const toQuery = this.getValueFromQuery({ filterQuery: 'durationTo' });

      const value = {
        from: fromQuery || defaultFrom,
        to: toQuery || defaultTo,
      };
      this.setValue({ filter: 'duration', value });
    },

    setFrom(from) {
      const value = { from, to: this.value.to };
      this.setValue({ filter: 'duration', value });
      this.setValueToQuery({
        filterQuery: 'durationFrom',
        value: from,
      });
    },

    setTo(to) {
      const value = { from: this.value.from, to };
      this.setValue({ filter: 'duration', value });
      this.setValueToQuery({
        filterQuery: 'durationTo',
        value: to,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-duration {

  & > .wt-label {
    margin-bottom: 10px;
  }

  &:hover > .wt-label {
    color: var(--form-label--hover-color);
  }

  &:focus-within > .wt-label {
    color: var(--form-label--active-color);
  }
}

.filter-duration__inputs-wrapper,
.filter-duration__input-wrapper {
  display: flex;
  align-items: center;
}

.filter-duration__input-label {
  @extend %typo-strong-lg;
  margin-right: 5px;
}

.filter-duration__input-wrapper {
  &:focus-within .wt-label {
    color: var(--form-label--active-color)
  }

  .filter-duration-input {
    width: 70px;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>
