<template>
  <div class="filter-score">
    <wt-label>{{ $t('fields.duration') }}</wt-label>
    <div class="filter-score__inputs-wrapper">
      <div class="filter-score__input-wrapper">
        <wt-label
          class="filter-score__input-label"
          for="filter-score-from"
        >{{ $t('components.duration.from') }}
        </wt-label>
        <wt-input
          class="filter-score-input"
          name="filter-score-from"
          :value="value.from"
          type="number"
          :number-min="0"
          :namber-max="99"
          @input="setFrom"
        ></wt-input>
      </div>
      <div class="filter-score__input-wrapper">
        <wt-label
          class="filter-score__input-label"
          for="filter-score-to"
        >{{ $t('components.duration.to') }}
        </wt-label>
        <wt-input
          class="filter-score-input"
          name="filter-score-to"
          :value="value.to"
          type="number"
          :number-min="0"
          :namber-max="100"
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
  name: 'filter-score',
  mixins: [baseFilterMixin],

  // created() {
  //   // FIXME
  //   this.setFrom;
  //   this.setTo;
  // },

  computed: {
    ...mapState('filters', { value: (state) => state.scoreRequired.value }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    restore() {
      this.restoreTotalDurationFrom();
      this.restoreTotalDurationTo();
    },

    restoreTotalDurationFrom() {
      const from = 0;
      const queryValue = this.$route.query.scoreRequiredFrom;
      // this.value.from = +queryValue || from;
      const value = { from: +queryValue || from, to: this.value.to };
      this.setValue({ filter: 'scoreRequired', value });
    },

    restoreTotalDurationTo() {
      const to = 100;
      const queryValue = this.$route.query.scoreRequiredTo;
      // this.value.to = +queryValue || to;
      const value = { from: this.value.from, to: +queryValue || to };
      this.setValue({ filter: 'scoreRequired', value });
    },

    async setFrom(value) {
      await this.setValueToQuery({
         filterQuery: 'scoreRequiredFrom',
         value,
       });
      this.restoreTotalDurationFrom();
    },

    async setTo(value) {
      await this.setValueToQuery({
         filterQuery: 'scoreRequiredTo',
         value,
       });
      this.restoreTotalDurationTo();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-score {

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

.filter-score__inputs-wrapper,
.filter-score__input-wrapper {
  display: flex;
  align-items: center;
}

.filter-score__input-label {
  @extend %typo-subtitle-1;
  margin-right: 5px;
}

.filter-score__input-wrapper {
  &:focus-within .wt-label {
    color: var(--form-label--active-color)
  }

  .filter-score-input {
    width: 70px;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>
