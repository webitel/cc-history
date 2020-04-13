<template>
  <div class="grid-table">
    <div class="grid">
      <header class="grid__tr grid__tr__header">
        <div class="grid__th__checkbox">
          <checkbox
            :value="isAllSelected"
            @input="selectAll"
          ></checkbox>
        </div>
        <div
          class="grid__th"
          v-for="(col, key) of shownHeaders"
          :key="key"
        >{{col.text}}
        </div>
        <div class="grid__th__actions">
          <column-select :headers="headers"/>
        </div>
      </header>

      <section class="grid__body">
        <div
          class="grid__row-wrap"
          v-for="(row, dataKey) of data"
          :key="dataKey"
        >

          <div
            class="grid__tr grid__tr__body"
            :class="{'expanded': expanded && expandedIndex === dataKey}"
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
              <slot :name="col.value">
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
              <slot name="actions"></slot>
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
    <pagination
      v-model="size"
      :is-next="true"
      :is-prev="true"
    />
  </div>
</template>

<script>
  import Checkbox from './checkbox.vue';
  import Pagination from './table-pagination.vue';
  import CountBadge from './count-badge.vue';
  import ColumnSelect from './table-column-select.vue';

  export default {
    name: 'grid-table',
    components: {
      ColumnSelect,
      CountBadge,
      Checkbox,
      Pagination,
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
      size: '10',
      expandedIndex: null,
    }),

    watch: {
      headers() {
        this.changeColumnsNumStyle();
      },
    },

    mounted() {
      this.changeColumnsNumStyle();
    },

    computed: {
      isAllSelected() {
        return this.data.every((item) => item._isSelected);
      },

      shownHeaders() {
        return this.headers.filter((header) => header.show);
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

      changeColumnsNumStyle() {
        const calcRem = (size) => `${parseInt(size, 10) / 16}rem`; // calc function

        let gridTemplateColumns = calcRem('24px'); // checkbox
        this.shownHeaders.forEach((header) => {
          gridTemplateColumns += ` ${header.width}`;
        });
        gridTemplateColumns += ` ${calcRem('68px')}`; // actions

        const rows = document.getElementsByClassName('grid__tr');
        // eslint-disable-next-line no-param-reassign,no-return-assign
        rows.forEach((row) => row.style.gridTemplateColumns = gridTemplateColumns);
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
    @extend .cc-scrollbar;
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

      &__body {
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

      &:hover {
        color: #000;
      }
    }

    &__th, &__td {
      @extend .typo-body-md;
      min-width: $min-td-width;
      width: 100%;
      max-width: 100%;

      &__word-wrap {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }

      &__actions {
        display: flex;
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
