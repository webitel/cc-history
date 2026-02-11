import { shallowMount } from '@vue/test-utils';

import DashboardsHeader from '../dashboards-header.vue';

describe('Dashboards header', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(DashboardsHeader, {
			props: {
				layout: '1',
			},
		});
		expect(wrapper.classes('dashboards-header')).toBe(true);
	});

	it('emits reflow event at icon btn click', () => {
		const wrapper = shallowMount(DashboardsHeader, {
			props: {
				layout: '2',
			},
		});
		wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		expect(wrapper.emitted().reflow[0]).toEqual([
			'1',
		]);
	});
});
