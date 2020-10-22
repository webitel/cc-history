import Visualizations
  from '../../../../../components/history/history-main/dashboards/dashboards/enums/Visualizations.enum';

const ticks = (relative) => (relative ? {
  min: 0,
  max: 100,
  callback: (value) => `${value}%`,
} : {});
const legend = {
  labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
  position: 'bottom',
};
export default {
  computed: {
    options() {
      switch (this.dashboard.options.visualization) {
        case Visualizations.LINE_CHART:
          return this.lineOptions();
        case Visualizations.DOUGHNUT_CHART:
          return this.doughnutOptions();
        case Visualizations.BAR_CHART:
          return this.barOptions();
        case Visualizations.METRIC:
          return this.metricOptions();
        default:
          return {};
      }
    },
  },
  methods: {
    lineOptions() {
      return {
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        },
        legend,
      };
    },
    doughnutOptions() {
      return {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const name = data.labels[tooltipItem.index];
              const value = data.datasets[0].data[tooltipItem.index];
              const label = `${name}: ${value}`;
              return this.dashboard.options.relative
                ? `${label}%` : label;
            },
          },
        },
        legend: {
          ...legend,
          labels: {
            ...legend.labels,
            // generateLabels: (chart) => (
            //   chart.data.labels.map((label, index) => ({
            //     text: !label || label.length <= 30 ? label : `${label.slice(0, 27)}...`,
            //     fillStyle: this.colors[index],
            //     index,
            //   }))
            // ),
          },
        },
      };
    },
    barOptions() {
      return {
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: ticks(this.dashboard.options.relative),
          }],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const name = data.datasets[0].label;
              const value = data.datasets[0].data[tooltipItem.index];
              const label = `${name}: ${value}`;
              return this.dashboard.options.relative
                ? `${label}%` : label;
            },
          },
        },
        legend: {
          ...legend,
          labels: {
            ...legend.labels,
            // generateLabels: (chart) => (
            //   chart.data.datasets
            //     .filter((dataset) => dataset.label)
            //     .map((dataset, index) => ({
            //       text: !dataset.label || dataset.label.length <= 21
            //         ? dataset.label : `${dataset.label.slice(0, 18)}...`,
            //       fillStyle: dataset.borderColor || dataset.backgroundColor,
            //       datasetIndex: index,
            //     }))
            // ),
          },
        },
      };
    },
    metricOptions() {
    },
  },
};
