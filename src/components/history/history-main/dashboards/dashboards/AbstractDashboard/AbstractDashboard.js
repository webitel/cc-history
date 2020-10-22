import { camelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';
import Visualizations from '../enums/Visualizations.enum';
import { VisualizationParams } from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

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

  getValueProperty() {
    return this.options.aggregation
      + this.aggParam.charAt(0).toUpperCase()
      + this.aggParam.slice(1);
  }

  getResponseParam() {
    return this.options.param;
  }

  getRequestAggregations({ interval }) {
    const aggs = {
      name: `${this.id}`,
      group: [],
      sort: [],
    };
    if (this._isTimeMetric()) {
        aggs.group.push({ id: 'created_at', interval });
        aggs.sort.push('+created_at');
    }

    const { aggregation } = this.options;
    aggs.sort.push(`-${aggregation}_${camelToSnake(this.aggParam)}`);
    aggs[aggregation] = [camelToSnake(this.aggParam)];

    if (this.options.param) {
      const param = { id: this.options.param, desc: true };
      if (this.options.param === VisualizationParams.VARIABLES) param.id += `.${this.options.variable}`;
      if (this.isLimit()) {
        param.aggregate = 'count';
        param.top = this.options.limit;
      }
      aggs.group.push(param);
    }
    return aggs;
  }
}
