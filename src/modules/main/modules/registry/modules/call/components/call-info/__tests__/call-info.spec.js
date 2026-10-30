import { flushPromises, mount } from '@vue/test-utils';

import callInfo from '../call-info.vue';

const variables = {
	hello: 'there',
	hello1: 'there',
};
const amd = {
	amdResult: 'human',
	amdAiLogs: [
		'silence',
		'human',
	],
};

// ui-sdk registers its components as async ones, and wt-expansion-panel
// loads nested async components too, so wait for two rounds of imports
const renderAsyncComponents = async () => {
	for (let round = 0; round < 2; round += 1) {
		await vi.dynamicImportSettled();
		await flushPromises();
	}
};

const props = {
	call: {
		variables,
		...amd,
	},
};

describe('Opened call info tab', () => {
	it('renders a component', async () => {
		const wrapper = mount(callInfo, {
			props: {
				call: {},
			},
		});
		expect(wrapper.classes('call-info')).toBe(true);
	});

	it('renders a component with call variables', async () => {
		const wrapper = mount(callInfo, {
			props,
		});
		await renderAsyncComponents();
		expect(wrapper.findAll('li.call-info__item').length).toBe(
			Object.keys(variables).length,
		);
	});

	it('renders variables value', async () => {
		const wrapper = mount(callInfo, {
			props,
		});
		const varKey = Object.keys(variables)[0];
		await renderAsyncComponents();
		expect(wrapper.find('li > h3.call-info__title').text()).toBe(`${varKey}:`);
	});

	it('renders a component with call AMD result', async () => {
		const wrapper = mount(callInfo, {
			props,
		});
		await renderAsyncComponents();
		expect(wrapper.find('div.call-info__wrapper').exists()).toBe(true);
	});
});
