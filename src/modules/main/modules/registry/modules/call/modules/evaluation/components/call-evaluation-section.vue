<template>
  <section class="call-evaluation">
    <select-scorecard-popup
      v-if="isScorecardSelectOpened"
      @change="setScorecard"
      @close="toggleScorecardsPopup"
    />
    <wt-loader v-show="isLoading" />
    <div v-if="!isLoading">
      <call-no-evaluation
        v-if="!scorecard.questions && !result.id"
        :has-audit-form-read-access="hasAuditFormReadAccess"
        :has-rating-create-access="hasRatingCreateAccess"
        @rate="toggleScorecardsPopup"
      />
      <call-evaluation-form
        v-if="scorecard.questions && !disableRating"
        :scorecard="scorecard"
        :call-id="call.id"
        :namespace="namespace"
        @close="closeEvaluationForm"
      />
      <call-evaluation-result
        v-if="result.id"
        :result="result"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, onMounted,ref } from 'vue';
import { useStore } from 'vuex';

import { useUserAccessControl } from '../../../../../../../../../app/composables/useUserAccessControl';
import CallEvaluationAPI from '../api/CallEvaluationAPI';
import CallEvaluationForm from './form/call-evaluation-form.vue';
import CallNoEvaluation from './no-evaluation/call-no-evaluation-section.vue';
import SelectScorecardPopup from './no-evaluation/select-scorecard-popup.vue';
import CallEvaluationResult from './result/call-evaluation-result.vue';

const props = defineProps({
  call: {
    type: Object,
    required: true,
  },
  namespace: {
    type: String,
  },
});

const store = useStore();
const isScorecardSelectOpened = ref(false);
const scorecard = ref({});

const {
  disableUserInput: disableRating,
  hasCreateAccess: hasRatingCreateAccess,
} = useUserAccessControl('rating');

const {
  hasReadAccess: hasAuditFormReadAccess,
} = useUserAccessControl('cc_audit_form');

const isLoading = computed(() => {
  return getNamespacedState(store.state, props.namespace).isEvaluationLoading;
});

const result = computed(() => {
  return getNamespacedState(store.state, props.namespace).result;
});

const loadResult = async (payload) => {
  await store.dispatch(`${props.namespace}/GET_EVALUATION`, payload);
};

const setScorecard = (value) => {
  scorecard.value = value;
};

const closeEvaluationForm = () => {
  scorecard.value = {};
};

const toggleScorecardsPopup = () => {
  isScorecardSelectOpened.value = !isScorecardSelectOpened.value;
};

onMounted(async () => {
  if (props.call.rateId) {
    await loadResult(props.call.rateId);
    const fetchedScorecard = await CallEvaluationAPI.get({
      itemId: result.value.form.id,
    });
    scorecard.value = fetchedScorecard;
  }
});
</script>

<style lang="scss" scoped>
</style>
