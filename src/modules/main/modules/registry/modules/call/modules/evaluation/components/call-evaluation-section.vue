<template>
  <section class="call-evaluation">
    <select-scorecard-popup
      v-if="isScorecardSelectOpened"
      @change="setScorecard"
      @close="toggleScorecardsPopup"
    />
    <wt-loader v-show="isLoading"/>
    <div v-if="!isLoading">
      <call-no-evaluation
        v-if="!scorecard.questions && !result.id"
        @rate="toggleScorecardsPopup"
      ></call-no-evaluation>
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
import { EngineAuditQuestionType } from 'webitel-sdk';
import CallEvaluationResult from './result/call-evaluation-result.vue';
import SelectScorecardPopup from './no-evaluation/select-scorecard-popup.vue';
import CallNoEvaluation from './no-evaluation/call-no-evaluation-section.vue';
import CallEvaluationForm from './form/call-evaluation-form.vue';

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
      this.scorecard = {
        ...value,
        questions: value.questions.map((question) => {
          if (question.type === EngineAuditQuestionType.Score) {
            return {
              ...question,
              max: question.max || 1,
              min: question.min || 0,
              required: question.required || false,
              question: question.question || '',
            };
          }
          if (question.type === EngineAuditQuestionType.Option) {
            return {
              ...question,
              options: question.options.map((option) => ({
                ...option,
                name: option.name || '',
                score: option.score || 0,
              })),
            };
          }
          return question;
        }),
      };
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
</style>
