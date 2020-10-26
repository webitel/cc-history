import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import {
  AggregationParams,
  VisualizationParams,
} from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsCountDashboard extends AbstractDashboard {
  static type = 'callsCount';
  id = 0;
  aggParam = 'id';
  options = {
    name: 'Calls Count',
    visualization: Visualizations.DOUGHNUT_CHART,
    aggregation: AggregationParams.COUNT,
    param: VisualizationParams.DIRECTION,
    relative: false,
    limit: 10,
  };

  visualizationOptions = [Visualizations.DOUGHNUT_CHART, Visualizations.BAR_CHART];
  paramOptions = Object.values(VisualizationParams)
    .filter((param) => param !== VisualizationParams.VARIABLES);

  constructor(snapshot) {
    super();
    if (snapshot) {
      this.id = snapshot.id;
      this.options = { ...this.options, ...snapshot.options };
    }
  }

  getDisplayName = () => `${CallsCountDashboard.type}Dashboard`;

  getSnapshot() {
    const snapshot = {
      type: CallsCountDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
