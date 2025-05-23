<template>
  <section class="call-evaluation">
    <select-scorecard-popup
      v-if="isScorecardSelectOpened"
      @change="setScorecard"
      @close="toggleScorecardsPopup"
    />

    <wt-loader v-show="isLoading" />

    <template v-if="!isLoading">
      <empty-audit-rate
        v-if="hasNoEvaluation"
        :has-audit-form-read-access="hasAuditFormReadAccess"
        :has-rating-create-access="hasRatingCreateAccess"
        @rate="toggleScorecardsPopup"
      />
      <call-audit-form
        v-if="showEvaluationForm"
        :scorecard="scorecard"
        :call-id="call.id"
        :namespace="namespace"
        @result:save="saveEvaluationResult"
        @close="closeEvaluationForm"
      />
      <audit-rate-result
        v-if="showEvaluationResult"
        :rate="result"
        @rate:edit="startEditingEvaluationResult"
        @rate:delete="deleteEvaluationResult"
      />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { WtObject } from '@webitel/ui-sdk/enums';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {EngineAuditRate} from "webitel-sdk";

import { useUserAccessControl } from '../../../../../../../../../app/composables/useUserAccessControl';
import AuditFormAPI from '../api/AuditFormAPI';
import EmptyAuditRate from './empty-audit-rate/empty-audit-rate.vue';
import SelectScorecardPopup from './empty-audit-rate/select-scorecard-popup.vue';
import CallAuditForm from './form/call-audit-form.vue';
import AuditRateResult from './rate/audit-rate-result.vue';

const props = defineProps({
  call: {
    type: Object,
    required: true,
  },
  namespace: {
    type: String,
  },
});

const isScorecardSelectOpened = ref(false);
const scorecard = ref({});

const isEditingEvaluationResult = ref(false);

const {
  hasCreateAccess: hasRatingCreateAccess,
  hasUpdateAccess: hasRatingUpdateAccess,
} = useUserAccessControl(WtObject.AuditRating);

const {
  hasReadAccess: hasAuditFormReadAccess,
} = useUserAccessControl(WtObject.AuditForm);

const store = useStore();

const isLoading = computed(() => {
  return getNamespacedState(store.state, props.namespace).isEvaluationLoading;
});

const result = computed(() => {
  return getNamespacedState(store.state, props.namespace).result;
});

const hasNoEvaluation = computed(() => {
  return !result.value.id && !scorecard.value.questions;
});

const showEvaluationResult = computed(() => {
  return result.value.id && !isEditingEvaluationResult.value;
});

const showEvaluationForm = computed(() => {
  const alreadyRated = !!result.value.id;

  // Check if the scorecard has questions; if not, the evaluation form cannot be shown
  if (!scorecard.value.questions) {
    return false;
    // not rated, BUT user cant rate it anyway
  } else if (!alreadyRated && !hasRatingCreateAccess.value) {
    return false;
    // rated, BUT user cant update it anyway OR user isnt editing this rate
  } else if (alreadyRated && (!isEditingEvaluationResult.value || !hasRatingUpdateAccess.value)) {
    return false;
  }

  return true;
});

const loadEvaluationResult = async (payload) => {
  await store.dispatch(`${props.namespace}/GET_EVALUATION`, payload);
};

const addEvaluationResult = async (evaluationResult: EngineAuditRate) => {
  await store.dispatch(`${props.namespace}/ADD_EVALUATION`, evaluationResult);
};

const updateEvaluationResult = async (evaluationResult: EngineAuditRate) => {
  await store.dispatch(`${props.namespace}/UPDATE_EVALUATION`, evaluationResult);
};

const deleteEvaluationResult = async () => {
  await store.dispatch(`${props.namespace}/DELETE_EVALUATION`, props.call.rateId);
  clearScorecard();
};

const saveEvaluationResult = async (evaluationResult: EngineAuditRate) => {
  if (result.value.id) {
    await updateEvaluationResult(evaluationResult);
    isEditingEvaluationResult.value = false;
  } else {
    await addEvaluationResult(evaluationResult);
  }
};

const setScorecard = (value) => {
  scorecard.value = value;
};

const closeEvaluationForm = () => {
  if (isEditingEvaluationResult.value) {
    isEditingEvaluationResult.value = false;
  } else {
    clearScorecard();
  }
};

const clearScorecard = () => {
  scorecard.value = {};
};

const toggleScorecardsPopup = () => {
  isScorecardSelectOpened.value = !isScorecardSelectOpened.value;
};

const startEditingEvaluationResult = () => {
  isEditingEvaluationResult.value = true;
};

onMounted(async () => {
  if (props.call.rateId) {
    await loadEvaluationResult(props.call.rateId);
    const fetchedScorecard = await AuditFormAPI.get({
      itemId: result.value.form.id,
    });
    scorecard.value = fetchedScorecard;
  }
});
</script>

<style lang="scss" scoped>
</style>
