import { mount,shallowMount } from '@vue/test-utils';

import Dashboards from '../../../dashboards/enums/Dashboards.enum';
import DashboardConfigPopup from '../dashboard-config-popup.vue';

const dashboard = new Dashboards[0]();
describe('Dashboard config popup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DashboardConfigPopup, {
      props: { dashboard },
    });
    expect(wrapper.classes('dashboard-config')).toBe(true);
  });

  it('passes dashboard config options with default values', () => {
    const wrapper = mount(DashboardConfigPopup, { props: { dashboard } });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click'); // 1st button is submit
    expect(wrapper.emitted().input.pop()).toEqual([dashboard.options]);
  });
});
