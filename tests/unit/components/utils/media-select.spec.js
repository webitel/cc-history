import { shallowMount } from '@vue/test-utils';
import MediaSelect from '../../../../src/components/utils/media-select.vue';

const files = [{ id: '1' }];
let currentlyPlaying = '2';
describe('Media Select', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(MediaSelect, { propsData: { files } });
    expect(wrapper.classes('media-select')).toBe(true);
  });

  it('toggles play: on', () => {
    const wrapper = shallowMount(MediaSelect, { propsData: { files, currentlyPlaying } });
    wrapper.find('.media-select__item').trigger('click');
    expect(wrapper.emitted().play.pop()).toEqual(['1']);
  });

  it('toggles play: off', () => {
    currentlyPlaying = '1';
    const wrapper = shallowMount(MediaSelect, { propsData: { files, currentlyPlaying } });
    wrapper.find('.media-select__item').trigger('click');
    expect(wrapper.emitted().play.pop()).toEqual(['']);
  });
});
