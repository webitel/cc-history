<template>
  <div class="dt-picker" v-clickaway="close">
    <label class="dt-picker__label" @click="isOpened = false">{{label}}</label>

    <div
      class="dt-picker__preview"
      :class="{'dt-picker__preview--opened': isOpened}"
      tabindex="0"
      @click="isOpened = !isOpened"
      @keyup.enter="isOpened = !isOpened"
    >
      <div class="dt-picker__preview__wrap">
        <icon class="dt-picker__preview-icon">
          <svg class="icon icon-calendar_md md">
            <use xlink:href="#icon-calendar_md"></use>
          </svg>
        </icon>
        <div class="dt-picker__preview__title">{{previewLabel}}</div>
        <div class="dt-picker__preview__value">{{displayValue}}</div>
      </div>
      <icon class="dt-picker__preview-icon dt-picker__preview-arrow">
        <svg class="icon md">
          <use xlink:href="#icon-arrow-down_md"></use>
        </svg>
      </icon>
    </div>

    <div
      class="dt-picker__form"
      v-show="isOpened"
    >
      <div class="dt-picker__quick-filters">
        <span class="dt-picker__quick-filter" @click="setLastHour">
          {{$t('components.dtPicker.lastHour')}}
        </span>
        <span class="dt-picker__quick-filter" @click="setLastDay">
          {{$t('components.dtPicker.lastDay')}}
        </span>
      </div>
      <div class="dt-picker__form-wrap">
        <datepicker
          class="datepicker"
          :value="draft"
          :maximum-view="'day'"
          monday-first
          @input="setDraft($event.getTime())"
        ></datepicker>
        <timepicker
          :value="draft"
          @input="setDraft"
        ></timepicker>
      </div>
      <div class="dt-picker__actions">
        <btn class="primary" @click.native="input">{{$t('reusable.add')}}</btn>
        <btn class="secondary" @click.native="close">{{$t('reusable.cancel')}}</btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import Timepicker from './timepicker.vue';
  import Btn from './btn.vue';
  import clickaway from '../../directives/clickaway';

  export default {
    name: 'hs-datetimepicker',
    directives: {
      clickaway,
    },
    components: {
      Datepicker,
      Timepicker,
      Btn,
    },

    props: {
      value: {
        type: Number,
        required: true,
      },
      label: {
        type: String,
      },
      previewLabel: {
        type: String,
      },
    },

    watch: {
      isOpened: {
        handler() {
          this.draft = this.value;
        },
        immediate: true,
      },
    },

    data: () => ({
      isOpened: false,
      draft: 0,
    }),

    computed: {
      // prop value representation on picker preview
      displayValue() {
        const date = new Date(this.value).toLocaleDateString();
        const time = new Date(this.value).toTimeString()
          .slice(0, 5);
        return `${date} ${time}`;
      },
    },

    methods: {
      input() {
        this.$emit('input', this.draft);
        this.close();
      },

      close() {
        this.isOpened = false;
      },

      setDraft(value) {
        this.draft = value;
      },

      setLastHour() {
        const from = Date.now() - 60 * 60 * 10 ** 3; // 60 min x 60 sec x 1000 ms
        const to = Date.now();
        this.$emit('lastHour', {
          from,
          to,
        });
        this.close();
      },
      setLastDay() {
        const from = Date.now() - 24 * 60 * 60 * 10 ** 3; // 24hour x 60 min x 60 sec x 1000 ms
        const to = Date.now();
        this.$emit('lastDay', {
          from,
          to,
        });
        this.close();
      },
    },
  };
</script>

<style lang="scss">
  $date-value-color: #808080;
  $datepicker-bg-shadow-color: rgba(23, 26, 42, 0.8);

  .dt-picker {
    position: relative;
    display: inline-block;
  }

  .dt-picker__label {
    @extend .label;
    @extend .typo-body-sm;
    display: block;
    color: $label-color;
  }

  .dt-picker__preview {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 7px 7px 7px 9px; // 8px - border and 10px - border
    border: 1px solid $input-border-color;
    border-radius: $border-radius;
    cursor: pointer;
    outline: none;

    &--opened {
      border-color: $input-border-color__active;
    }

    &__wrap {
      display: flex;
      align-items: center;
    }

    &__title {
      @extend .typo-heading-sm;
      margin: 0 10px;
    }

    &__value {
      @extend .typo-body-sm;
      color: $date-value-color;
    }

    .dt-picker__preview-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    .dt-picker__preview-arrow {
      margin-left: auto;

      .icon {
        fill: #000;
        stroke: #000;
      }
    }
  }

  .dt-picker__form {
    @extend .box-shadow;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: (20px) (10px) (30px);
    background: #fff;
    border-radius: $border-radius;
    z-index: 2;
  }

  .dt-picker__quick-filters {
    text-align: center;
    margin-bottom: (37px);
  }

  .dt-picker__quick-filter {
    @extend .typo-body-sm;
    text-decoration: underline;
    cursor: pointer;

    &:first-child {
      margin-right: (30px);
    }
  }

  .dt-picker__form-wrap {
    display: flex;
    flex-direction: column;

    .datepicker {
      input {
        display: none;
      }

      .vdp-datepicker__calendar {
        display: block !important;
        position: static;
        width: (252px);
        margin: auto;
        line-height: (36px) !important;
        border: none;
        border-radius: $border-radius;


        header {
          display: flex;
          justify-content: space-between;
          align-content: center;
          margin-bottom: (24px);
          line-height: 0;

          .day__month_btn {
            @extend .typo-heading-sm;
            padding-top: (5px);
          }

          .prev, .next {
            float: none;
            text-indent: 0;
            color: transparent;

            &:hover {
              background-color: transparent !important;
            }

            &:after {
              content: '';
              position: absolute;
              top: (5px);
              width: (24px);
              height: (24px);
              background: url("../../assets/arrows/arrow-left.svg") center center;
              background-size: contain;
              border: none; // hide default arrows
              transform: translateX(-50%);
            }

            &:hover:after {
              color: #000;
            }
          }

          .next:after {
            transform: translateX(-50%) rotate(180deg);
          }
        }

        .cell {
          width: (36px);
          height: (36px);
          padding: 0;
          line-height: (36px);
          font-size: (12px);
          transition: $transition;

          &.day-header {
            letter-spacing: 0.4px;
            color: $icon-color !important;
          }

          &.day {
            border-radius: 50%;

            &.selected {
              background: $accent-color;

              &:hover {
                background: $accent-color !important;
              }
            }

            &:not(.blank):not(.disabled).day:hover,
            &:not(.blank):not(.disabled).month:hover,
            &:not(.blank):not(.disabled).year:hover {
              background: #F2F2F2;
              border-color: transparent;
            }
          }

          &.month {
            &.selected {
              border-bottom-color: $label-color;

              &:hover {
                border-bottom-color: $accent-color !important;
              }
            }

            &:not(.blank):not(.disabled).day:hover,
            &:not(.blank):not(.disabled).month:hover,
            &:not(.blank):not(.disabled).year:hover {
              border-bottom-color: $icon-color !important;
            }
          }
        }
      }
    }

    .timepicker {
      margin: 30px auto 0;
    }
  }

  .dt-picker__actions {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .cc-btn {
      min-width: 110px;

      &.secondary {
        margin-left: 30px;
      }
    }
  }
</style>
