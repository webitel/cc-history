<template>
  <div class="filter-duration">
    <wt-label>{{ $t('fields.duration') }}</wt-label>
    <div class="filter-duration__inputs-wrapper">
      <div class="filter-duration__input-wrapper">
        <wt-label
          class="filter-duration__input-label"
          for="filter-duration-from"
        >{{ $t('reusable.from') }}:
        </wt-label>
        <wt-input
          name="filter-duration-from"
          v-model="value.from"
          type="number"
          :number-min="0"
          @input="setFrom"
        ></wt-input>
      </div>
      <div class="filter-duration__input-wrapper">
        <wt-label
          class="filter-duration__input-label"
          for="filter-duration-to"
        >{{ $t('reusable.to') }}:
        </wt-label>
        <wt-input
          name="filter-duration-to"
          v-model="value.to"
          type="number"
          :number-min="0"
          @input="setTo"
        ></wt-input>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import baseFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-duration',
  mixins: [baseFilterMixin],

  data: () => ({
    value: {
      from: 0,
      to: 60,
    },
  }),
  '$route.query': {
    handler(newValue, oldValue) {
      if (newValue.durationFrom !== oldValue.durationFrom
        || newValue.durationTo !== oldValue.durationTo) {
        this.restore({ filterQuery: this.filterQuery });
      }
    },
  },

  created() {
    this.setFrom = debounce(this.setFrom);
    this.setTo = debounce(this.setTo);
  },

  methods: {
    restore() {
      this.restoreDurationFrom();
      this.restoreDurationTo();
    },

    restoreDurationFrom() {
      const from = 0;
      const queryValue = this.$route.query.durationFrom;
      this.value.from = +queryValue || from;
    },

    restoreDurationTo() {
      const to = null;
      const queryValue = this.$route.query.durationTo;
      this.value.to = +queryValue || to;
    },

    setFrom(value) {
      this.setValueToQuery({
        filterQuery: 'durationFrom',
        value,
      });
    },

    setTo(value) {
      this.setValueToQuery({
        filterQuery: 'durationTo',
        value,
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

  &:first-child {
    margin-right: 10px;
  }
}
</style>
