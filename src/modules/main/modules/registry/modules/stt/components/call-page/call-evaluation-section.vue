<template>
  <section class="call-evaluation">
        evaluation
    <audit-form
      v-model:questions="auditQuestions"
      mode="create"
    ></audit-form>
  </section>
</template>

<script>

import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';

export default {
  name: 'call-evaluation',
  // mixins: [transcriptPhrasesMixin],
  components: {
    AuditForm,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  data: () => ({
    auditQuestions: [
      {
        required: true,
        question: "My Anketa number 1",
        type: "question_option",
        options: [
          {
            name: "My first var!",
            score: 5,
          },
          {
            name: "My lorem ipsum var!",
            score: 10,
          }
        ]
      },
      {
        required: true,
        question: "My anketa number two!",
        type: "question_score",
        min: 1,
        max: 5,
      }
    ],
  }),
  computed: {
    filteredData() {
      return this.data.filter(({ channel }) => this.channels[channel]?.show);
    },
    transcript() {
      return (this.call.transcripts || [])
        .find(({ fileId, id }) => this.file.id === fileId || this.file.id === id);
    },
  },
  methods: {
    initChannels() {
      this.channels = [
        ...new Set(
          this.data.map(({ channel }) => channel),
        ),
      ].reduce((channels, channel) => (
        { ...channels, [channel]: { value: channel, show: true } }
      ), {});
    },
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
