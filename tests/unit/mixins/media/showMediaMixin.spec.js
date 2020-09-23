import { shallowMount } from '@vue/test-utils';
import showMediaMixin from '../../../../src/mixins/media/showMediaMixin';

const dataList = [{ files: [{ id: '11', mimeType: 'audio' }, {}, {}] }];

describe('Show media select mixin', () => {
  let wrapper;
  beforeEach(() => {
    const Component = {
      render() {},
      data: () => ({ dataList, openedMediaIndex: null, currentlyPlaying: null }),
      mixins: [showMediaMixin],
    };
    wrapper = shallowMount(Component);
  });

  it('renders a component with mixin', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('correctly computes isAnyFilesPlaying', () => {
    expect(wrapper.vm.isAnyFilesPlaying(dataList[0].files)).toBe(false);
    wrapper.setData({ currentlyPlaying: dataList[0].files[0].id });
    expect(wrapper.vm.isAnyFilesPlaying(dataList[0].files)).toBe(true);
  });

  it('resets mediaIndex at closeMedia()', () => {
    wrapper.setData({ openedMediaIndex: 0 });
    wrapper.vm.closeMedia();
    expect(wrapper.vm.openedMediaIndex).toBe(null);
  });

  it('moves media select on openMedia', () => {
    wrapper.vm.moveMediaSelect = jest.fn();
    wrapper.vm.openMedia(0, {});
    expect(wrapper.vm.moveMediaSelect).toHaveBeenCalled();
  });

  it('closes media on openMedia toggle', () => {
    wrapper.vm.moveMediaSelect = jest.fn();
    wrapper.vm.closeMedia = jest.fn();
    wrapper.setData({ openedMediaIndex: 0 });
    wrapper.vm.openMedia(0, {});
    expect(wrapper.vm.closeMedia).toHaveBeenCalled();
    expect(wrapper.vm.moveMediaSelect).not.toHaveBeenCalled();
  });

  it('correctly computes isMediaSelected Boolean', () => {
    wrapper.setData({ openedMediaIndex: 1 });
    expect(wrapper.vm.isMediaSelectOpened).toBe(true);
    wrapper.setData({ openedMediaIndex: 0 });
    expect(wrapper.vm.isMediaSelectOpened).toBe(true);
    wrapper.setData({ openedMediaIndex: '1' });
    expect(wrapper.vm.isMediaSelectOpened).toBe(false);
    wrapper.setData({ openedMediaIndex: 1.1 });
    expect(wrapper.vm.isMediaSelectOpened).toBe(false);
    wrapper.setData({ openedMediaIndex: null });
    expect(wrapper.vm.isMediaSelectOpened).toBe(false);
  });

  it('correctly filters playable media files', () => {
    expect(wrapper.vm.mediaFiles).toEqual([]);
    wrapper.setData({ openedMediaIndex: 0 });
    expect(wrapper.vm.mediaFiles).toEqual([dataList[0].files[0]]);
  });
});
