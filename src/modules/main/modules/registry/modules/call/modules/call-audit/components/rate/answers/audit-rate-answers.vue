<template>
  <ul class="audit-rate-answers">
    <audit-rate-answer-item
      v-for="(question, index) of rate.questions"
      :key="index"
      :question="question"
      :answer="rate.answers[index]"
    />
  </ul>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import {EngineAuditRate} from "webitel-sdk";

import AuditRateAnswerItem from './audit-rate-answer-item.vue';

const props = defineProps<{
  rate: EngineAuditRate;
}>();
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.audit-rate-answers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
}

</style>
