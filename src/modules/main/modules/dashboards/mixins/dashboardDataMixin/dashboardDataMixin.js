import normalizeDashboardData from './scripts/normalizeDashboardData';
import calcRelativeData from './scripts/calcRelativeData';
import Visualizations
  from '../../components/dashboards/enums/Visualizations.enum';
import IntervalOptions from '../../modules/filters/enums/IntervalOptions.enum';

const prettifyDate = (date, interval) => {
  if (interval) {
    const Interval = IntervalOptions.find((Interval) => Interval.value === interval);
    return Interval.prettify(date);
  }
  return new Date(date).toLocaleString();
};

export default {
  computed: {
    chartData() {
      switch (this.dashboard.options.visualization) {
        case Visualizations.LINE_CHART: return this.lineData();
        case Visualizations.DOUGHNUT_CHART: return this.doughnutData();
        case Visualizations.BAR_CHART: return this.barData();
        case Visualizations.METRIC: return this.metricData();
        default: return {};
      }
    },
  },
  methods: {
    normalizeData() {
      let dataSource = normalizeDashboardData({
        aggValue: this.valueProp,
        param: this.dashboard.getResponseParam(),
        data: this.data,
      });
      if (this.dashboard.options.relative) {
        dataSource = calcRelativeData(dataSource.datasets, dataSource.dates);
      }
      return dataSource;
    },
    lineData() {
      const dataSource = this.normalizeData();
      const datasets = [];
      dataSource.datasets.forEach((dataset, label) => {
        datasets.push({
          label,
          borderColor: this.colors[datasets.length],
          backgroundColor: this.colors[datasets.length],
          data: dataset.data,
        });
      });
      return {
        labels: Array.from(dataSource.dates.keys())
          .map((date) => prettifyDate(date, this.$route.query.interval)),
        datasets,
      };
    },
    doughnutData() {
      const dataSource = this.normalizeData();
      const sourceDatasets = Array.from(dataSource.datasets);
      const datasets = [{
        backgroundColor: this.colors,
        data: sourceDatasets.map((dataset) => dataset[1].data).flat(),
      }];
      return {
        labels: sourceDatasets.map((dataset) => dataset[0]),
        datasets,
      };
    },
    barData() {
      const dataSource = this.normalizeData();
      const datasets = [];
      dataSource.datasets.forEach((dataset, label) => {
        datasets.push({
          label,
          borderColor: this.colors[datasets.length],
          backgroundColor: this.colors[datasets.length],
          data: dataset.data,
        });
      });
      return {
        labels: Array.from(dataSource.dates.keys())
          .map((date) => prettifyDate(date, this.$route.query.interval)),
        datasets,
      };
    },
    metricData() {
      const dataSource = this.normalizeData();
      return {
        true: {
          value: dataSource.datasets.get(true)?.data[0] || 0,
          label: this.$t('dashboards.bridged.true'),
        },
        false: {
          value: dataSource.datasets.get(false)?.data[0] || 0,
          label: this.$t('dashboards.bridged.false'),
        },
      };
    },
  },
};
