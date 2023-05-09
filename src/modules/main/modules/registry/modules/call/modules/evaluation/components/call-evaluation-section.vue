<template>
  <section class="call-evaluation">
    <call-no-evaluation
      v-if="!scorecard.questions && !result.id"
      @rate="handleScorecardsPopup"
    />
    <call-evaluation-form
      v-if="scorecard.questions && !result.id"
      :scorecard="scorecard"
      :call-id="call.id"
      :namespace="namespace"
      @close="closeEvaluationForm"
    />
    <select-scorecard-popup
      v-show="isScorecardSelectOpened && !scorecard.questions"
      @change="setScorecard"
      @close="handleScorecardsPopup"
    />
    <call-evaluation-result v-if="result.id" :value="result"/>
    <wt-loader v-show="isLoading"/>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import CallEvaluationResult from './call-evaluation-result.vue';
import SelectScorecardPopup from './select-scorecard-popup.vue';
import CallNoEvaluation from './call-no-evaluation-section.vue';
import CallEvaluationForm from './call-evaluation-form.vue';

export default {
  name: 'call-evaluation',
  components: {
    CallEvaluationForm,
    CallEvaluationResult,
    SelectScorecardPopup,
    CallNoEvaluation,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  data: () => ({
    isScorecardSelectOpened: false,
    scorecard: {},
  }),
  mounted() {
    if (this.call.rateId) this.loadResult(this.call.rateId);
  },
  computed: {
    ...mapState({
        isLoading(state) {
          return getNamespacedState(state, this.namespace).isEvalLoading;
        },
        result(state) {
          return getNamespacedState(state, this.namespace).result;
        },
      }),
  },
  methods: {
    ...mapActions({
      loadResult(dispatch, payload) {
        return dispatch(`${this.namespace}/GET_EVALUATION`, payload);
      },
    }),
    setScorecard(value) {
      this.scorecard = value;
    },
    closeEvaluationForm() {
      this.scorecard = {};
    },
    handleScorecardsPopup() {
      this.isScorecardSelectOpened = !this.isScorecardSelectOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
