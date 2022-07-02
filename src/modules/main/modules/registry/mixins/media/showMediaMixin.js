import MediaSelect from '../../../../../../app/components/utils/media-select.vue';
import playMediaMixin from './playMediaMixin';

export default {
  mixins: [playMediaMixin],
  components: { MediaSelect },
  data: () => ({
    openedMediaIndex: null,
  }),

  computed: {
    isMediaSelectOpened() {
      return Number.isInteger(this.openedMediaIndex);
    },

    mediaFiles() {
      if (this.isMediaSelectOpened) {
        return this.dataList[this.openedMediaIndex]
          .files.filter((file) => file.mimeType?.includes('audio')
            || file.mimeType?.includes('video'));
      }
      return [];
    },
  },

  methods: {
    isAnyFilesPlaying(files) {
      return files.some((file) => file.id === this.currentlyPlaying);
    },

    closeMedia() {
      this.openedMediaIndex = null;
    },

    openMedia(index, event) {
      if (this.openedMediaIndex === index) {
        this.closeMedia();
      } else {
        this.openedMediaIndex = index;
        this.moveMediaSelect(event);
      }
    },

    moveMediaSelect(event) {
      const mediaSelect = this.$refs['media-select'];
      const table = this.$refs['wt-table'];
      const tableOffset = table.$el.getBoundingClientRect().top;
      const btnOffset = event.target.getBoundingClientRect().top;
      mediaSelect.$el.style.top = `${btnOffset - tableOffset}px`;
    },
  },
};
