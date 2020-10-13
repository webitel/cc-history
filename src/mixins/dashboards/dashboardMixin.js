import LineChart
  from '../../components/history/history-main/dashboards/_internals/charts/line-chart.vue';
import BarChart
  from '../../components/history/history-main/dashboards/_internals/charts/bar-chart.vue';
import DoughnutChart
  from '../../components/history/history-main/dashboards/_internals/charts/doughnut-chart.vue';
import Metric
  from '../../components/history/history-main/dashboards/_internals/charts/metric.vue';

export default {
  components: {
    LineChart,
    BarChart,
    DoughnutChart,
    Metric,
  },
  props: {
    dashboard: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
