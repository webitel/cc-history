import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import store from '../../../../../../../../app/store';
import FilterInterval from '../interval/filter-interval.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [],
});

describe('Dashboards: filter components', () => {
	it('renders interval filter component', () => {
		const wrapper = shallowMount(FilterInterval, {
			global: {
				plugins: [
					store,
					router,
				],
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'abstract-enum-filter',
				})
				.exists(),
		).toBe(true);
	});
});
