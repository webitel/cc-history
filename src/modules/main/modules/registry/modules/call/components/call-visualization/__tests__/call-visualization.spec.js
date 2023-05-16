import { shallowMount } from '@vue/test-utils';
import CallVisualization from '../call-visualization.vue';

let call;
let props;

describe('CallVisualization', () => {
  beforeEach(() => {
    call = { files: [{}] };
    props = { call };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallVisualization, { props });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('initially sets currentFile to first file from item.files', () => {
    const file = { id: 'jest' };
    call.files = [file];
    const wrapper = shallowMount(CallVisualization, { props });
    expect(wrapper.vm.currentFile).toStrictEqual(file);
  });
});
