<template>
  <div class="filter-from-to-sec">
    <wt-label>{{ label }}</wt-label>
    <div class="filter-from-to-sec__inputs-wrapper">
      <div class="filter-from-to-sec__input-wrapper">
        <wt-label
          class="filter-from-to-sec__input-label"
          for="filter-from-to-sec-from"
        >{{ $t('components.filterSec.from') }}
        </wt-label>
        <wt-input
          class="filter-from-to-sec-input"
          name="filter-from-to-sec-from"
          :value="value.from"
          type="number"
          :number-min="0"
          @input="setFrom"
        ></wt-input>
      </div>
      <div class="filter-from-to-sec__input-wrapper">
        <wt-label
          class="filter-from-to-sec__input-label"
          for="filter-from-to-sec-to"
        >{{ $t('components.filterSec.to') }}
        </wt-label>
        <wt-input
          class="filter-from-to-sec-input"
          name="filter-from-to-sec-to"
          :value="value.to"
          type="number"
          :number-min="0"
          @input="setTo"
        ></wt-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-duration',
  mixins: [baseFilterMixin],

  created() {
    // FIXME
    this.setFrom = debounce(this.setFrom);
    this.setTo = debounce(this.setTo);
  },
  props: {
    filterQueryFrom: {
      type: String,
      default: '',
    },
    filterQueryTo: {
      type: String,
      default: '',
    },
    filterField: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapState('filters', { value: (state) => state[this.filterField].value }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    restore() {
      this.restoreDurationFrom();
      this.restoreDurationTo();
    },

    restoreDurationFrom() {
      const from = 0;
      const queryValue = this.$route.query[this.filterQueryFrom];
      // console.log('restoreDurationFrom queryValue:', queryValue);
      // this.value.from = +queryValue || from;
      const value = { from: +queryValue || from, to: this.value.to };
      // console.log('restoreDurationFrom value:', value);
      this.setValue({ filter: this.filterField, value });
    },

    restoreDurationTo() {
      const to = null;
      const queryValue = this.$route.query[this.filterQueryTo];
      // this.value.to = +queryValue || to;
      const value = { from: this.value.from, to: +queryValue || to };
      this.setValue({ filter: this.filterField, value });
    },

    async setFrom(value) {
      await this.setValueToQuery({
         filterQuery: this.filterQueryFrom,
         value,
       });
      this.restoreDurationFrom();
    },

    async setTo(value) {
      await this.setValueToQuery({
         filterQuery: this.filterQueryTo,
         value,
       });
      this.restoreDurationTo();
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
  @extend %typo-subtitle-1;
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
