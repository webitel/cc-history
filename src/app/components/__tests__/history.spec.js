import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import TheHistory from '../the-history.vue';

const store = createStore({
  modules: {
    userinfo: { namespaced: true },
  },
});

describe('The History', () => {
  let appAccess = true;

  beforeEach(() => {
    appAccess = true;
  });

  it('renders a component', () => {
    const wrapper = shallowMount(TheHistory, {
      global: {
        plugins: [store],
      },
      computed: {
        hasAccess() {
          return appAccess;
        },
      },
    });
    expect(wrapper.find('.the-history').exists()).toBe(true);
  });

  it('error page is shown, if there is no access to workspace', () => {
    appAccess = false;
    const wrapper = shallowMount(TheHistory, {
      global: {
        plugins: [store],
      },
      computed: {
        hasAccess() {
          return appAccess;
        },
      },
    });
    expect(wrapper.findComponent({ name: 'wt-error-page' }).exists()).toBe(
      true,
    );
  });
});
