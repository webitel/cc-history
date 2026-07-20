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
import type {
	EngineHistoryCall,
	EngineHistoryCallQualityMetrics,
} from '@webitel/api-services/gen/models';
import { WtEmpty, WtTable } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import {
	headers,
	QUALITY_PARAMETERS,
	type QualityParameter,
} from './store/headers/headers';

type QualityMetricSuffix = 'Avg' | 'Min' | 'MinAt' | 'Max' | 'MaxAt';
type QualityMetricKey = `${QualityParameter}${QualityMetricSuffix}`;

const props = defineProps<{
	call: EngineHistoryCall;
}>();

const { t } = useI18n();

const formatValue = (value?: number) => {
	if (value == null) return '-';
	return Number(value).toFixed(2);
};

const getMetric = (
	metrics: EngineHistoryCallQualityMetrics | undefined,
	parameter: QualityParameter,
	suffix: QualityMetricSuffix,
) => {
	const key = `${parameter}${suffix}` as QualityMetricKey;
	return metrics?.[key];
};

const buildRow = (parameter: QualityParameter) => {
	const metrics = props.call.qualityMetrics;

	return {
		parameter,
		avg: getMetric(metrics, parameter, 'Avg'),
		min: getMetric(metrics, parameter, 'Min'),
		minAt: getMetric(metrics, parameter, 'MinAt'),
		max: getMetric(metrics, parameter, 'Max'),
		maxAt: getMetric(metrics, parameter, 'MaxAt'),
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
