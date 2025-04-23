import { shallowMount } from '@vue/test-utils';

import TheCall from '../the-call.vue';

// todo: fix or rewrite or delete me
describe.todo('Opened call', () => {
  it('renders a component', () => {
    vi.spyOn(TheCall.methods, 'setMainCall').mockImplementationOnce(vi.fn());
    const wrapper = shallowMount(TheCall, {
      global: {
        mocks: {
          $route: {
            path: '',
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
