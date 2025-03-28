import { shallowMount } from '@vue/test-utils';

import DashboardHeader from '../dashboard-header.vue';

describe('Dashboard header', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DashboardHeader);
    expect(wrapper.classes('dashboard-header')).toBe(true);
  });

  it('renders passed name prop', () => {
    const name = 'jest';
    const wrapper = shallowMount(DashboardHeader, { props: { name } });
    expect(wrapper.find('.dashboard-header__heading').text()).toBe(name);
  });

  it('emits edit event at icon btn click', () => {
    const wrapper = shallowMount(DashboardHeader);
    wrapper
      .findAllComponents('.dashboard-header__actions-wrapper__action')
      .at(0)
      .vm.$emit('click');
    expect(wrapper.emitted().edit.pop()).toBeTruthy();
  });

  it('emits delete event at icon btn click', () => {
    const wrapper = shallowMount(DashboardHeader);
    wrapper
      .findAllComponents('.dashboard-header__actions-wrapper__action')
      .at(1)
      .vm.$emit('click');
    expect(wrapper.emitted().delete.pop()).toBeTruthy();
  });
});
