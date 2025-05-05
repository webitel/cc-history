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
        v-if="!scorecard.questions && !result.id"
        @rate="toggleScorecardsPopup"
      />
      <call-evaluation-form
        v-if="scorecard.questions"
        :scorecard="scorecard"
        :call-id="call.id"
        :namespace="namespace"
        @close="closeEvaluationForm"
      />
      <call-evaluation-result
        v-if="result.id"
        :result="result"
      />
    </div>
  </section>
</template>

<script lang="ts">
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import { useUserAccessControl } from '../../../../../../../../../app/composables/useUserAccessControl';
import CallEvaluationAPI from '../api/CallEvaluationAPI';
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
  setup() {
    const {
      // dont forget to rm unused
    hasReadAccess,
    hasCreateAccess,
    hasUpdateAccess,
    hasDeleteAccess,

    hasSaveActionAccess,
    disableUserInput,
    } = useUserAccessControl('rating');

    return {
      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
      hasSaveActionAccess,
      disableUserInput,
    };
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
      this.scorecard = value;
    },
    closeEvaluationForm() {
      this.scorecard = {};
    },
    toggleScorecardsPopup() {
      this.isScorecardSelectOpened = !this.isScorecardSelectOpened;
    },
  },
  async mounted() {
    if (this.call.rateId) {
      await this.loadResult(this.call.rateId);
      const scorecard = await CallEvaluationAPI.get({
        itemId: this.result.form.id,
      });
      this.scorecard = scorecard;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
