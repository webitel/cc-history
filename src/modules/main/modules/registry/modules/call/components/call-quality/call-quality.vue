<template>
  <section class="call-quality">
    <wt-empty
      v-if="showEmpty"
      :text="t('registry.call.callQuality.noData')"
    />
    <wt-table
      v-else
      :data="dataList"
      :headers="headers"
      :selectable="false"
      :grid-actions="false"
    >
      <template #parameter="{ item }">
        {{ t(`registry.call.callQuality.parameters.${item.parameter}`) }}
      </template>
      <template #avg="{ item }">
        {{ formatValue(item.avg) }}
      </template>
      <template #min="{ item }">
        {{ formatValue(item.min) }}
      </template>
      <template #minAt="{ item }">
        {{ formatValue(item.minAt) }}
      </template>
      <template #max="{ item }">
        {{ formatValue(item.max) }}
      </template>
      <template #maxAt="{ item }">
        {{ formatValue(item.maxAt) }}
      </template>
    </wt-table>
  </section>
</template>

<script setup lang="ts">
import { WtEmpty, WtTable } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineHistoryCall } from 'webitel-sdk';

import {
	headers,
	QUALITY_PARAMETERS,
	type QualityParameter,
} from './store/headers/headers';

const props = defineProps<{
	call: EngineHistoryCall;
}>();

const { t } = useI18n();

const formatValue = (value?: number) => {
	if (value == null) return '';
	return Number(value).toFixed(2);
};

const buildRow = (parameter: QualityParameter) => {
	const metrics = props.call.qualityMetrics;
	const prefix = parameter;

	return {
		parameter,
		avg: metrics?.[`${prefix}Avg`],
		min: metrics?.[`${prefix}Min`],
		minAt: metrics?.[`${prefix}MinAt`],
		max: metrics?.[`${prefix}Max`],
		maxAt: metrics?.[`${prefix}MaxAt`],
	};
};

const dataList = computed(() =>
	QUALITY_PARAMETERS.map((parameter) => buildRow(parameter)),
);

const showEmpty = computed(() => !props.call.qualityMetrics);
</script>

<style scoped lang="scss">
.call-quality {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
}
</style>
