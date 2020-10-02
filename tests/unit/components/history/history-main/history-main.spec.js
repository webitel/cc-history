import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryMain from '../../../../../src/components/history/history-main/the-history-main.vue';
import history from '../../../../../src/store/modules/history/history';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('History main', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        history,
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryMain, { localVue, router, store });
    expect(wrapper.classes('history-main')).toBe(true);
  });
});
