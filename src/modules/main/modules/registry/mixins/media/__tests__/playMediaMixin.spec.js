import { shallowMount } from '@vue/test-utils';
import playMediaMixin from '../../../composables/usePlayMedia.composable.ts';

describe('Play media mixin', () => {
  let wrapper;
  beforeEach(() => {
    const Component = {
      render() {},
      mixins: [playMediaMixin],
    };
    wrapper = shallowMount(Component);
  });

  it('renders a component with mixin', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets audioURL and currentlyPlaying id at play()', () => {
    const fileId = '123jest';
    wrapper.vm.play(fileId);
    expect(wrapper.vm.audioURL.includes(fileId)).toBe(true);
    expect(wrapper.vm.currentlyPlaying).toBe(fileId);
  });

  it('closes player at empty play()', () => {
    wrapper.vm.closePlayer = vi.fn();
    wrapper.vm.play();
    expect(wrapper.vm.closePlayer).toHaveBeenCalled();
  });

  it('resets audio data at closePlayer()', () => {
    wrapper.setData({
      audioURL: 'example.com',
      currentlyPlaying: '313213',
      isPlayingNow: true,
    });
    wrapper.vm.closePlayer();
    expect(wrapper.vm.audioURL).toBe('');
    expect(wrapper.vm.currentlyPlaying).toBe('0');
    expect(wrapper.vm.isPlayingNow).toBe(false);
  });
});
