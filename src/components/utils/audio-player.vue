<template>
  <aside class="player">
    <div class="player-controls">
      <wt-icon-btn
        icon="stop"
        :tooltip="$t('icon.stop')"
        @click="stop"
      ></wt-icon-btn>
      <wt-icon-btn
        v-if="!playing"
        icon="play"
        :tooltip="$t('icon.play')"
        @click="playing = !playing"
      ></wt-icon-btn>
      <wt-icon-btn
        v-else
        icon="pause"
        :tooltip="$t('icon.pause')"
        @click="playing = !playing"
      ></wt-icon-btn>
      <div class="player-time">
        <div class="player-time-current">{{convertTimeHHMMSS}}</div>
      </div>
      <div
        class="player-progress"
        @mouseleave="seekbarLeave"
        @mouseover="seekbarOver"
        @mousemove="seekbarHover"
        @click="seek"
      >

        <div
          class="player-seeker"
          :style="{width: this.percentComplete+'%'}"
        ></div>
        <div
          class="player-hover"
          :style="{width: this.percentHover+'%'}"
        >
          <div
            class="player-timer"
            v-show="showHoverTimer"
          >{{convertHoverTimeHHMMSS}}
          </div>
        </div>
      </div>
      <div class="range-wrap" :class="{'hidden': !showVolume}">
        <range
          v-model="volume"
          :min-range="0"
        ></range>
      </div>
      <button class="icon-btn" @click.prevent="showVolume = !showVolume">
        <icon v-if="muted">
          <svg class="icon icon-mute_md md">
            <use xlink:href="#icon-mute_md"></use>
          </svg>
        </icon>
        <icon v-else>
          <svg class="icon icon-volume_md md">
            <use xlink:href="#icon-volume_md"></use>
          </svg>
        </icon>
      </button>
      <button class="icon-btn" @click.prevent="close">
        <icon>
          <svg class="icon icon-close_md md">
            <use xlink:href="#icon-close_md"></use>
          </svg>
        </icon>
      </button>
    </div>
    <audio
      class="audio"
      ref="audiofile"
      :src="file"
      :loop="loop"
      preload="auto"
    ></audio>
  </aside>
</template>

<script>
  import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
  import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
  import range from './range.vue';

  export default {
    name: 'audio-player',
    components: {
      range,
    },
    props: {
      file: {
        type: String,
        default: null,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      loop: {
        type: Boolean,
      },
    },
    data: () => ({
      audio: null,
      currentSeconds: 0,
      durationSeconds: 0,
      loaded: false,
      playing: false,
      volume: 50,
      showVolume: false,
      isFirstLoad: true,
      hoverSeconds: 0,
      showHoverTimer: false,
    }),
    computed: {
      percentComplete() {
        return parseInt((this.currentSeconds / this.durationSeconds) * 100, 10);
      },
      percentHover() {
        return parseInt((this.hoverSeconds / this.durationSeconds) * 100, 10);
      },
      muted() {
        return this.volume === 0;
      },
      convertTimeHHMMSS() {
        const time = convertDuration(this.currentSeconds);
        return time.includes('00:0') ? time.substr(3) : time;
      },
      convertHoverTimeHHMMSS() {
        const time = convertDuration(this.hoverSeconds);
        return time.includes('00:0') ? time.substr(3) : time;
      },
    },
    watch: {
      file(value) {
        if (value) this.playing = true;
      },
      playing(value) {
        if (value) {
          this.$emit('play');
        } else {
          this.$emit('pause');
        }
        if (value) {
          const playPromise = this.audio.play();
          if (playPromise) {
            playPromise.catch(() => eventBus.$emit('notification', {
              type: 'error',
              text: 'Failed to start. Please, start audio file manually\'',
            }));
          }
        } else {
          this.audio.pause();
        }
      },
      volume() {
        // this.showVolume = false;
        this.audio.volume = this.volume / 100;
      },
    },
    mounted() {
      // eslint-disable-next-line prefer-destructuring
      this.audio = this.$el.querySelectorAll('audio')[0];
      this.audio.addEventListener('timeupdate', this.update);
      this.audio.addEventListener('loadeddata', this.load);
      this.audio.addEventListener('pause', () => {
        this.playing = false;
      });
      this.audio.addEventListener('play', () => {
        this.playing = true;
      });
    },
    beforeDestroy() {
      this.audio.removeEventListener('timeupdate', this.update);
      this.audio.removeEventListener('loadeddata', this.load);
      this.audio.removeEventListener('pause', () => {
        this.playing = false;
      });
      this.audio.removeEventListener('play', () => {
        this.playing = true;
      });
    },
    methods: {
      load() {
        if (this.audio.readyState >= 2) {
          this.loaded = true;
          this.durationSeconds = parseInt(this.audio.duration, 10);
          this.playing = (this.autoPlay && !this.isFirstLoad);
          if (this.playing) this.audio.play();
          this.isFirstLoad = false;
        } else {
          throw new Error('Failed to load sound file.');
        }
      },
      seek(event) {
        // if (!this.playing || event.target.tagName === 'SPAN') return;
        this.playing = true;
        const el = event.target.getBoundingClientRect();
        const seekPos = (event.clientX - el.left) / el.width;
        this.audio.currentTime = parseInt(this.audio.duration * seekPos, 10);
      },
      seekbarLeave() {
        this.showHoverTimer = false;
        this.hoverSeconds = 0;
      },
      seekbarOver() {
        this.showHoverTimer = true;
      },
      seekbarHover(event) {
        const el = event.target.getBoundingClientRect();
        const seekPos = (event.clientX - el.left) / el.width;
        this.hoverSeconds = parseInt(this.audio.duration * seekPos, 10);
      },
      stop() {
        this.playing = false;
        this.audio.currentTime = 0;
      },
      update() {
        this.currentSeconds = parseInt(this.audio.currentTime, 10);
      },
      close() {
        this.stop();
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss" scoped>
  $player-bg: rgba(0, 0, 0, 0.6);
  $player-border-color: darken($player-bg, 12%);
  $player-link-color: darken($player-bg, 75%);
  $player-progress-color: $player-border-color;
  $player-seeker-color: var(--main-accent-color);
  $player-seeker-hover-color: #92939A;
  //$player-text-color: $player-link-color;
  .player {
    position: sticky;
    bottom: (66px);
    /*width: 100%;*/
    padding: (7px) (16px);
    margin: 0 20px;
    background-color: $player-bg;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    z-index: 90;

    .icon-btn {
      ::v-deep .icon {
        fill: #fff;
        stroke: #fff;
        transition: var(--transition);
        cursor: pointer;
      }

      &:hover ::v-deep .icon {
        fill: var(--icon-accent-color);
      }
    }
  }

  .player-controls {
    display: flex;
    align-items: center;

    > .wt-icon-btn {
      display: flex;
      align-items: center;

      &:first-child {
        margin-right: (18px);
      }
    }
  }

  .player-progress {
    position: relative;
    height: (5px);
    /*height: 3px;*/
    flex-grow: 1;
    margin: auto 21px auto 78px;
    background-color: $player-progress-color;
    cursor: pointer;

    &:after { // make clickable area bigger
      content: '';
      position: absolute;
      top: (-5px);
      bottom: (-5px);
      left: 0;
      right: 0;
    }

    .player-seeker {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      background-color: $player-seeker-color;
      border-radius: var(--border-radius);
      pointer-events: none;
      z-index: 2;
    }

    .player-hover {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      background-color: $player-seeker-hover-color;
      border-radius: var(--border-radius);
      pointer-events: none;
      z-index: 1;
    }

    .player-timer {
      @extend %typo-body-md;
      position: absolute;
      right: 0;
      bottom: (33px);
      padding: (13px) (17px) (9px);
      color: #fff;
      transform: translateX(50%);
      background: $player-bg;
      border-radius: var(--border-radius);
    }
  }

  .player-time {
    display: flex;
    justify-content: space-between;
    width: (40px);
    margin-left: (33px);
    color: #fff;

    .player-time-current {
      @extend %typo-body-sm;
    }
  }

  .range-wrap {
    position: absolute;
    bottom: (56px);
    right: 0;
    padding: (8px) (16px) (11px);
    background: $player-bg;
    border-radius: var(--border-radius);
  }

  .volume-icon {
    margin-right: (33px);
    cursor: pointer;
  }

  .audio {
    display: none;
  }
</style>
