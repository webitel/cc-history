import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import HistoryMain from '../the-history-main.vue';
import registry from '../../modules/registry/store/registry';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('History main', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: { registry },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryMain, {
      global: { plugins: [store, router] },
    });
    expect(wrapper.classes('history-main')).toBe(true);
  });
});
