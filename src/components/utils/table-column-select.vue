<template>
  <div class="column-select" @keydown.esc="isOpened = false">
    <button
      class="icon-btn"
      @click.prevent="isOpened = true"
    >
      <icon>
        <svg class="icon icon-col-select_md md">
          <use xlink:href="#icon-col-select_md"></use>
        </svg>
      </icon>
    </button>
    <popup-container v-if="isOpened">
      <template slot="popup-header">
        <h1 class="popup-header__h1">Select columns to show: </h1>
      </template>
      <template slot="popup-main">
        <ul class="column-select__list">
          <li
            class="column-select__list__item"
            v-for="(col, key) of draft"
            :key="key"
            @click.capture.prevent="col.show = !col.show"
          >
            <checkbox :value="col.show"/>
            <span>{{col.text}}</span>
          </li>
        </ul>
      </template>
      <template slot="popup-footer">
        <div class="popup-actions">
          <btn
            class="primary"
            @click.native="setShownColumns"
          >Add
          </btn>
          <btn
            class="secondary"
            @click.native="isOpened = false"
          >Close
          </btn>
        </div>
      </template>
    </popup-container>
  </div>
</template>

<script>
  import PopupContainer from './popup-container.vue';
  import Btn from './btn.vue';
  import Checkbox from './checkbox.vue';

  export default {
    name: 'table-column-select',
    components: {
      PopupContainer,
      Btn,
      Checkbox,
    },
    props: {
      value: {
        type: Array,
        required: true,
      },
    },

    model: {
      prop: 'value',
      event: 'change',
    },

    data: () => ({
      isOpened: false,
      draft: [], // headers draft
    }),

    watch: {
      value: {
        handler() {
          this.fillHeadersDraft();
        },
        immediate: true,
      },
    },

    methods: {
      setShownColumns() {
        this.$emit('change', this.draft);
        this.isOpened = false;
      },

      fillHeadersDraft() {
        this.draft = [...this.value];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .column-select__list {
    @extend .cc-scrollbar;
    max-height: 35vh;
    min-width: calcRem(550px);
    overflow: auto;

    &__item {
      display: flex;
      align-items: center;
      margin-bottom: calcRem(16px);
      cursor: pointer;

      .checkbox {
        margin-right: calcRem(10px);
      }
    }
  }

  .popup-actions {
    .cc-btn {
      min-width: calcRem(120px);

      &.primary {
        margin-right: calcRem(20px);
      }
    }
  }
</style>
