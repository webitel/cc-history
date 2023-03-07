import { shallowMount } from '@vue/test-utils';
import ColumnSelect from '../table-column-select.vue';

const value = [];
describe('Column Select', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ColumnSelect, { props: { value } });
    expect(wrapper.classes('column-select')).toBe(true);
  });
});
