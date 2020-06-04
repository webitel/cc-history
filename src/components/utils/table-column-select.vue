<template>
  <popup-container class="column-select" @keydown.esc="$emit('close')">
    <template slot="popup-header">
      <h1 class="popup-header__h1">Select columns to show: </h1>
    </template>
    <template slot="popup-main">
      <ul class="column-select__list">
        <li
          class="column-select__item"
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
          @click.native="$emit('close')"
        >Close
        </btn>
      </div>
    </template>
  </popup-container>
</template>

<script>
  import deepCopy from 'deep-copy';
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
      },

      fillHeadersDraft() {
        this.draft = deepCopy(this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .column-select__list {
    @extend .cc-scrollbar;
    max-height: 35vh;
    min-width: (550px);
    overflow: auto;
  }

  .column-select__item {
    display: flex;
    align-items: center;
    margin-bottom: (16px);
    cursor: pointer;

    .checkbox {
      margin-right: (10px);
    }
  }

  .popup-actions {
    .cc-btn {
      min-width: (120px);

      &.primary {
        margin-right: (20px);
      }
    }
  }
</style>
