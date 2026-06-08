import { shallowMount } from '@vue/test-utils';

// `useUserAccessControl` is a `let` populated only at app init (main.ts),
// so it is undefined under the test runner — provide a stub implementation.
vi.mock(
	'../../../../../../../../../app/composables/useUserAccessControl',
	async () => {
		const { ref } = await import('vue');
		return {
			useUserAccessControl: () => ({
				hasReadAccess: ref(true),
			}),
		};
	},
);

import CallVisualization from '../call-visualization.vue';

let call;
let props;

describe('CallVisualization', () => {
	beforeEach(() => {
		call = {
			files: [
				{},
			],
		};
		props = {
			call,
		};
	});

	it('renders a component', () => {
		const wrapper = shallowMount(CallVisualization, {
			props,
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
