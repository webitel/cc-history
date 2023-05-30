import { shallowMount, mount } from '@vue/test-utils';
import DashboardSelectPopup from '../dashboard-select-popup.vue';

describe('Dashboard select popup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DashboardSelectPopup);
    expect(wrapper.classes('dashboard-select')).toBe(true);
  });

  it('selects a dashboard to create', () => {
    const wrapper = mount(DashboardSelectPopup);
    wrapper.find('.dashboard-select__option').trigger('click');
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click'); // first btn, submit
    expect(wrapper.emitted().input[0]).toBeTruthy();
  });
});
