import { mount } from '@vue/test-utils';

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

	it('renders a component with call variables', () => {
		const wrapper = mount(callInfo, {
			props,
		});
		expect(wrapper.findAll('li.call-info__item').length).toBe(
			Object.keys(variables).length,
		);
	});

	it('renders variables value', () => {
		const wrapper = mount(callInfo, {
			props,
		});
		const varKey = Object.keys(variables)[0];
		expect(wrapper.find('li > h3.call-info__title').text()).toBe(`${varKey}:`);
	});

	it('renders a component with call AMD result', () => {
		const wrapper = mount(callInfo, {
			props,
		});
		expect(wrapper.find('div.call-info__wrapper').exists()).toBe(true);
	});
});
