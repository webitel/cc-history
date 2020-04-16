<template>
  <section class="history-section history-main">
    <grid-table
      :headers="headers"
      :data="data"
      :page="page"
      :size="size"
      expanded
      @pageChange="setQueryValue({ filterQuery: 'page', value: $event })"
      @sizeInput="size = $event"
      @sizeChange="setQueryValue({ filterQuery: 'size', value: $event })"
      @sort="setSort"
      @shownColumns="setShownColumns"
    >
      <template slot="actions">
        <button class="icon-btn table-action" @click.prevent.stop="download">
          <icon>
            <svg class="icon icon-download_md md">
              <use xlink:href="#icon-download_md"></use>
            </svg>
          </icon>
        </button>
        <button class="icon-btn table-action" @click.prevent.stop="play">
          <icon>
            <svg class="icon icon-play_md md">
              <use xlink:href="#icon-play_md"></use>
            </svg>
          </icon>
        </button>
      </template>

      <template slot="row-expansion" slot-scope="{ item }">
        <div class="expansion__content-wrap">
          <h1 class="expansion__heading">Call info</h1>
          {{item}}
        </div>
        <div class="expansion__comments">
          <h1 class="expansion__heading">Operator comment</h1>
          <article class="agent-comment">
            <div class="agent-comment__pic">
              <img src="../../assets/default-avatar.svg" alt="agent pic">
            </div>
            <div class="agent-comment__comment">
              <h2 class="agent-comment__comment__heading">Agent name</h2>
              <p class="agent-comment__comment__text">Рынок финансовых услуг интересен всем
                федеральным игрокам. Но возможности мобильных
                платежей с использованием операторского счета ограничивает конкуренция с
                традиционным и мобильным банкингом, говорит Анкилов.</p>
            </div>
          </article>
        </div>
      </template>
    </grid-table>
    <audio-player
      v-show="isShowPlayer"
      :file="audioLink"
      @play="currentlyPlaying = true"
      @pause="currentlyPlaying = false"
      @close="isShowPlayer = false"
    ></audio-player>
  </section>
</template>

<script>
  import GridTable from '../utils/grid-table.vue';
  import AudioPlayer from '../utils/audio-player.vue';
  import { getHistory } from '../../api/history/history';
  import urlQueryControllerMixin from '../../mixins/urlQueryControllerMixin';

  export default {
    name: 'history-main',
    mixins: [
      urlQueryControllerMixin,
    ],
    components: {
      GridTable,
      AudioPlayer,
    },
    data: () => ({
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Calories',
          value: 'calories',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Fat (g)',
          value: 'fat',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Carbs (g)',
          value: 'carbs',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Protein (g)',
          value: 'protein',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Iron (%)',
          value: 'iron',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
      ],
      data: [
        {
          _isSelected: false,
          name: 'Frozen Yogurt',
          calories: [159, 122, 1222, 123],
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          _isSelected: true,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          _isSelected: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          _isSelected: true,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          _isSelected: true,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          _isSelected: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          _isSelected: true,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          _isSelected: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          _isSelected: true,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          _isSelected: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
      page: 1,
      size: '10',
      audioLink: '',
      isShowPlayer: true,
      currentlyPlaying: false,
    }),

    watch: {
      // eslint-disable-next-line func-names
      '$route.query.page': {
        handler() {
          this.page = +this.parseQueryValue({ filterQuery: 'page' }) || 0;
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.size': {
        handler() {
          this.size = this.parseQueryValue({ filterQuery: 'size' });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.cols': {
        handler(cols) {
          this.getShownColumns(cols);
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.sort': {
        handler(sort) {
          this.getSortColumns(sort);
        },
        immediate: true,
      },
    },

    created() {
      // this.loadDataList();
    },

    methods: {
      play() {
      },

      download() {
      },

      async loadDataList() {
        await getHistory({});
      },

      setShownColumns(headers) {
        const filterQuery = 'cols';
        const value = headers.filter((item) => item.show)
          .map((item) => item.value)
          .join(',');
        this.filter({
          value,
          filterQuery,
        });
      },

      setSort({ column, order }) {
        const filterQuery = 'sort';
        this.headers.find((col) => col === column).sort = order;
        const value = this.headers
          .filter((item) => item.show && item.sort)
          .map((item) => `${item.value}=${item.sort}`)
          .join(',');
        this.setQueryValue({
          value,
          filterQuery,
        });
      },

      getShownColumns(cols) {
        if (cols) {
          const isDefaultCols = !cols;
          this.headers = this.headers.map((header) => ({
            ...header,
            show: isDefaultCols || cols.includes(header.value),
          }));
        }
      },

      getSortColumns(sort) {
        if (sort) {
          const sortedColumns = {};
          sort.split(',')
            .forEach((colStr) => {
              const col = {
                value: colStr.split('=')[0],
                order: colStr.split('=')[1],
              };
              sortedColumns[col.value] = col.order;
            });
          this.headers = this.headers.map((header) => ({
            ...header,
            sort: sortedColumns[header.value] || null,
          }));
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .history-main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: calcRem(20px) calcRem(30px);
  }

  .table-action {
    margin-left: calcRem(20px);

    &:first-child {
      margin-left: 0;
    }
  }

  .expansion__call-info,
  .expansion__comments {
    flex: 0 0 50%;
  }

  .expansion__comments {
    margin-left: calcRem(60px);
  }

  .expansion__heading {
    @extend .typo-heading-sm;
    margin-bottom: calcRem(30px);
  }

  .agent-comment {
    display: flex;

    &__pic {
      width: calcRem(60px);
      height: calcRem(60px);
      flex: 0 0 calcRem(60px);
      margin-right: calcRem(20px);
    }

    &__comment {
      &__heading {
        @extend .typo-heading-sm;
        margin-bottom: calcRem(10px);
      }

      &__text {
        @extend .typo-body-md;
      }
    }
  }
</style>
