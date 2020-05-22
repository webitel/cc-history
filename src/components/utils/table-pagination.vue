<template>
  <footer class="pagination">
    <div class="rows-per-page">
      <div class="rows-per-page__text">Rows per page:</div>
      <input
        class="input__short rows-per-page__input"
        ref="input"
        :value="value"
        :placeholder="'10'"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="page-controls">
      <div class="controls">
        <button
          class="icon-btn"
          :class="{'disabled': !isPrev}"
          @click="prev"
        >
          <icon>
            <svg class="icon icon-arrow-left_md md">
              <use xlink:href="#icon-arrow-left_md"></use>
            </svg>
          </icon>
        </button>
        <button
          class="icon-btn"
          :class="{'disabled': !isNext}"
          @click="next"
        >
          <icon>
            <svg class="icon icon-arrow-right_md md">
              <use xlink:href="#icon-arrow-right_md"></use>
            </svg>
          </icon>
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
  import debounce from '../../utils/debounce';

  export default {
    name: 'table-pagination',
    props: {
      value: {
        type: String,
        required: true,
      },
      isNext: {
        type: Boolean,
        required: true,
      },
      isPrev: {
        type: Boolean,
        required: true,
      },
    },

    watch: {
      value() {
        this.debouncer.call(this);
      },
    },

    created() {
      this.debouncer = debounce(this.debouncer);
    },

    methods: {
      next() {
        this.$emit('next');
      },
      prev() {
        this.$emit('prev');
      },

      debouncer() {
        this.$emit('changeSize', this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $border-color: #E6E6E6;

  .pagination {
    @extend .typo-body-md;

    display: flex;
    align-items: center;
    width: fit-content;
    margin-left: auto;

    .rows-per-page {
      display: flex;
      align-items: center;
      margin-right: 28px;

      .rows-per-page__text {
        margin-right: (5px);
      }

      .rows-per-page__input {
        width: (50px);
      }
    }

    .page-controls {
      display: flex;
      align-items: center;

      .controls {
        margin-left: 14px;

        .icon-btn {
          &.disabled {
            pointer-events: none;

            .icon {
              fill: $btn-disabled;
              stroke: $btn-disabled;
            }
          }
        }
      }
    }
  }
</style>
