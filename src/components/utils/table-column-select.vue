<template>
  <div class="column-select">
    <button class="icon-btn">+</button>
    <popup-container>
      <template slot="popup-header">
        <h1 class="popup-header__h1">Select columns to show: </h1>
      </template>
      <template slot="popup-main">
        <ul class="column-select__list">
          <li
            class="column-select__list__item"
            v-for="(col, key) of headers"
            :key="key"
          >
            <checkbox v-model="col._isShown"/>
            <span>{{col.text}}</span>
          </li>
        </ul>
      </template>
      <template slot="popup-footer">
        <div class="popup-actions">
          <btn class="primary">Add</btn>
          <btn class="secondary">Close</btn>
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
      headers: {
        type: Array,
        required: true,
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
