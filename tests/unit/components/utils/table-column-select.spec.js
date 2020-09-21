import { shallowMount } from '@vue/test-utils';
import ColumnSelect from '../../../../src/components/utils/table-column-select.vue';

const value = [];
describe('Column Select', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ColumnSelect, { propsData: { value } });
    expect(wrapper.classes('column-select')).toBe(true);
  });
});
