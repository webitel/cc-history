import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import { VisualizationParams, AggregationParams } from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsDurationDashboard extends AbstractDashboard {
  static type = 'callsDuration';
  id = 0;
  aggregatedParam = 'duration';
  options = {
    name: 'Calls Duration',
    // count: ['*'],
    visualization: Visualizations.DOUGHNUT_CHART,
    aggregation: AggregationParams.AVG,
    param: VisualizationParams.DIRECTION,
    relative: false,
    limit: 10,
  };

  visualizationOptions = [Visualizations.DOUGHNUT_CHART, Visualizations.BAR_CHART];
  aggregationOptions = Object.values(AggregationParams);
  paramOptions = Object.values(VisualizationParams);

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getResponseValueProperty() {
    return this.options.aggregation
      + this.aggregatedParam.charAt(0).toUpperCase()
      + this.aggregatedParam.slice(1);
  }

  getSnapshot() {
    const snapshot = {
      type: CallsDurationDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
