<script>
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
