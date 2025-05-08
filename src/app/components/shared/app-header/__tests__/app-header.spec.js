import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import userInfoStore from '../../../../../modules/userinfo/store/deprecated/userinfo.js';
import AppHeader from '../app-header.vue';

const user = {
  username: 'username',
  account: 'account',
};

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
    expect(wrapper.classes()).toContain('wt-app-header');
    expect(wrapper.findComponent({ name: 'wt-app-navigator' }).exists()).toBe(
      true,
    );
    expect(wrapper.findComponent({ name: 'wt-header-actions' }).exists()).toBe(
      true,
    );
  });

  it('calls API logout at user logout action', () => {
    const mock = vi
      .spyOn(AppHeader.methods, 'logout')
      .mockImplementationOnce(vi.fn());
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    });
    wrapper.findComponent({ name: 'wt-header-actions' }).vm.$emit('logout');
    expect(mock).toHaveBeenCalled();
  });

  it('opens settings at user settings action', () => {
    const open = vi.fn();
    Object.defineProperty(window, 'open', {
      configurable: true,
      get() {
        return open;
      },
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
