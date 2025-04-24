<template>
  <section class="call-evaluation">
    <select-scorecard-popup
      v-if="isScorecardSelectOpened"
      @change="setScorecard"
      @close="toggleScorecardsPopup"
    />
    <wt-loader v-show="isLoading" />
    <div v-if="!isLoading">
      <call-no-evaluation
        v-if="!scorecard.questions && !result.id && !editEvaluationMode"
        @rate="toggleScorecardsPopup"
      />
      <call-evaluation-form
        v-if="(scorecard.questions && !result.id) || editEvaluationMode"
        :edit-evaluation-mode="editEvaluationMode"
        :scorecard="scorecard"
        :result="result"
        :call-id="call.id"
        :namespace="namespace"
        @update-evaluation="closeEvaluationForm"
        @close="closeEvaluationForm"
      />
      <call-evaluation-result
        v-if="result.id && !editEvaluationMode"
        :result="result"
        @delete-call-evaluation-result="deleteCallEvaluationResult"
        @edit-call-evaluation-result="editCallEvaluationResult"
      />
    </div>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import CallEvaluationAPI from '../api/CallEvaluationAPI.js';
import CallEvaluationForm from './form/call-evaluation-form.vue';
import CallNoEvaluation from './no-evaluation/call-no-evaluation-section.vue';
import SelectScorecardPopup from './no-evaluation/select-scorecard-popup.vue';
import CallEvaluationResult from './result/call-evaluation-result.vue';

export default {
  name: 'CallEvaluation',
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
    editEvaluationMode: false,
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
    resultWithAnswerNames() {
      // Safeguard against a missing or still-loading result
      if (!this.result || !Array.isArray(this.result.questions)) return this.result;

      const answersWithNames = this.result.answers.map((answer, idx) => {
        const question = this.result.questions[idx];

        // Fallbacks in case data are out of sync
        if (!question || !Array.isArray(question.options)) {
          return { ...answer, name: null };
        }

        // Match by score first; if scores are not unique, fall back to index
        const matchedOption =
          question.options.find((o) => o.score === answer.score) ??
          question.options[idx];

        return {
          // keep anything else you still need (updatedAt, updatedBy, …)
          score: answer.score,
          name: matchedOption ? matchedOption.name : null,
        };
      });

      return {
        ...this.result,
        answers: answersWithNames,
      };
    },
  },
  methods: {
    ...mapActions({
      loadResult(dispatch, payload) {
        return dispatch(`${this.namespace}/GET_EVALUATION`, payload);
      },
      resetResult(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_EVALUATION_RESULT`, payload);
      },
    }),
    setScorecard(value) {
      this.scorecard = value;
    },
    toggleScorecardsPopup() {
      this.isScorecardSelectOpened = !this.isScorecardSelectOpened;
    },

    closeEvaluationForm() {
      this.scorecard = {};
      this.editEvaluationMode = false;
    },
    async editCallEvaluationResult() {
      this.setScorecard(this.resultWithAnswerNames);
      this.editEvaluationMode = true;
    },
    async deleteCallEvaluationResult() {
      await CallEvaluationAPI.deleteResult(this.result.id);
      await this.resetResult();
      await this.closeEvaluationForm();
    },
  },
  mounted() {
    if (this.call.rateId) this.loadResult(this.call.rateId);
  },
};
</script>

<style lang="scss" scoped>
</style>
