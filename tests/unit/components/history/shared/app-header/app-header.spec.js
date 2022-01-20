import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import logoutAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import AppHeader
  from '../../../../../../src/components/history/shared/app-header/app-header.vue';
import userInfoStore from '../../../../../../src/store/modules/userinfo/userinfo';

const localVue = createLocalVue();
localVue.use(Vuex);

const user = {
  username: 'username',
  account: 'account',
};

jest.spyOn(logoutAPI, 'logout');
describe('App Header', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        userinfo: {
          ...userInfoStore,
          state: {
            ...userInfoStore.state,
            ...user,
          },
        },
      },
    });
  });

  it('renders an app header with all nested functional components', () => {
    const wrapper = shallowMount(AppHeader, { localVue, store });
    expect(wrapper.findComponent({ name: 'wt-app-header' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'wt-app-navigator' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'wt-header-actions' }).exists()).toBe(true);
  });

  it('calls API logout at user logout action', () => {
    const wrapper = shallowMount(AppHeader, { localVue, store });
    wrapper.findComponent({ name: 'wt-header-actions' }).vm.$emit('logout');
    expect(logoutAPI.logout).toHaveBeenCalled();
  });

  it('opens settings at user settings action', () => {
    const open = jest.fn();
    Object.defineProperty(window, 'open', {
      configurable: true, get() { return open; },
    });
    const wrapper = shallowMount(AppHeader, { localVue, store });
    wrapper.findComponent({ name: 'wt-header-actions' }).vm.$emit('settings');
    expect(open).toHaveBeenCalled();
  });
});
