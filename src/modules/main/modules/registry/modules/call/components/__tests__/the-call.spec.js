import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TheCall
  from '../the-call.vue';
import call from '../../store/call';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Opened call popup (wrapper)', () => {
  const store = new Vuex.Store({
    modules: {
      registry: {
        namespaced: true,
        modules: { call },
      },
    },
  });
  it('renders a component', () => {
    const wrapper = shallowMount(TheCall, {
      localVue,
      store,
      mocks: {
        $route: {
          path: '',
        },
      },
    });
    expect(wrapper.exists())
      .toBe(true);
  });

  it('renders a component if main call has any children', () => {
    const wrapper = shallowMount(TheCall, {
      localVue,
      store,
      computed: {
        mainCall() {
          return { hasChildren: true };
        },
      },
      mocks: {
        $route: {
          path: '',
        },
      },
    });
    expect(wrapper.exists())
      .toBe(true);
  });
});
