<template>
  <div class="column-select">
    <button
      class="icon-btn"
      @click.prevent="isOpened = true"
    >+
    </button>
    <popup-container v-if="isOpened">
      <template slot="popup-header">
        <h1 class="popup-header__h1">Select columns to show: </h1>
      </template>
      <template slot="popup-main">
        <ul class="column-select__list">
          <li
            class="column-select__list__item"
            v-for="(col, key) of value"
            :key="key"
            @click.capture.prevent="col._isShown = !col._isShown"
          >
            <checkbox :value="col._isShown" />
            <span>{{col.text}}</span>
          </li>
        </ul>
      </template>
      <template slot="popup-footer">
        <div class="popup-actions">
          <btn
            class="primary"
            @click.native="filter"
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
  import filterMixin from '../../mixins/filterMixin';

  export default {
    name: 'table-column-select',
    mixins: [filterMixin],
    components: {
      PopupContainer,
      Btn,
      Checkbox,
    },
    props: {
      headers: {
        type: Array,
        required: true,
      },
    },

    data: () => ({
      isOpened: false,
      filterQuery: 'cols',
      joinSymbol: ',',
      value: [], // headers draft
    }),

    created() {
      this.setHeadersDraft();
    },

    methods: {
      setHeadersDraft() {
        this.value = this.headers.map((header) => ({
          text: header.text,
          value: header.value,
          _isShown: !!header._isShown,
        }));
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
