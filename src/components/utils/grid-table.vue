<template>
  <div class="grid-table">
    <div class="grid">
      <header
        class="grid__tr grid__tr__header"
        :style="computeColumnsNumStyle"
      >
        <div class="grid__th__checkbox">
          <checkbox
            :value="isAllSelected"
            @input="selectAll"
          ></checkbox>
        </div>
        <div
          class="grid__th"
          :class="`grid__th__sort--${col.sort}`"
          v-for="(col, key) of shownHeaders"
          :key="key"
          @click="$emit('sort', col)"
        >{{col.text}}
        </div>
        <div class="grid__th__actions">
          <slot name="actions-header"></slot>
        </div>
      </header>

      <section class="grid__body" :class="{'grid-body__expanding': expanded}">
        <div
          class="grid__row-wrap"
          v-for="(row, dataKey) of data"
          :key="dataKey"
        >

          <div
            class="grid__tr grid__tr__body"
            :class="{'expanded': expanded && expandedIndex === dataKey}"
            :style="computeColumnsNumStyle"
            @click="expand(dataKey)"
          >
            <div class="grid__td__checkbox">
              <checkbox
                v-model="row._isSelected"
              ></checkbox>
            </div>

            <div
              class="grid__td"
              v-for="(col, headerKey) of shownHeaders"
              :key="headerKey"
            >
              <slot :name="col.value" :item="row">
                <div
                  class="grid__td__word-wrap"
                  v-if="!Array.isArray(row[col.value])"
                >{{row[col.value]}}
                </div>
                <div class="grid__td__array-value" v-else>
                  {{row[col.value][0]}}
                  <count-badge
                    v-if="row[col.value].length > 1"
                    class="table-badge"
                    :length="row[col.value].length"
                  ></count-badge>
                </div>
              </slot>
            </div>

            <div class="grid__td__actions">
              <slot name="actions" :item="row"></slot>
            </div>
          </div>

          <div
            class="grid__expansion"
            v-if="expanded && expandedIndex === dataKey"
          >
            <slot name="row-expansion" :item="row">
            </slot>
          </div>
        </div>
      </section>
    </div>
    <slot name="pagination"></slot>
  </div>
</template>

<script>
  import Checkbox from './checkbox.vue';
  import CountBadge from './count-badge.vue';
  import calcRem from '../../utils/calcRem';

  export default {
    name: 'grid-table',
    components: {
      CountBadge,
      Checkbox,
    },
    props: {
      headers: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      expanded: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      expandedIndex: null,
    }),

    computed: {
      isAllSelected() {
        return this.data.every((item) => item._isSelected);
      },

      shownHeaders() {
        return this.headers.filter((header) => header.show);
      },

      computeColumnsNumStyle() {
        let gridTemplateColumns = calcRem('24px'); // checkbox
        this.shownHeaders.forEach((header) => {
          gridTemplateColumns += ` ${header.width}`;
        });
        gridTemplateColumns += ` ${calcRem('68px')}`; // actions
        return `grid-template-columns: ${gridTemplateColumns}`;
      },
    },

    methods: {
      expand(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      },

      selectAll() {
        const { isAllSelected } = this;
        // eslint-disable-next-line no-param-reassign,no-return-assign
        this.data.forEach((item) => item._isSelected = !isAllSelected);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $hover-bg-color: $list-option__hover;
  $active-bg-color: $list-option__hover;
  $header-color: $label-color;
  $second-row-bg-color: #F9F9F9;

  $min-td-width: calcRem(120px);

  .grid-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 100%;
  }

  .grid {
    overflow: auto;

    &__row-wrap {
      min-width: fit-content;

      &:nth-child(2n) {
        background: $second-row-bg-color;
      }
    }

    &__tr {
      display: grid;
      grid-template-columns: calcRem(24px) repeat(6, 1fr) calcRem(68px);
      grid-column-gap: calcRem(20px);
      padding: calcRem(14px) calcRem(10px);
      transition: $transition;

      &.expanded .grid__td {
        @extend .typo-heading-sm;
      }

    }

    .grid__body.grid-body__expanding {
      .grid__tr {
        cursor: pointer;

        &:hover {
          background: $hover-bg-color;
        }
      }
    }

    &__th {
      color: $header-color;
      text-decoration: underline;
      transition: $transition;
      cursor: pointer;

      &__sort {
        /*color:;*/
        &--asc {
          color: #000;
        }

        &--desc {
          color: #000;
        }
      }

      &:hover {
        color: #000;
      }
    }

    &__th, &__td {
      @extend .typo-body-md;
      //min-width: $min-td-width;
      width: 100%;
      max-width: 100%;

      &__word-wrap {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }

      &__actions {
        display: flex;
        justify-content: flex-end;
      }
    }

    .grid__expansion {
      display: flex;
      padding: calcRem(30px) calcRem(74px);
    }
  }

  .grid__td__array-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .column-select {
    margin-left: auto;
  }

  .pagination {
    margin-top: calcRem(20px);
  }
</style>
