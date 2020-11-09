import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import FilterTableFields from '@/components/history/history-main/registry/filters/filter-table-fields/filter-table-fields.vue';
import history from '../../../../src/store/modules/history/history';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Filter table fields', () => {
  const store = new Vuex.Store({ modules: { history } });
  it('renders a component', () => {
    const wrapper = shallowMount(FilterTableFields, {
      localVue, store, router,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
