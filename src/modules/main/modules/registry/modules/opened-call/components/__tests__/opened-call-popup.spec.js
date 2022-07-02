import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallPopup
  from '../opened-call-popup.vue';
import openedCall from '../../store/opened-call';

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
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue,
      store,
    });
    expect(wrapper.exists())
      .toBe(true);
  });

  it('renders a component if main call has any children', () => {
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue,
      store,
      computed: {
        mainCall() {
          return { hasChildren: true };
        },
      },
    });
    expect(wrapper.exists())
      .toBe(true);
  });

  it('resets currentTab to call-info if id changes', async () => {
    const currentTab = { value: 'call-legs' };
    const callInfoTab = { value: 'call-info' };
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue,
      store,
      data: () => ({
        id: '1',
        mainCallTrigger: false,
        currentTab,
      }),
      computed: {
        mainCall() {
          return {
            id: this.id,
            mainCallTrigger: this.mainCallTrigger,
            hasChildren: true,
          };
        },
      },
    });
    expect(wrapper.vm.currentTab)
      .toEqual(currentTab);
    wrapper.setData({
      id: '2',
      mainCallTrigger: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentTab)
      .toEqual(callInfoTab);
  });

  it('does not reset currentTab if id does not change', async () => {
    const currentTab = { value: 'call-legs' };
    const wrapper = shallowMount(OpenedCallPopup, {
      localVue,
      store,
      data: () => ({
        id: '1',
        mainCallTrigger: false,
        currentTab,
      }),
      computed: {
        mainCall() {
          return {
            id: this.id,
            mainCallTrigger: this.mainCallTrigger,
            hasChildren: true,
          };
        },
      },
    });
    expect(wrapper.vm.currentTab)
      .toEqual(currentTab);
    wrapper.setData({
      id: '1',
      mainCallTrigger: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentTab)
      .toEqual(currentTab);
  });
});
