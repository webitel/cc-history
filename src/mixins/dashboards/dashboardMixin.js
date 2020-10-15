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
  data: () => ({
    colors: [
      '#E9F0D5', '#D3E7C2', '#A8D49D', '#7CC378', '#52B054',
      '#7BB544', '#A6B837', '#D1BD2E', '#FCC12A', '#FBA12D',
      '#FB8233', '#FB7238', '#FA623D', '#FA4049', '#C13741',
      '#AD4F6F', '#9A649E', '#877ACD', '#758FFC', '#8AA1FF',
    ],
  }),
};
