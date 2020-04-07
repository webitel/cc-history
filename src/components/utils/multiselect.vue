<template>
  <div class="hs-multiselect">
    <label class="hs-multiselect__label">{{label}}</label>
    <div class="hs-multiselect-wrap">
      <vue-multiselect
        v-model="value"
        :options="options"
        :placeholder="placeholder || label"
        :close-on-select="false"
        :limit="1"
        :limitText="limitText"
        :loading="isLoading"
        :internal-search="false"
        @search-change="fetch"
        multiple
      >
        <template slot="option" slot-scope="{ option }">
          <div class="multiselect__option__content">
            <span>{{option.name || option }}</span>
            <div class="multiselect__option__tick"></div>
          </div>
        </template>
      </vue-multiselect>
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
      options: {
        type: Array,
        required: true,
      },

      label: {
        type: String,
      },

      placeholder: {
        type: String,
      },
    },

    data: () => ({
      value: '',
      isLoading: false,
    }),

    created() {
      this.fetch = debounce(this.fetch);
    },

    methods: {
      limitText: (count) => `${count}`,

      async fetch(search) {
        this.isLoading = true;
        await setTimeout(() => {
          console.log(search);
          this.isLoading = false;
        }, 1000);
      },
    },
  };
</script>

<style lang="scss">
  @import "../../css/ui-components/multiselect-spinner";

  $label-color: #ACACAC;
  $border-color: #E6E6E6;
  $badge-bg: #FFE69C;
  $option-color: #FFF9E6;

  $select-paddings: calcRem(7px) calcRem(30px) calcRem(7px) calcRem(8px);

  .count-badge {
    @extend .typo-body-sm;
    display: block;
    background: $badge-bg;
    padding: calcRem(4px) calcRem(15px);
    border-radius: calcRem(20px);
  }

  .hs-multiselect-wrap {
    position: relative;
    width: calcRem(270px);
    height: calcRem(40px);
  }

  .hs-multiselect__label {
    @extend .typo-body-sm;
    display: block;
    margin-bottom: calcRem(13px);
    color: $label-color;
  }

  .multiselect {
    position: absolute;
    width: calcRem(270px);
    border: 1px solid $border-color;
    border-radius: $border-radius;
    background: #fff;
    cursor: pointer;

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

    &__element {
      @extend .typo-body-sm;
      width: 100%;
      transition: $transition;
      cursor: pointer;

      .multiselect__option {
        display: block;

        &:hover {
          background: $option-color;
        }

        &__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: $select-paddings;
          box-sizing: border-box;
        }

        &__tick {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          transition: $transition;
        }

        &:hover .multiselect__option__tick {
          background: $transfer-color;
        }

        &.multiselect__option--selected .multiselect__option__tick {
          background: $true-color;
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
