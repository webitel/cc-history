import {
  AggregationParams,
  MetricParams,
} from '../../../api/params/DashboardParams.enum';
import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';

export default class CallsDurationMetricDashboard extends AbstractDashboard {
  static type = 'callsDurationMetric';
  id = 0;
  aggParam = 'duration';
  options = {
    name: 'Calls Duration (Metric)',
    visualization: Visualizations.METRIC,
    aggregation: AggregationParams.AVG,
    param: MetricParams.BRIDGED,
  };

  aggregationOptions = Object.values(AggregationParams).filter(
    (agg) => agg !== AggregationParams.COUNT,
  );

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getDisplayName = () => `${CallsDurationMetricDashboard.type}Dashboard`;

  getSnapshot() {
    const snapshot = {
      type: CallsDurationMetricDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
