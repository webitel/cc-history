import { camelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';
import Visualizations from '../enums/Visualizations.enum';

export default class AbstractDashboard {
  isLimit() {
    return this.options.visualization !== Visualizations.METRIC;
  }

  isRelative() {
    return this.options.relative != null;
  }

  _isTimeMetric() {
    return this.options.visualization === Visualizations.BAR_CHART
      || this.options.visualization === Visualizations.LINE_CHART;
  }

  setId(id) {
    this.id = id;
  }

  setOptions(options) {
    this.options = { ...this.options, ...options };
  }

  getRequestAggregations({ interval }) {
    const aggs = {
      name: `${this.id}`,
      count: this.options.count,
      group: [],
      sort: '-count',
    };
    if (this._isTimeMetric()) {
        aggs.group.push({ id: 'created_at', interval });
        aggs.sort = 'created_at';
    }
    if (this.options.param) {
      const param = { id: this.options.param, desc: true };
      if (this.isLimit()) {
        param.aggregate = 'count';
        param.top = this.options.limit;
      }
      aggs.group.push(param);
    }
    if (this.aggregatedParam) {
      const { aggregation } = this.options;
      aggs[aggregation] = [camelToSnake(this.aggregatedParam)];
    }
    return aggs;
  }
}
