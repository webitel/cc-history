import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallPopup from '../../../../../../src/components/history/history-main/opened-call/opened-call-popup.vue';
import openedCallHistory from '../../../../../../src/store/modules/history/opened-call/opened-call';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Opened call popup (wrapper)', () => {
  const store = new Vuex.Store({
    modules: {
      history: {
        namespaced: true,
        modules: { 'opened-call': openedCallHistory },
      },
    },
  });
  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallPopup, { localVue, store });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a component if main call has any children', () => {
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue, store, computed: { mainCall() { return { hasChildren: true } } },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
