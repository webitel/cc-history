import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import logoutAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import AppHeader
  from '../app-header.vue';
import userInfoStore from '../../../../../modules/userinfo/store/userinfo';

const user = {
  username: 'username',
  account: 'account',
};

jest.spyOn(logoutAPI, 'logout');
describe('App Header', () => {
  let store;

  beforeEach(() => {
    store = createStore({
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
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findComponent({ name: 'wt-app-header' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'wt-app-navigator' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'wt-header-actions' }).exists()).toBe(true);
  });

  it('calls API logout at user logout action', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    });
    wrapper.findComponent({ name: 'wt-header-actions' }).vm.$emit('logout');
    expect(logoutAPI.logout).toHaveBeenCalled();
  });

  it('opens settings at user settings action', () => {
    const open = jest.fn();
    Object.defineProperty(window, 'open', {
      configurable: true, get() { return open; },
    });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    });
    wrapper.findComponent({ name: 'wt-header-actions' }).vm.$emit('settings');
    expect(open).toHaveBeenCalled();
  });
});
