<template>
  <section class="call-evaluation">
    <select-scorecard-popup
      v-if="isScorecardSelectOpened"
      @change="setScorecard"
      @close="toggleScorecardsPopup"
    />
    <wt-loader v-show="isLoading"/>
    <div v-if="!isLoading">
      <wt-dummy
        v-if="!scorecard.questions && !result.id"
        :src="dummyPic"
        :text="$t('registry.call.evaluation.noEvaluation')"
        :button-text="$t('registry.call.evaluation.rateTheCall')"
        show-action
        @create="toggleScorecardsPopup"
      ></wt-dummy>
      <call-evaluation-form
        v-if="scorecard.questions && !result.id"
        :scorecard="scorecard"
        :call-id="call.id"
        :namespace="namespace"
        @close="closeEvaluationForm"
      ></call-evaluation-form>
      <call-evaluation-result
        v-if="result.id"
        :result="result"
      ></call-evaluation-result>
    </div>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import CallEvaluationResult from './result/call-evaluation-result.vue';
import SelectScorecardPopup from './no-evaluation/select-scorecard-popup.vue';
import CallEvaluationForm from './form/call-evaluation-form.vue';
import dummyPic from '../assets/hs-evaluation-dummy.svg';

export default {
  name: 'call-evaluation',
  components: {
    CallEvaluationForm,
    CallEvaluationResult,
    SelectScorecardPopup,
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
    dummyPic,
  }),
  computed: {
    ...mapState({
        isLoading(state) {
          return getNamespacedState(state, this.namespace).isEvaluationLoading;
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
    toggleScorecardsPopup() {
      this.isScorecardSelectOpened = !this.isScorecardSelectOpened;
    },
  },
  mounted() {
    if (this.call.rateId) this.loadResult(this.call.rateId);
  },
};
</script>

<style lang="scss" scoped>
.wt-dummy {
  margin-top: var(--spacing-sm);
  border: 1px dashed var(--secondary-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-sm);
}
</style>
