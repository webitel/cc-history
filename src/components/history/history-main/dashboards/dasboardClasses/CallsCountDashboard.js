import Visualizations from '../visualizations/Visualizations.enum';
import DashboardParams from '../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsCountDashboard {
  // static params
  static type = 'callsCount';
  component = 'CallsCountDashboard';
  count = ['*'];

  //  params
  name = 'Calls Count';
  visualization = Visualizations.DOUGHNUT_CHART;
  param = DashboardParams.DIRECTION;
  group = true;
  relative = false;

  visualizationOptions = [Visualizations.DOUGHNUT_CHART, Visualizations.BAR_CHART];
  paramOptions = Object.values(DashboardParams);
}
