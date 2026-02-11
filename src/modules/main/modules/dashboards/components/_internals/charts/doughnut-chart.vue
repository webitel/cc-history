<template>
  <doughnut
    :chart-data="chartData"
  />
</template>

<script>
import 'chart.js/auto';

import { Doughnut } from 'vue-chartjs';

export default {
	components: {
		Doughnut,
	},
	props: {
		chartData: {},
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
};
</script>
