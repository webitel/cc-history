<template>
  <div class="filter-total-duration">
    <wt-label>{{ $t('fields.duration') }}</wt-label>
    <div class="filter-total-duration__inputs-wrapper">
      <div class="filter-total-duration__input-wrapper">
        <wt-label
          class="filter-total-duration__input-label"
          for="filter-total-duration-from"
        >{{ $t('components.duration.from') }}
        </wt-label>
        <wt-input
          class="filter-total-duration-input"
          name="filter-total-duration-from"
          :value="value.from"
          type="number"
          :number-min="0"
          @input="setFrom"
        ></wt-input>
      </div>
      <div class="filter-total-duration__input-wrapper">
        <wt-label
          class="filter-total-duration__input-label"
          for="filter-total-duration-to"
        >{{ $t('components.duration.to') }}
        </wt-label>
        <wt-input
          class="filter-total-duration-input"
          name="filter-total-duration-to"
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
  name: 'filter-total-duration',
  mixins: [baseFilterMixin],

  created() {
    // FIXME
    this.setFrom = debounce(this.setFrom);
    this.setTo = debounce(this.setTo);
  },

  computed: {
    ...mapState('filters', { value: (state) => state.talkSec.value }),
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
      const queryValue = this.$route.query.talkFrom;
      // this.value.from = +queryValue || from;
      console.log('restoreTotalDurationTo queryValue:', queryValue);
      const value = { from: +queryValue || from, to: this.value.to };
      console.log('restoreTotalDurationTo value:', value);
      this.setValue({ filter: 'talkSec', value });
    },

    restoreTotalDurationTo() {
      const to = null;
      const queryValue = this.$route.query.talkTo;
      // this.value.to = +queryValue || to;
      console.log('restoreTotalDurationTo queryValue:', queryValue);
      const value = { from: this.value.from, to: +queryValue || to };
      console.log('restoreTotalDurationFrom value:', value);
      this.setValue({ filter: 'talkSec', value });
    },

    setFrom(value) {
      this.setValueToQuery({
        filterQuery: 'talkFrom',
        value,
      });
      this.restoreTotalDurationFrom();
    },

    setTo(value) {
      this.setValueToQuery({
        filterQuery: 'talkTo',
        value,
      });
      this.restoreTotalDurationTo();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-total-duration {

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

.filter-total-duration__inputs-wrapper,
.filter-total-duration__input-wrapper {
  display: flex;
  align-items: center;
}

.filter-total-duration__input-label {
  @extend %typo-subtitle-1;
  margin-right: 5px;
}

.filter-total-duration__input-wrapper {
  &:focus-within .wt-label {
    color: var(--form-label--active-color)
  }

  .filter-total-duration-input {
    width: 70px;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>
