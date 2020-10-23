<template>
  <article class="metric">
    <div class="metric__sum-wrapper">{{ sumValue }}</div>
    <div class="metric__count-wrapper metric__count-wrapper--positive">
      <h3 class="metric__count__title">{{ truthyLabel }}</h3>
      <div class="metric__count__value">{{ truthyValue }}</div>
      <div class="metric__count__percent">{{ truePercent }}%</div>
    </div>
    <div class="metric__count-wrapper metric__count-wrapper--negative">
      <h3 class="metric__count__title">{{ falsyLabel }}</h3>
      <div class="metric__count__value">{{ falsyValue }}</div>
      <div class="metric__count__percent">{{ falsePercent }}%</div>
    </div>
  </article>
</template>

<script>
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
    sumValue() {
      return this.options.convertData ? this.options.convertData(this.sum) : this.sum;
    },
    truthyLabel() {
    return this.chartData.true?.label || '';
    },
    falsyLabel() {
      return this.chartData.false?.label || '';
    },
    truthyValue() {
      if (!this.chartData.true) return null;
      const value = this.chartData.true.value;
      if (this.options.convertData) {
        return this.options.convertData(value);
      }
      return value;
    },
    falsyValue() {
      if (!this.chartData.false) return null;
      const value = this.chartData.false.value;
      if (this.options.convertData) {
        return this.options.convertData(value);
      }
      return value;
    },
    sum() {
      return Object.values(this.chartData).reduce((sum, item) => sum + item.value, 0);
    },
    truePercent() {
      if (!this.chartData.true) return null;
      return Math.round((this.chartData.true.value / this.sum) * 100);
    },
    falsePercent() {
      if (!this.chartData.false) return null;
      return Math.round((this.chartData.false.value / this.sum) * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
%typo-metric-sum { font: 42px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-title { font: 20px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-value { font: 26px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-percent { font: 16px 'Montserrat Semi'; line-height: 1.2; };

.metric {
  display: grid;
  grid-template-areas:
  'sum-wrapper sum-wrapper'
  'count-wrapper--pos count-wrapper--neg';
  grid-gap: 20px;
  width: 100%;
  height: 100%;
}

.metric__sum-wrapper {
  @extend %typo-metric-sum;
  grid-area: sum-wrapper;
  text-align: center;
  margin-top: 30px;
}

.metric__count-wrapper {
  text-align: center;
  &--positive {
    grid-area: count-wrapper--pos;
    color: var(--true-color);
  }
  &--negative {
    grid-area: count-wrapper--neg;
    color: var(--false-color);
  }

  .metric__count__title {
    @extend %typo-metric-count-title;
    margin-top: 10px;
  }
  .metric__count__value {
    @extend %typo-metric-count-value;
    margin-top: 10px;
  }
  .metric__count__percent {
    @extend %typo-metric-count-percent;
    margin-top: 10px;
  }
}
</style>
