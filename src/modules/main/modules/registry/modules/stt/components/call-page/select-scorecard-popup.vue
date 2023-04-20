<template>
  <wt-popup
    class="column-select"
    width="480"
    overflow
    @close="$emit('close')"
  >
    <template v-slot:header>
      <h1 class="column-select__heading">{{$t('registry.call.evaluation.selectTheScorecard')}}</h1>
    </template>
    <template v-slot:main>
      <wt-select
        v-model="scorecard"
        :label="$t('registry.call.evaluation.scorecard')"
        :search-method="loadScorecards"
        :clearable="false"
      ></wt-select>
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
import AuditAPIRepository from '../../api/CallEvaluationAPI';

export default {
  name: 'select-scorecard-popup',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    scorecard: null,
  }),

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
    loadScorecards: (params) => AuditAPIRepository.getLookup({
                                                               ...params,
                                                               fields: ['id', 'name', 'questions'],
                                                               enabled: true,
                                                             }),
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
