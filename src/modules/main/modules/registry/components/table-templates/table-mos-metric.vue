<template>
  <wt-call-media-metric
    v-if="mosAvg"
    :mos-avg="mosAvg"
    show-tooltip
    :size="ComponentSize.SM"
  />
  <span v-else>{{ EMPTY_SYMBOL }}</span>
</template>

<script setup lang="ts">
import { WtCallMediaMetric } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { EMPTY_SYMBOL } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';
import { EngineHistoryCall } from 'webitel-sdk';

const props = defineProps<{
	item: EngineHistoryCall;
}>();

const mosAvg = computed(() => props.item.qualityMetrics?.mosAvg);
</script>
