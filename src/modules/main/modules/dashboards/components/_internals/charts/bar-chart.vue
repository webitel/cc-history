<template>
  <bar
    :chart-data="chartData"
  />
</template>

<script>
import 'chart.js/auto';

import { Bar } from 'vue-chartjs';

export default {
	components: {
		Bar,
	},
	props: {
		chartData: {},
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
};
</script>
