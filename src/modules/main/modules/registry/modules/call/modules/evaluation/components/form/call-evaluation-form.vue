<template>
  <div class="call-evaluation-form">
    <audit-form
      v-model:result="auditResult"
      class="call-evaluation-form__audit-form"
      mode="fill"
      :show-question-comment="editEvaluationMode"
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
    editEvaluationMode: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update-evaluation', 'close'],
  data() {
    return {
      auditResult: this.result?.answers?.length
        ? [...this.result.answers]         // → preload answers
        : [],
      comment: this.result?.comment || '', // → preload overall comment
      invalid: true,
    };
  },

  watch: {
    result: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val?.answers?.length) this.auditResult = [...val.answers];
        this.comment = val?.comment || '';
      },
    },
  },

  methods: {
    ...mapActions({
      sendEvaluation(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_EVALUATION`, payload);
      },
      updateEvaluation(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_EVALUATION`, payload);
      },
    }),
    async saveEvaluation() {
      const evaluation = {
        answers: this.auditResult,
        callId: this.callId,
        comment: this.comment,
        form: {
          id: this.scorecard.id,
          name: this.scorecard.name,
        },
      };

      if (this.result.id) {
        // NOTE: this order of emit is important to properly change editEvaluationMode variable in call evaluation section
        this.$emit('update-evaluation');
        await this.updateEvaluation({
          id: this.result.id,
          evaluation: {
            answers: this.auditResult,
            comment: this.comment,
          }
        });
      } else {
        await this.sendEvaluation(evaluation);
      }
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
