<template>
  <section class="call-evaluation-result">
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isConfirmationPopup"
      @close="closeDelete"
    />

    <div class="call-evaluation-result__scorecard-info">
      <call-evaluation-result-info
        :info="scorecardInfo"
        :comment="props.result.comment"
      />
      <div class="call-evaluation-result__scorecard-info-rating">
        <call-evaluation-score
          v-if="props.result.scoreRequired >= 0"
          :value="props.result.scoreRequired"
          :title="t('registry.call.evaluation.mandatory')"
          color="success"
        />
        <call-evaluation-score
          v-if="props.result.scoreOptional >= 0"
          :value="props.result.scoreOptional"
          :title="t('registry.call.evaluation.optional')"
          color="disabled"
        />
      </div>
      <div class="call-evaluation-result__actions">
        <wt-button
          color="secondary"
          @click="emit('result:edit')"
        >{{ t('reusable.edit') }}
        </wt-button>
        <wt-button
          color="error"
          @click="askDeleteConfirmation({ callback: deleteEvaluationResult })"
        >{{ t('reusable.delete') }}
        </wt-button>
      </div>
    </div>
    <call-evaluation-answers :result="props.result" />
  </section>
</template>

<script lang="ts" setup>
import { WtButton } from '@webitel/ui-sdk/components';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineAuditRate } from 'webitel-sdk';

import CallEvaluationAnswers from './call-evaluation-answers.vue';
import CallEvaluationResultInfo from './call-evaluation-result-info.vue';
import CallEvaluationScore from './call-evaluation-score.vue';

const props = defineProps<{
  result: EngineAuditRate;
}>();

const emit = defineEmits<{
  'result:edit': [];
  'result:delete': [];
}>();

const { t } = useI18n();

const scorecardInfo = computed(() => [
  { title: t('fields.ratedBy'), value: props.result.createdBy.name },
  { title: t('fields.agent'), value: props.result.ratedUser?.name },
  { title: t('fields.date'), value: new Date(+props.result.createdAt).toLocaleDateString() },
  { title: t('registry.call.evaluation.scorecard'), value: props.result.form.name },
]);

const {
  isVisible: isConfirmationPopup,
  deleteCount,
  deleteCallback,
  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const deleteEvaluationResult = () => {
  emit('result:delete');
};
</script>

<style lang="scss" scoped>

.call-evaluation-result {
  display: flex;
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);

  &__scorecard-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__scorecard-info-rating {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }
}

.call-evaluation-answers {
  flex: 1;
}

.call-evaluation-result__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
}
</style>
