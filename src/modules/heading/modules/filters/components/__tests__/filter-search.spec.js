import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '../../../../../../app/store';
import FilterSearch from '../filter-search.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('FilterSearch', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FilterSearch, {
      localVue,
      store,
      router,
      propsData: {
        namespace: 'filters',
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
