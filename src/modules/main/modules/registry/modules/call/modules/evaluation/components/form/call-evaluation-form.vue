<template>
  <div class="call-evaluation-form">
    <audit-form
      v-model:result="auditResult"
      class="call-evaluation-form__audit-form"
      mode="fill"
      :questions="scorecard.questions"
      @update:validation="invalid = $event.invalid"
    />
    <wt-textarea
      v-model="comment"
      class="call-evaluation-form__comment"
      :label="$t('registry.call.evaluation.comment')"
    />
    <div class="call-evaluation-form__actions">
      <wt-button
        :disabled="invalid"
        @click="saveEvaluation"
      >
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </div>
  </div>
</template>

<script>

import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CallEvaluationForm',
  components: {
    AuditForm,
  },
  props: {
    scorecard: {
      type: Object,
      required: true,
    },
    callId: {
      type: String,
      required: true,
    },
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    auditResult: [],
    comment: '',
    invalid: true,
  }),
  methods: {
    ...mapActions({
      sendEvaluation(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_EVALUATION`, payload);
      },
    }),
    saveEvaluation() {
      const result = {
        answers: this.auditResult,
        callId: this.callId,
        comment: this.comment,
        form: {
          id: this.scorecard.id,
          name: this.scorecard.name,
        },
      };
      this.sendEvaluation(result);
    },
  },
};
</script>

<style lang="scss" scoped>

.call-evaluation-form {
  display: flex;
  flex-direction: column;
  margin: var(--spacing-sm) 0;
  gap: var(--spacing-sm);

  &__actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }
}

</style>
