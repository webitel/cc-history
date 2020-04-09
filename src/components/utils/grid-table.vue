<template>
  <div class="grid">
    <header class="grid__tr grid__tr__header">
      <div class="grid__th grid__th__checkbox">
        []
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
          @click="expand(dataKey)"
        >
          <div class="grid__td grid__td__checkbox">
            []
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
          <slot name="row-expansion" slot-scope="">
          </slot>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'grid-table',
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

    methods: {
      expand(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      },

      selectAll() {
        this.$emit('selectAll');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .grid {
    &__tr {
      display: grid;
      grid-template-columns: calcRem(24px) repeat(6, 1fr) calcRem(68px);
      grid-column-gap: calcRem(20px);
      border: 1px solid red;
    }

    &__th, &__td {
      border: 1px solid blue;
    }

    .grid__expansion {
      background: green;
    }
  }
</style>
