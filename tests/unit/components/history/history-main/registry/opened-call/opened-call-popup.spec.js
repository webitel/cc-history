import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallPopup
  from '../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-popup.vue';
import openedCall from '../../../../../../../src/store/modules/registry/opened-call/opened-call';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Opened call popup (wrapper)', () => {
  const store = new Vuex.Store({
    modules: {
      registry: {
        namespaced: true,
        modules: { 'opened-call': openedCall },
      },
    },
  });
  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallPopup, { localVue, store });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a component if main call has any children', () => {
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue, store, computed: {
        mainCall() {
          return { hasChildren: true };
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('resets currentTab to call-info, if mainCall changes', async () => {
    const currentTab = { value: 'call-legs' };
    const callInfoTab = { value: 'call-info' };
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue,
      store,
      data: () => ({ mainCallTrigger: false, currentTab }),
      computed: {
        mainCall() {
          return { mainCallTrigger: this.mainCallTrigger, hasChildren: true };
        },
      },
    });
    expect(wrapper.vm.currentTab).toEqual(currentTab);
    wrapper.setData({ mainCallTrigger: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentTab).toEqual(callInfoTab);
  });
});
