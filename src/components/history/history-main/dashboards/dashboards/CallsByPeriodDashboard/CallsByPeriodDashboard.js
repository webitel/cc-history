import AbstractDashboard from '../AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';
import { VisualizationParams } from '../../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsByPeriodDashboard extends AbstractDashboard {
  static type = 'callsByPeriod';
  id = 0;
  options = {
    name: 'Calls By Period',
    count: ['*'],
    visualization: Visualizations.LINE_CHART,
    param: VisualizationParams.DIRECTION,
    relative: null,
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
