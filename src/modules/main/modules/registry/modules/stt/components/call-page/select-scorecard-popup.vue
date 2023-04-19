<template>
  <wt-popup
    class="column-select"
    width="500"
    @close="$emit('close')"
  >
    <template v-slot:header>
      <h1 class="column-select__heading">{{$t('registry.call.evaluation.selectTheScorecard')}}</h1>
    </template>
    <template v-slot:main>
      <wt-select
        v-model="scorecard"
        :label="$t('registry.call.evaluation.scorecard')"
        :options="some"
        track-by="value"
        :clearable="false"></wt-select>
    </template>
    <template v-slot:actions>
      <wt-button
        @click="selectScorecard"
      >{{ $t('reusable.start') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >{{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
  name: 'select-scored-popup',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  // model: {
  //   prop: 'value',
  //   event: 'change',
  // },

  data: () => ({
    draft: [], // headers draft
    some: ['some', 'some', 'some', 'some'],
    scorecard: null,
  }),
  created() {
    console.log('scorecards in popup:', this.value);
  },

  // watch: {
  //   value: {
  //     handler() {
  //       this.fillHeadersDraft();
  //     },
  //     immediate: true,
  //   },
  // },

  methods: {
    selectScorecard() {
      this.$emit('change', this.scorecard);
    },
  },
};
</script>

<style lang="scss" scoped>
.column-select__heading {
  text-align: center;
}

.column-select__list {
  @extend %wt-scrollbar;
  max-height: 35vh;
  min-width: 550px;
  overflow: auto;
}

.column-select__item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.wt-button:first-child {
  margin-right: 20px;
}
</style>
