<template>
  <section class="call-evaluation">
    <audit-form
      v-if="auditResult.length"
      :questions="auditQuestions"
      v-model:result="auditResult"
      mode="fill"
    ></audit-form>
    <call-no-evaluation v-else @rateCall="isScorecardSelectOpened = true" />
    <select-scored-popup
      v-if="isScorecardSelectOpened"
      :value="scorecards"
      @close="isScorecardSelectOpened = false"
    ></select-scored-popup>
  </section>
</template>

<script>

import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import SelectScoredPopup from './select-scorecard-popup.vue';
import CallNoEvaluation from './call-no-evaluation-section.vue';
import {mapActions, mapState} from "vuex";

export default {
  name: 'call-evaluation',
  // mixins: [transcriptPhrasesMixin],
  components: {
    SelectScoredPopup,
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
    auditQuestions: [
      // {
      //   required: true,
      //   question: 'My Anketa number 1',
      //   type: 'question_option',
      //   options: [
      //     {
      //       name: 'My first var!',
      //       score: 5,
      //     },
      //     {
      //       name: 'My lorem ipsum var!',
      //       score: 10,
      //     },
      //   ],
      // },
      // {
      //   required: true,
      //   question: 'My anketa number two!',
      //   type: 'question_score',
      //   min: 1,
      //   max: 5,
      // },
    ],
    auditResult: [],
    isScorecardSelectOpened: false,
  }),
  computed: {
    ...mapState('registry', {
      scorecards: (state) => state.scorecards,
    }),
    evaluation() {
      // return (this.call.transcripts || [])
      //   .find(({ fileId, id }) => this.file.id === fileId || this.file.id === id);
    },
  },
  created() {
    console.log('state in eval section:', this.$store.state.registry);
  },
  mounted() {
    this.loadScorecards();
  },
  methods: {
    ...mapActions('registry', {
      loadScorecards: 'LOAD_SCORECARDS',
    }),
  },
  watch: {
    data() {
      this.initChannels();
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
