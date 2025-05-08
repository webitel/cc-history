<template>
  <div class="call-evaluation-form">
    <audit-form
      v-model:answers="localAnswers"
      v-model:result-comment="comment"
      class="call-evaluation-form__audit-form"
      mode="fill"
      :questions="questions"
      @save:evaluation="saveEvaluation"
      @cancel:evaluation="cancelEvaluation"
    />
  </div>
</template>

<script lang="ts" setup>
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import deepCopy from "deep-copy";
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { EngineAuditRate } from 'webitel-sdk';

const props = defineProps({
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
});

const emit = defineEmits<{
  close: [];
  'result:save': [EngineAuditRate];
}>();

const store = useStore();

const localAnswers = ref([]);
const comment = ref('');

const result = computed(() => {
  return getNamespacedState(store.state, props.namespace).result;
});

const questions = computed(() => {
  return result?.value.questions || props.scorecard.questions;
});

const cancelEvaluation = () => {
  emit('close');
};

const saveEvaluation = () => {
  const evaluationResult = {
    answers: localAnswers.value,
    callId: props.callId,
    comment: comment.value,
    form: {
      id: props.scorecard.id,
      name: props.scorecard.name,
    },
  };

  emit('result:save', evaluationResult);
};

watch(
  result,
  (value) => {
    if (value?.answers) {
      localAnswers.value = deepCopy(value.answers);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>

.call-evaluation-form {
  display: flex;
  flex-direction: column;
  margin: var(--spacing-sm) 0;
  gap: var(--spacing-sm);
}

</style>
