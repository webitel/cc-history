import AbstractDashboard from '../AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import { VisualizationParams } from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsCountDashboard extends AbstractDashboard {
  static type = 'callsCount';
  id = 0;
  options = {
    name: 'Calls Count',
    count: ['*'],
    visualization: Visualizations.DOUGHNUT_CHART,
    param: VisualizationParams.DIRECTION,
    relative: false,
  };

  visualizationOptions = [Visualizations.DOUGHNUT_CHART, Visualizations.BAR_CHART];
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
      type: CallsCountDashboard.type,
      id: this.id,
      options: this.options,
    };
    return snapshot;
  }
}
