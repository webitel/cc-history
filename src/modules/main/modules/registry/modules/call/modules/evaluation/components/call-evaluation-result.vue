<template>
  <section class="call-evaluation-result">
    <div class="call-evaluation-result__wrap">
      <div class="call-evaluation-result__scorecard-info"></div>
      <div class="call-evaluation-result__answers"></div>
    </div>
  </section>
</template>

<script>

// import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
// import SelectScorecardPopup from './select-scorecard-popup.vue';
// import CallNoEvaluation from './call-no-evaluation-section.vue';

export default {
  name: 'call-evaluation-result',
  components: {
    // SelectScorecardPopup,
    // CallNoEvaluation,
    // AuditForm,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    // namespace: {
    //   type: String,
    // },
  },
  data: () => ({
    // isScorecardSelectOpened: false,
    // scorecard: {},
    // auditResult: [],
    // comment: '',
  }),
  methods: {
    // setScorecard(value) {
    //   this.scorecard = value;
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>
