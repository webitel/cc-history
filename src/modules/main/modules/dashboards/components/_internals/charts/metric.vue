<template>
  <article class="metric">
    <div class="metric__aggregation-wrapper">
      <h3 class="metric__aggregation__title">{{ aggregationTitle }}</h3>
      <div class="metric__aggregation__value">{{ aggregationValue }}</div>
    </div>
    <div class="metric__value-wrapper metric__value-wrapper--positive">
      <h3 class="metric__value__title">{{ truthyLabel }}</h3>
      <div class="metric__value__value">{{ truthyValue }}</div>
      <div class="metric__value__percent">{{ truePercent }}%</div>
    </div>
    <div class="metric__value-wrapper metric__value-wrapper--negative">
      <h3 class="metric__value__title">{{ falsyLabel }}</h3>
      <div class="metric__value__value">{{ falsyValue }}</div>
      <div class="metric__value__percent">{{ falsePercent }}%</div>
    </div>
  </article>
</template>

<script>
import { AggregationParams } from '../../../api/params/DashboardParams.enum';

const aggSum = (list) => list.reduce((sum, item) => sum + item, 0);
const aggAvg = (list) => aggSum(list) / list.length;
const aggMax = (list) => Math.max(...list);
const aggMin = (list) => Math.min(...list);

export default {
  name: 'metric',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    aggregationTitle() {
      return this.$t(`dashboards.aggregations.${this.options.aggregation}`);
    },
    aggregationValue() {
      return this.options.convertData
        ? this.options.convertData(this.aggregation) : this.aggregation;
    },
    truthyLabel() {
      return this.chartData.true?.label || '';
    },
    falsyLabel() {
      return this.chartData.false?.label || '';
    },
    truthyValue() {
      if (!this.chartData.true) return null;
      const { value } = this.chartData.true;
      if (this.options.convertData) return this.options.convertData(value);
      return value;
    },
    falsyValue() {
      if (!this.chartData.false) return null;
      const { value } = this.chartData.false;
      if (this.options.convertData) return this.options.convertData(value);
      return value;
    },
    aggregation() {
      const dataList = Object.values(this.chartData).map((item) => item.value);
      switch (this.options.aggregation) {
        case (AggregationParams.COUNT):
          return aggSum(dataList);
        case (AggregationParams.AVG):
          return aggAvg(dataList);
        case (AggregationParams.MAX):
          return aggMax(dataList);
        case (AggregationParams.MIN):
          return aggMin(dataList);
        case (AggregationParams.SUM):
          return aggSum(dataList);
        default: return null;
      }
    },
    truePercent() {
      if (typeof this.aggregation !== 'number' || Number.isNaN(this.aggregation)) return 0;
      return this.calcPercent(this.chartData.true.value);
    },
    falsePercent() {
      if (typeof this.aggregation !== 'number' || Number.isNaN(this.aggregation)) return 0;
      return this.calcPercent(this.chartData.false.value);
    },
  },
  methods: {
    calcPercent(value) {
      const aggValue = this.aggregation;
      // * 10 / 10 -- round to 1 decimal after comma
      const percent = Math.round((value / aggValue) * 100 * 10) / 10;
      const isSmaller = (value - aggValue) < 0;
      switch (this.options.aggregation) {
        case (AggregationParams.COUNT):
          return percent;
        case (AggregationParams.AVG):
          if (!aggValue && value) return '+100';
          if (!aggValue && !value) return '+0';
          return isSmaller ? `${percent - 100}` : `+${percent - 100}`; // -100% -- diff
        case (AggregationParams.MAX):
          if (!aggValue && value) return '+100';
          if (!aggValue && !value) return '+0';
          return isSmaller ? `${percent - 100}` : `+${percent - 100}`; // -100% -- diff
        case (AggregationParams.MIN):
          if (!aggValue && value) return '+100';
          if (!aggValue && !value) return '+0';
          return isSmaller ? `${percent - 100}` : `+${percent - 100}`; // -100% -- diff
        case (AggregationParams.SUM):
          return percent;
        default: return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.metric {
  display: grid;
  grid-template-areas:
  'aggregation-wrapper aggregation-wrapper'
  'value-wrapper--pos value-wrapper--neg';
  grid-gap: 20px;
  width: 100%;
  height: 100%;
}

.metric__aggregation-wrapper {
  grid-area: aggregation-wrapper;
  text-align: center;
  margin-top: 30px;

  .metric__aggregation__title {
    @extend %typo-heading-3;
  }

  .metric__aggregation__value {
    @extend %typo-heading-1;
  }
}

.metric__value-wrapper {
  text-align: center;

  &--positive {
    grid-area: value-wrapper--pos;
    color: var(--true-color);
  }

  &--negative {
    grid-area: value-wrapper--neg;
    color: var(--false-color);
  }

  .metric__value__title {
    @extend %typo-subtitle-1;
    margin-top: 10px;
  }

  .metric__value__value {
    @extend %typo-heading-3;
    margin-top: 10px;
  }

  .metric__value__percent {
    @extend %typo-subtitle-1;
    margin-top: 10px;
  }
}
</style>
