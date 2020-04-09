<template>
  <div class="grid-table">
    <div class="grid">
      <header class="grid__tr grid__tr__header">
        <div class="grid__th grid__th__checkbox">
          <checkbox
            :value="isAllSelected"
            @input="selectAll"
          ></checkbox>
        </div>
        <div
          class="grid__th"
          v-for="(col, key) of headers"
          :key="key"
        >{{col.text}}
        </div>
        <div class="grid__th grid__th__actions"></div>
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
            <div class="grid__td grid__td__checkbox">
              <checkbox
                v-model="row._isSelected"
              ></checkbox>
            </div>

            <div
              class="grid__td"
              v-for="(col, headerKey) of headers"
              :key="headerKey"
            >
              <slot :name="col.value">
                {{row[col.value]}}
              </slot>
            </div>

            <div class="grid__td grid__td__actions">
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

  export default {
    name: 'grid-table',
    components: {
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

    computed: {
      isAllSelected() {
        return this.data.every((item) => item._isSelected);
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
  $border-color: #EAEAEA;
  $hover-bg-color: #FFF9E6;
  $active-bg-color: #FFE69C;
  $header-color: #ACACAC;
  $second-row-bg-color: #F9F9F9;

  .grid-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 100%;
  }

  .grid {
    &__row-wrap {
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

      &__actions {
        display: flex;
      }
    }

    .grid__expansion {
      display: flex;
      padding: calcRem(30px) calcRem(74px);
    }
  }

  .pagination {
    margin-top: calcRem(20px);
  }
</style>
