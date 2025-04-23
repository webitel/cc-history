import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

// import filters from '../../../filters/filters';
import registry from '../../../main/modules/registry/store/registry';
import HistoryHeading from '../the-history-heading.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

// todo: fix or rewrite or delete me
describe.todo('History heading section', () => {
  const store = createStore({
    modules: { registry /*filters*/ },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(HistoryHeading, {
      global: {
        plugins: [router, store],
      },
    });
    expect(wrapper.classes('the-history-heading')).toBe(true);
  });

  it('renders search filter', () => {
    const wrapper = mount(HistoryHeading, {
      global: {
        plugins: [router, store],
      },
    });
    expect(wrapper.findComponent({ name: 'history-search' }).isVisible()).toBe(
      true,
    );
  });
});
