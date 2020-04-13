<template>
  <section class="history-section history-main">
    <grid-table
      :headers="headers"
      :data="data"
      expanded
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

  export default {
    name: 'history-main',
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
          _isShown: true,
        },
        {
          text: 'Calories',
          value: 'calories',
          _isShown: true,
        },
        {
          text: 'Fat (g)',
          value: 'fat',
          _isShown: true,
        },
        {
          text: 'Carbs (g)',
          value: 'carbs',
          _isShown: true,
        },
        {
          text: 'Protein (g)',
          value: 'protein',
          _isShown: true,
        },
        {
          text: 'Iron (%)',
          value: 'iron',
          _isShown: true,
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
      audioLink: 'https://dl3s1.muzofond.fm/aHR0cDovL2YubXAzcG9pc2submV0L21wMy8wMDMvMDYyLzk5My8zMDYyOTkzLm1wMw==',
      isShowPlayer: true,
      currentlyPlaying: false,
      colNum: 6,
    }),

    watch: {
      num() {
        this.changeColumnsNum();
      },
    },

    methods: {
      play() {
      },

      download() {
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
