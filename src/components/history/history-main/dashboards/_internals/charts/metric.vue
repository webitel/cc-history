<template>
  <article class="metric">
    <div class="metric__sum-wrapper">{{ sum }}</div>
    <div class="metric__count-wrapper metric__count-wrapper--positive">
      <h3 class="metric__count__title">{{ chartData.true.label }}</h3>
      <div class="metric__count__value">{{ chartData.true.count }}</div>
      <div class="metric__count__percent">{{ truePercent }}%</div>
    </div>
    <div class="metric__count-wrapper metric__count-wrapper--negative">
      <h3 class="metric__count__title">{{ chartData.false.label }}</h3>
      <div class="metric__count__value">{{ chartData.false.count }}</div>
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
      default: () => ({}),
    },
  },
  computed: {
    sum() {
      return Object.values(this.chartData).reduce((sum, item) => sum + item.count, 0);
    },
    truePercent() {
      return Math.round((this.chartData.true.count / this.sum) * 100);
    },
    falsePercent() {
      return Math.round((this.chartData.false.count / this.sum) * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
%typo-metric-sum { font: 48px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-title { font: 30px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-value { font: 30px 'Montserrat Semi'; line-height: 1.2; };
%typo-metric-count-percent { font: 20px 'Montserrat Semi'; line-height: 1.2; };

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
