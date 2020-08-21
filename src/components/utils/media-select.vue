<template>
  <div class="media-select">
    <ul class="media-select__list">
      <li
        class="media-select__item"
        v-for="(file, key) of files"
        :key="key"
        @click.prevent.stop="togglePlay(file.id)"
      >
        <wt-icon :icon="mediaIcon(file)"></wt-icon>
        <div class="media-select__item__name">{{ file.name | truncate }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'media-select',
  props: {
    files: {
      type: Array,
      required: true,
    },
    currentlyPlaying: {
      type: String,
    },
  },

  methods: {
    togglePlay(fileId) {
      if (this.currentlyPlaying === fileId) {
        this.$emit('play', '');
      } else {
        this.$emit('play', fileId);
      }
    },

    mediaIcon(file) {
      return file.id !== this.currentlyPlaying
        ? 'play' : 'pause';
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.media-select {
  position: absolute;
  right: 0;
  height: 24px;
}

.media-select__list {
  position: absolute;
  top: 24px;
  right: 0;
  background: var(--main-primary-color);
  box-shadow: var(--box-shadow);
  z-index: 1;
  cursor: pointer;

  .media-select__item {
    display: flex;
    align-items: center;
    min-width: 200px;
    padding: 5px 10px;
    transition: var(--transition);

    &:hover {
      background: var(--main-option-hover-color);

      .wt-icon ::v-deep .wt-icon__icon {
        fill: var(--icon--hover-color);
      }
    }

    .wt-icon {
      margin-right: 10px;
    }

    &__name {
      white-space: nowrap;
    }
  }
}
</style>
