<template>
  <section class="call-evaluation">
    <div v-if="scorecard.questions" class="call-evaluation__audit-form-wrap">
      <audit-form
        v-model:result="auditResult"
        mode="fill"
        :questions="scorecard.questions"
      ></audit-form>
      <wt-textarea
        v-model="comment"
        class="call-evaluation__audit-form__comment"
        :label="$t('registry.call.evaluation.comment')"
      ></wt-textarea>
      <div class="call-evaluation__audit-form__actions">
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
    <call-no-evaluation v-else @rateCall="isScorecardSelectOpened = true" />
    {{ auditResult }}
    <select-scorecard-popup
      v-show="isScorecardSelectOpened && !scorecard.questions"
      @change="setScorecard"
      @close="isScorecardSelectOpened = false"
    ></select-scorecard-popup>
  </section>
</template>

<script>

import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import SelectScorecardPopup from './select-scorecard-popup.vue';
import CallNoEvaluation from './call-no-evaluation-section.vue';

export default {
  name: 'call-evaluation',
  components: {
    SelectScorecardPopup,
    CallNoEvaluation,
    AuditForm,
  },
  props: {
    // call: {
    //   type: Object,
    //   required: true,
    // },
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
  methods: {
    setScorecard(value) {
      this.scorecard = value;
    },
    saveEvaluation() {
      //компонувати всю інфу в потрібний для беку формат + інціювати відкриття сторінки результату
    },
    closeEvaluationForm() {
      this.scorecard = {};
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
