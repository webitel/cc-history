import { shallowMount } from '@vue/test-utils';
import FilesCounter from '../files-counter.vue';

describe('FilesCounter', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FilesCounter);
    expect(wrapper.isVisible()).toBe(true);
  });
});
