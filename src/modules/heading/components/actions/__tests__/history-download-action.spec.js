import { shallowMount } from '@vue/test-utils';
import HistoryDownloadAction from '../history-download-action.vue';

const dataList = [];
const selected = [];
const propsData = { selected, dataList };

describe('HistoryDownloadAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryDownloadAction, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });
});
