import { shallowMount } from '@vue/test-utils';
import TheCall
  from '../the-call.vue';

describe('Opened call popup (wrapper)', () => {
  it('renders a component', () => {
    jest.spyOn(TheCall.methods, 'setMainCall')
    .mockImplementationOnce(jest.fn());
    const wrapper = shallowMount(TheCall, {
      computed: {
        mainCall() { return {}; },
        isLoading() { return false; },
      },
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

  it('renders a component if main call has any children', () => {
    jest.spyOn(TheCall.methods, 'setMainCall')
    .mockImplementationOnce(jest.fn());
    const wrapper = shallowMount(TheCall, {
      computed: {
        mainCall() {
          return { hasChildren: true };
        },
        isLoading() { return false; },
      },
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
