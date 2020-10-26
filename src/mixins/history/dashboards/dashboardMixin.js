import LineChart
  from '../../../components/history/history-main/dashboards/_internals/charts/line-chart.vue';
import BarChart
  from '../../../components/history/history-main/dashboards/_internals/charts/bar-chart.vue';
import DoughnutChart
  from '../../../components/history/history-main/dashboards/_internals/charts/doughnut-chart.vue';
import Metric
  from '../../../components/history/history-main/dashboards/_internals/charts/metric.vue';
import EmptyDashboard
  from '../../../components/history/history-main/dashboards/dashboards/_internals/empty-dashboard/empty-dashboard.vue';
import dashboardDataMixin from './_internals/dashboardDataMixin/dashboardDataMixin';
import dashboardOptionsMixin from './_internals/dashboardOptionsMixin/dashboardOptionsMixin';

export default {
  mixins: [
    dashboardDataMixin,
    dashboardOptionsMixin,
  ],
  components: {
    LineChart,
    BarChart,
    DoughnutChart,
    Metric,
    EmptyDashboard,
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
      '#F36A83', '#FACD5E', '#8BC158', '#79B0F2', '#9678D8',
      '#F17B94', '#F9D479', '#9BC971', '#8EBAF2', '#A488DB',
      '#F38FA3', '#FADA8B', '#A9D185', '#9EC4F4', '#B19AE0',
      '#F5A2B3', '#FBE09E', '#B8D999', '#AFCEF7', '#BEABE6',
      '#F7B4C1', '#FBE6B1', '#C6E0AE', '#BED8F8', '#CBBCEB',
    ],
  }),
  computed: {
    emptyData() {
      return !this.data.length;
    },
    valueProp() {
      return this.dashboard.getValueProperty();
    },
  },
};
