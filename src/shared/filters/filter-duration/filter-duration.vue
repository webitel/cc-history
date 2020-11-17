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
          class="filter-duration-input"
          name="filter-duration-from"
          :value="value.from"
          type="number"
          :number-min="0"
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
          class="filter-duration-input"
          name="filter-duration-to"
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

  computed: {
    ...mapState('filters', { value: (state) => state.duration.value }),
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
      const queryValue = this.$route.query.durationFrom;
      // this.value.from = +queryValue || from;
      const value = { from: +queryValue || from, to: this.value.to };
      this.setValue({ filter: 'duration', value });
    },

    restoreDurationTo() {
      const to = null;
      const queryValue = this.$route.query.durationTo;
      // this.value.to = +queryValue || to;
      const value = { from: this.value.from, to: +queryValue || to };
      this.setValue({ filter: 'duration', value });
    },

    setFrom(value) {
      this.setValueToQuery({
        filterQuery: 'durationFrom',
        value,
      });
      this.restoreDurationFrom();
    },

    setTo(value) {
      this.setValueToQuery({
        filterQuery: 'durationTo',
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
