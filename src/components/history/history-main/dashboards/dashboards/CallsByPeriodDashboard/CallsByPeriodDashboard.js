import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import {
  AggregationParams,
  VisualizationParams,
} from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsByPeriodDashboard extends AbstractDashboard {
  static type = 'callsByPeriod';
  id = 0;
  aggParam = 'id';
  options = {
    name: 'Calls By Period',
    visualization: Visualizations.LINE_CHART,
    aggregation: AggregationParams.COUNT,
    param: VisualizationParams.DIRECTION,
    relative: null,
    limit: 10,
  };

  paramOptions = Object.values(VisualizationParams);

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getSnapshot() {
    const snapshot = {
      type: CallsByPeriodDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}