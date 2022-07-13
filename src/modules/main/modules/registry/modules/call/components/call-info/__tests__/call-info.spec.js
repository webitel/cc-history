import { shallowMount } from '@vue/test-utils';
import callInfo from '../call-info.vue';

const variables = { hello: 'there', hello1: 'there' };

const propsData = {
  call: { variables },
};

describe('Opened call info tab', () => {
  it('renders a component without variables', () => {
    const wrapper = shallowMount(callInfo, { propsData: { call: {} } });
    expect(wrapper.classes('call-info')).toBe(true);
  });

  it('renders a component with call variables', () => {
    const wrapper = shallowMount(callInfo, { propsData });
    expect(wrapper.findAll('.call-variable').length).toBe(Object.keys(variables).length);
  });

  it('renders variables texts', () => {
    const wrapper = shallowMount(callInfo, { propsData });
    const varKey = Object.keys(variables)[0];
    expect(wrapper.find('.call-variable__key').text()).toBe(`${varKey}:`);
    expect(wrapper.find('.call-variable__value').text()).toBe(variables[varKey]);
  });
});
