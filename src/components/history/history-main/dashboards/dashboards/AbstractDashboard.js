import Visualizations from './enums/Visualizations.enum';

export default class AbstractDashboard {
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }

  getRequestAggregations({ interval }) {
    const group = [];
    let sort;
    if (this.options.visualization === Visualizations.BAR_CHART
      || this.options.visualization === Visualizations.LINE_CHART) {
        group.push({ id: 'created_at', interval });
        sort = 'created_at';
    }
    if (this.options.param) group.push({ id: this.options.param });
    return {
      name: `${this.id}`,
      count: this.options.count,
      group,
      sort,
    };
  }
}
