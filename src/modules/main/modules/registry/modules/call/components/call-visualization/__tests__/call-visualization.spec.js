import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

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
			namespace: 'registry/call',
		};
	});

	it('renders a component', () => {
		const store = createStore({
			state: {
				registry: {
					call: {
						selectedRecordingFile: {},
					},
				},
			},
		});
		const wrapper = shallowMount(CallVisualization, {
			props,
			global: {
				plugins: [
					store,
				],
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
