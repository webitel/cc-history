import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TheHistory from '../../../../src/components/history/the-history.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
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
      localVue,
      store,
      computed: {
        hasAccess() { return appAccess; },
      },
    });
    expect(wrapper.find('.the-history').exists()).toBe(true);
  });

  it('error page is shown, if there is no access to workspace', () => {
    appAccess = false;
    const wrapper = shallowMount(TheHistory, {
      localVue,
      store,
      computed: {
        hasAccess() { return appAccess; },
      },
    });
    expect(wrapper.findComponent({ name: 'wt-error-page' }).exists()).toBe(true);
  });
});
