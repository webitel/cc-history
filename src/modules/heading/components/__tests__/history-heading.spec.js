import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import HistoryHeading from '../the-history-heading.vue';
import filters from '../../../filters/store/filters';
import registry from '../../../main/modules/registry/store/registry';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('History heading section', () => {
  const store = createStore({
    modules: { registry, filters },
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
    expect(wrapper.findComponent({ name: 'history-search' }).isVisible()).toBe(true);
  });
});
