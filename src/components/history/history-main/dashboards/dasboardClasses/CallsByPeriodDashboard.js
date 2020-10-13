import Visualizations from '../visualizations/Visualizations.enum';
import DashboardParams from '../../../../../api/history/dashboards/params/DashboardParams.enum';

export default class CallsByPeriodDashboard {
  // static params
  static type = 'callsByPeriod';
  component = 'CallsByPeriodDashboard';
  visualization = Visualizations.LINE_CHART;
  count = ['*'];

  // passed params
  name = 'Calls By Period';
  param = DashboardParams.DIRECTION;
  group = true;
  relative = null;

  paramOptions = Object.values(DashboardParams);
}
