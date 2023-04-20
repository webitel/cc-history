<template>
  <section class="call-evaluation">
    <audit-form
      v-if="scorecard.questions"
      :questions="scorecard.questions"
      v-model:result="auditResult"
      mode="fill"
    ></audit-form>
    <call-no-evaluation v-else @rateCall="isScorecardSelectOpened = true" />
    <select-scorecard-popup
      v-show="isScorecardSelectOpened"
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
  // mixins: [transcriptPhrasesMixin],
  components: {
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
    scorecard: {},
    auditResult: [],
    isScorecardSelectOpened: false,
  }),
  methods: {
    setScorecard(sc) {
      this.scorecard = sc;
    },
  },
};
</script>

<style lang="scss" scoped>
.call-visualization-header {
  margin-bottom: var(--spacing-sm);
}

.call-evaluation__table-wrapper {
  @extend %wt-scrollbar;
  overflow: auto;
  max-height: 60vh;
}
</style>
