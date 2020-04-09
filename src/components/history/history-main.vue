<template>
  <section class="history-main">
    <div class="grid">
      <header class="grid__tr grid__tr__header">
        <div class="grid__th"
             v-for="(col, key) of headers"
             :key="key"
        >{{col.text}}
        </div>
      </header>
      <section class="grid__body">
        <div class="grid__row-wrap"
             v-for="(row, dataKey) of data"
             :key="dataKey"
        >
          <div class="grid__tr grid__tr__body"
               @click="expand(dataKey)"
          >
            <div class="grid__td"
                 v-for="(col, headerKey) of headers"
                 :key="headerKey"
            > {{row[col.value]}}
            </div>
          </div>
          <div class="grid__expansion"
               v-if="expandedIndex === dataKey"
          >
            EXPANSION GOES HERE!
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'history-main',
    data: () => ({
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Calories',
          value: 'calories',
        },
        {
          text: 'Fat (g)',
          value: 'fat',
        },
        {
          text: 'Carbs (g)',
          value: 'carbs',
        },
        {
          text: 'Protein (g)',
          value: 'protein',
        },
        {
          text: 'Iron (%)',
          value: 'iron',
        },
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
      expandedIndex: null,
      colNum: 6,
    }),

    watch: {
      num() {
        this.changeColumnsNum();
      },
    },

    methods: {
      expand(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      },

      // TEMPLATE, NOT FOR USING
      changeColumnsNum() {
        if (this.colNum // if not 0 and not bigger than data columns
          && this.colNum <= this.headers.length) {
          const rows = document.getElementsByClassName('grid__tr');
          // eslint-disable-next-line no-param-reassign,no-return-assign
          rows.forEach((row) => row.style.gridTemplateColumns = `repeat(${this.colNum}, 1fr)`);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .grid {
    &__tr {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
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
