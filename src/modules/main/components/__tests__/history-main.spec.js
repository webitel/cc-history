import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryMain from '../the-history-main.vue';
import registry from '../../modules/registry/store/registry';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('History main', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: { registry },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryMain, { localVue, router, store });
    expect(wrapper.classes('history-main')).toBe(true);
  });
});
