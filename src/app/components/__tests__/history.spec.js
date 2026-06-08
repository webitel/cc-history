import { shallowMount } from '@vue/test-utils';

import TheHistory from '../the-history.vue';

describe('The History', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TheHistory);
		expect(wrapper.find('.the-history').exists()).toBe(true);
	});
});
