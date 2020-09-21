import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import FilterTableFields from '../../../../src/components/filters/filter-table-fields.vue';
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
