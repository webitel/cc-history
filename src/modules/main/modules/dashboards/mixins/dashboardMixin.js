import BarChart from '../components/_internals/charts/bar-chart.vue';
import DoughnutChart from '../components/_internals/charts/doughnut-chart.vue';
import LineChart from '../components/_internals/charts/line-chart.vue';
import Metric from '../components/_internals/charts/metric.vue';
import dashboardDataMixin from './dashboardDataMixin/dashboardDataMixin';
import dashboardOptionsMixin from './dashboardOptionsMixin/dashboardOptionsMixin';

export default {
  mixins: [dashboardDataMixin, dashboardOptionsMixin],
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
      '#F36A83',
      '#FACD5E',
      '#8BC158',
      '#79B0F2',
      '#9678D8',
      '#F17B94',
      '#F9D479',
      '#9BC971',
      '#8EBAF2',
      '#A488DB',
      '#F38FA3',
      '#FADA8B',
      '#A9D185',
      '#9EC4F4',
      '#B19AE0',
      '#F5A2B3',
      '#FBE09E',
      '#B8D999',
      '#AFCEF7',
      '#BEABE6',
      '#F7B4C1',
      '#FBE6B1',
      '#C6E0AE',
      '#BED8F8',
      '#CBBCEB',
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
