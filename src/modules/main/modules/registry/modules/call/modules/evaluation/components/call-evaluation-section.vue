<template>
  <section class="call-evaluation">
    <div v-if="scorecard.questions && !result.id" class="call-evaluation__audit-form-wrap">
      <audit-form
        v-model:result="auditResult"
        class="call-evaluation__audit-form"
        mode="fill"
        :questions="scorecard.questions"
      />
      <wt-textarea
        v-model="comment"
        class="call-evaluation__audit-form--comment"
        :label="$t('registry.call.evaluation.comment')"
      />
      <div class="call-evaluation__audit-form--actions">
        <wt-button @click="saveEvaluation">
          {{ $t('reusable.save') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="closeEvaluationForm"
        >{{ $t('reusable.cancel') }}
        </wt-button>
      </div>
    </div>
    <call-no-evaluation v-else @rateCall="handleScorecardsPopup"/>
    <select-scorecard-popup
      v-show="isScorecardSelectOpened && !scorecard.questions"
      @change="setScorecard"
      @close="handleScorecardsPopup"
    />
    <wt-loader v-show="isLoading"/>
    <call-evaluation-result v-show="result.id" :value="result"/>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import CallEvaluationResult from './call-evaluation-result.vue';
import SelectScorecardPopup from './select-scorecard-popup.vue';
import CallNoEvaluation from './call-no-evaluation-section.vue';

export default {
  name: 'call-evaluation',
  components: {
    CallEvaluationResult,
    SelectScorecardPopup,
    CallNoEvaluation,
    AuditForm,
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
    auditResult: [],
    comment: '',
  }),
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
      sendEvaluation(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_EVALUATION`, payload);
      },
                  }),
    setScorecard(value) {
      this.scorecard = value;
    },
    saveEvaluation() {
      const result = {
        answers: [...this.auditResult],
        call_id: this.call.id,
        comment: this.comment,
        form: {
          id: this.scorecard.id,
          name: this.scorecard.name,
        },
      };
      return this.sendEvaluation(result);
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
.call-evaluation {
  &__audit-form-wrap {
    display: flex;
    flex-direction: column;
    margin: var(--spacing-sm) 0;
    gap: var(--spacing-sm);
  }

  &__audit-form {
    &--actions {
      display: flex;
      justify-content: center;
      gap: var(--spacing-sm);
    }
  }
}
</style>
