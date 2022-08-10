import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import { AggregationParams, MetricParams } from '../../../api/params/DashboardParams.enum';

export default class CallsCountMetricDashboard extends AbstractDashboard {
  static type = 'callsCountMetric';
  id = 0;
  aggParam = 'id';
  options = {
    name: 'Calls Count (Metric)',
    count: ['*'],
    visualization: Visualizations.METRIC,
    aggregation: AggregationParams.COUNT,
    param: MetricParams.BRIDGED,
  };

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getDisplayName = () => `${CallsCountMetricDashboard.type}Dashboard`;

  getSnapshot() {
    const snapshot = {
      type: CallsCountMetricDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
