<template>
  <div class="media-select" v-clickaway="close">
    <button class="media-select__btn icon-btn table-action"
            :class="{'active': isOpened}"
            @click.prevent.stop="isOpened = !isOpened">
      <icon v-if="!isAnyFilesPlaying">
        <svg class="icon icon-play_md md">
          <use xlink:href="#icon-play_md"></use>
        </svg>
      </icon>
      <icon v-else>
        <svg class="icon icon-pause_md md">
          <use xlink:href="#icon-pause_md"></use>
        </svg>
      </icon>
    </button>
    <ul class="media-select__list" v-show="isOpened">
      <li
        class="media-select__item"
        v-for="(file, key) of mediaFiles"
        :key="key"
        @click.prevent.stop="togglePlay(file.id)"
      >
        <icon v-if="file.id !== currentlyPlaying">
          <svg class="icon icon-play_md md">
            <use xlink:href="#icon-play_md"></use>
          </svg>
        </icon>
        <icon v-else>
          <svg class="icon icon-pause_md md">
            <use xlink:href="#icon-pause_md"></use>
          </svg>
        </icon>
        <div class="media-select__item__name">{{file.name | truncate}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import clickaway from '../../directives/clickaway';

  export default {
    name: 'media-select',
    directives: { clickaway },
    filters: {
      truncate(value) {
        if (value) {
          if (value.length < 18) return value;
          return `${value.slice(0, 15)}...`;
        }
        return '';
      },
    },

    props: {
      files: {
        type: Array,
        required: true,
      },
      currentlyPlaying: {
        type: String,
      },
    },
    data: () => ({
      isOpened: false,
    }),

    computed: {
      isAnyFilesPlaying() {
        return this.files.some((file) => file.id === this.currentlyPlaying);
      },

      mediaFiles() {
        return this.files.filter((file) => file.mimeType.includes('audio')
        || file.mimeType.includes('video'));
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

      close() {
        this.isOpened = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .media-select {
    position: relative;
    height: (24px);
  }

  .media-select__list {
    position: absolute;
    top: (15px);
    right: 0;
    background: #fff;
    box-shadow: $box-shadow;
    z-index: 1;
  }

  .media-select__item {
    display: flex;
    align-items: center;
    min-width: (200px);
    padding: (5px) (10px);
    transition: $transition;

    &:hover {
      background: $list-option__hover;

      .icon {
        fill: $icon-color__hover;
        stroke: $icon-color__hover;
      }
    }

    .icon-wrap {
      margin-right: (10px);
    }

    &__name {
      white-space: nowrap;
    }
  }
</style>
