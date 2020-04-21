<template>
  <div class="hs-multiselect">
    <label class="label">{{label}}</label>
    <div class="hs-multiselect-wrap">
      <vue-multiselect
        :class="{'opened': isOpened}"
        :value="value"
        :options="opts"
        :placeholder="placeholder || label"
        :close-on-select="false"
        :limit="1"
        :label="'name'"
        :track-by="trackBy"
        :limitText="limitText"
        :loading="false"
        :internal-search="!apiMode"
        @input="$emit('input', $event)"
        @search-change="fetch"
        @open="isOpened = true"
        @close="close"
        multiple
      >
        <template slot="option" slot-scope="{ option }">
          <div class="multiselect__option__content">
            <span>{{option.name || option }}</span>
            <icon class="multiselect__option__tick">
              <svg class="icon icon-tick_sm sm">
                <use xlink:href="#icon-tick_sm"></use>
              </svg>
            </icon>
          </div>
        </template>
      </vue-multiselect>
      <icon class="hs-multiselect__arrow-down">
        <svg class="icon icon-arrow-down_md md">
          <use xlink:href="#icon-arrow-down_md"></use>
        </svg>
      </icon>
    </div>
  </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect';
  import debounce from '../../utils/debounce';

  export default {
    name: 'multiselect',
    components: {
      VueMultiselect,
    },
    props: {
      value: {
        type: [Array, Object],
        required: true,
      },

      options: {
        type: Array,
      },

      label: {
        type: String,
      },

      placeholder: {
        type: String,
      },

      trackBy: {
        type: String,
        default: 'id',
      },

      apiMode: {
        type: Boolean,
        default: true,
      },

      fetchMethod: {
        type: Function,
      },
    },

    data: () => ({
      isLoading: false,
      isOpened: false,
      fetchedOptions: [],
    }),

    created() {
      this.fetch();
      this.fetch = debounce(this.fetch);
    },

    computed: {
      opts() {
        const options = this.apiMode ? this.fetchedOptions : this.options;
        const optionsDiff = options.filter((item) => !this.value
          .some((valueItem) => valueItem[this.trackBy] === item[this.trackBy]));
        return [...this.value, ...optionsDiff];
      },
    },

    methods: {
      limitText: (count) => `${count}`,

      async fetch(search) {
        if (this.apiMode) {
          this.fetchedOptions = await this.fetchMethod(search);
        }
      },

      close() {
        this.$emit('closed');
        this.isOpened = false;
      },
    },
  };
</script>

<style lang="scss">
  @import "../../css/ui-components/multiselect-spinner";

  $select-paddings: calcRem(7px) calcRem(30px) calcRem(7px) calcRem(8px);

  .hs-multiselect-wrap {
    position: relative;
    width: 100%;
    height: calcRem(40px);
  }

  .hs-multiselect__arrow-down {
    position: absolute;
    top: 50%;
    right: calcRem(3px);
    transform: translateY(-50%);
    pointer-events: none;

    .icon {
      fill: #000;
      stroke: #000
    }
  }

  .multiselect {
    position: absolute;
    width: 100%;
    border: 1px solid $input-border-color;
    border-radius: $border-radius;
    background: #fff;
    cursor: pointer;
    transition: $transition;

    &.opened {
      z-index: 1;
    }

    &:hover, &.opened {
      border-color: #000;
    }

    // visible area
    &__tags {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: calcRem(40px);
      padding: $select-paddings;
      box-sizing: border-box;

      .multiselect__strong {
        @extend .count-badge;
        font-weight: normal;
      }

      .multiselect__placeholder {
        @extend .typo-body-sm;
        color: $label-color;
      }

      .multiselect__input {
        @extend .typo-body-sm;
        outline: none;
        border: none;
      }

      .multiselect__tag {
        @extend .typo-body-sm;
      }
    }

    // options
    &__content-wrapper {
      @extend .cc-scrollbar;
      overflow: auto;
    }

    &__content {
      width: 100%;
    }

    // empty/not found texts
    li:not(.multiselect__element) {
      @extend .typo-body-sm;
      padding: $select-paddings;
    }

    &__element {
      @extend .typo-body-sm;
      width: 100%;
      transition: $transition;
      cursor: pointer;

      .multiselect__option {
        display: block;
        border-radius: $border-radius;

        &:hover {
          background: $list-option__hover;
        }

        &__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: $select-paddings;
          padding-right: calcRem(8px);
          box-sizing: border-box;
        }

        .multiselect__option__tick .icon {
          fill: transparent;
          stroke: transparent;
        }

        &:hover .multiselect__option__tick .icon {
          fill: #000;
          stroke: #000;
        }

        &.multiselect__option--selected
        .multiselect__option__tick .icon {
          fill: $true-color;
          stroke: $true-color;
        }
      }
    }

    &:not(.multiselect--active) {
      .multiselect__input {
        display: none;
      }
    }

    &--active {
      .multiselect__tags-wrap,
      .multiselect__strong {
        display: none !important;
      }
    }
  }
</style>
