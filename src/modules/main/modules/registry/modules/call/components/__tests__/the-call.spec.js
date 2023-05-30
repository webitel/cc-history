import { shallowMount } from '@vue/test-utils';
import TheCall
  from '../the-call.vue';

describe('Opened call', () => {
  it('renders a component', () => {
    jest.spyOn(TheCall.methods, 'setMainCall')
    .mockImplementationOnce(jest.fn());
    const wrapper = shallowMount(TheCall, {
      global: {
        mocks: {
          $route: {
            path: '',
          },
        },
      },
    });
    expect(wrapper.exists())
    .toBe(true);
  });
});
