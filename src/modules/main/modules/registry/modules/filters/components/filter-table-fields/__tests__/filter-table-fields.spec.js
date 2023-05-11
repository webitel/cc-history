import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import router from '../../../../../../../../../app/router';
import FilterTableFields from '../filter-table-fields.vue';
import registry from '../../../../../store/registry';

import '../../../../../../../../../../tests/unit/mocks/localStorageMock'; // mock localStorage

const headers = [
  { name: 'header1', value: 'h1' },
  { name: 'header2', value: 'h2' },
];

describe('Filter table fields', () => {
  const store = createStore({ modules: { registry } });
  it('renders a component', () => {
    const wrapper = shallowMount(FilterTableFields, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('filter correctly stores headers in localStorage', () => {
    const expectedStoredHeaders = 'h1,h2';
    const wrapper = shallowMount(FilterTableFields, {
      global: {
        plugins: [store, router],
      },
    });
    const { filterQuery, storedProp } = wrapper.vm;
    wrapper.vm.setToLocalStorage({ filterQuery, storedProp, value: headers });
    const storedHeaders = localStorage.getItem(filterQuery);
    expect(storedHeaders).toBe(expectedStoredHeaders);
  });

  it('filter correctly retrieves headers from localStorage', () => {
    const expectedStoredHeaders = ['h1', 'h2'];
    const wrapper = shallowMount(FilterTableFields, {
      global: {
        plugins: [store, router],
      },
    });
    const { filterQuery } = wrapper.vm;
    localStorage.setItem(filterQuery, 'h1,h2');
    const storedHeaders = wrapper.vm.getFromLocalStorage({ filterQuery });
    expect(storedHeaders).toEqual(expectedStoredHeaders);
  });
});
