import { shallowMount } from '@vue/test-utils';
import { CallDirection } from 'webitel-sdk';

import TableDirection from '../table-direction.vue';

describe('Queues table Direction', () => {
	const item = {
		direction: CallDirection.Outbound,
	};

	it('renders a component with outbound value', async () => {
		const wrapper = shallowMount(TableDirection, {
			props: {
				item,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders a component with inbound value', async () => {
		item.direction = CallDirection.Inbound;
		const wrapper = shallowMount(TableDirection, {
			props: {
				item,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders a component with incorrect value without failure', async () => {
		item.direction = 'hello there';
		const wrapper = shallowMount(TableDirection, {
			props: {
				item,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
