import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import { MetricParams } from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsCountMetricDashboard extends AbstractDashboard {
  static type = 'callsCountMetric';
  id = 0;
  options = {
    name: 'Calls Count (Metric)',
    count: ['*'],
    visualization: Visualizations.METRIC,
    param: MetricParams.BRIDGED,
  };

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getSnapshot() {
    const snapshot = {
      type: CallsCountMetricDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
