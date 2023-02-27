import { shallowMount } from '@vue/test-utils';
import callInfo from '../call-info.vue';

const variables = { hello: 'there', hello1: 'there' };
const amd = { amdResult: 'human', amdAiLogs: ['silence', 'human'] };

const propsData = {
  call: { variables, ...amd },
};

describe('Opened call info tab', () => {
  it('renders a component', async () => {
    const wrapper = shallowMount(callInfo, { propsData: { call: {} } });
    expect(wrapper.classes('call-info')).toBe(true);
  });

  it('renders a component with call variables', () => {
    const wrapper = shallowMount(callInfo, { propsData });
    expect(wrapper.findAll('li.call-info__item').length).toBe(Object.keys(variables).length);
  });

  it('renders variables value', () => {
    const wrapper = shallowMount(callInfo, { propsData });
    const varKey = Object.keys(variables)[0];
    expect(wrapper.find('li > h3.call-info__title').text()).toBe(`${varKey}:`);
    expect(wrapper.find('li > span.call-info__value').text()).toBe(variables[varKey]);
  });

  it('renders a component with call AMD result', () => {
    const wrapper = shallowMount(callInfo, { propsData });
    expect(wrapper.find('div.call-info__wrapper').exists()).toBe(true);
  });
});
