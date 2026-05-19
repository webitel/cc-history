<template>
  <div class="history-export-action">
    <wt-button
      :disabled="!dataList.length || !hasExportDataGridAccess"
      color="secondary"
      @click="handleExport"
    >
      {{ $t('reusable.export') }}
    </wt-button>
    <files-counter
      v-show="isCSVLoading || isXLSLoading"
      :download-progress="CSVDownloadProgress || XLSDownloadProgress"
    />
    <wt-popup
      v-if="exportPopup"
      overflow
      size="sm"
      @close="closePopup"
    >
      <template #title>
        {{ $t('reusable.export') }}
      </template>
      <template #main>
        <wt-select
          :clearable="false"
          :label="$t('vocabulary.format')"
          :options="exportSettingOptions"
          :v="v$.draft.format"
          :value="draft.format"
          required
          @input="selectHandler"
        />
        <wt-input-text
          v-if="isExportSettingsFormatCSV"
          v-model:model-value="draft.separator"
          :label="$t('headerSection.exportPopup.separator')"
          :v="v$.draft.separator"
          required
        />
      </template>
      <template #actions>
        <wt-button
          :disabled="disableSaving"
          :loading="isLoading"
          @click="save"
        >
          {{ $t('reusable.export') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="closePopup"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf } from '@vuelidate/validators';
import TypesExportedSettingsEnum from '@webitel/ui-sdk/src/enums/TypesExportedSettings/TypesExportedSettings.enum';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { EngineSystemSettingName } from 'webitel-sdk';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { useCSVExport } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useCSVExport';
import XLSExportClass from '@webitel/ui-sdk/src/modules/CSVExport/XLSExport';

import APIRepository from '../../../../app/api/APIRepository';
import ConfigurationAPI from '../../api/configuration.js';
import FilesCounter from './files-counter.vue';
import { useUserinfoStore } from '../../../userinfo/stores/userinfoStore';
const props = defineProps({
	dataList: {
		type: Array,
		default: () => [],
	},
	filters: {
		type: Object,
		default: () => ({}),
	},
	fields: {
		type: Array,
		required: true,
	},
	selected: {
		type: Array,
		default: () => [],
	},
});
const { dataList, fields, filters, selected } = toRefs(props);

const route = useRoute();
const userinfoStore = useUserinfoStore();

const exportPopup = ref(false);
const isLoading = ref(false);
const draft = reactive({
	format: '',
	separator: '',
});

const selectedIds = computed(() => selected.value.map((item) => item.id));

const {
	CSVExportInstance,
	CSVDownloadProgress,
	isCSVLoading,
	initCSVExport,
	exportCSV,
} = useCSVExport({
	selected: selectedIds,
});

const XLSExportInstance = ref(null);
const XLSDownloadProgress = computed(() =>
	XLSExportInstance.value ? XLSExportInstance.value.downloadProgress.count : 0,
);
const isXLSLoading = computed(() => !!XLSDownloadProgress.value);

const CSVExport = computed(() => CSVExportInstance.value);
const XLSExport = computed(() => XLSExportInstance.value);

const hasExportDataGridAccess = computed(() => {
	return userinfoStore.hasSpecialGlobalActionAccess(
		SpecialGlobalAction.ExportDataGrid,
	);
});

const exportSettingOptions = computed(() => {
	return Object.keys(TypesExportedSettingsEnum).map((key) => ({
		name: TypesExportedSettingsEnum[key],
		value: TypesExportedSettingsEnum[key],
		id: TypesExportedSettingsEnum[key],
	}));
});

const isExportSettingsFormatCSV = computed(
	() => draft.format === TypesExportedSettingsEnum.CSV,
);

const rules = computed(() => ({
	draft: {
		format: {
			required,
		},
		separator: {
			requiredIfRef: requiredIf(() => isExportSettingsFormatCSV.value),
		},
	},
}));
const v$ = useVuelidate(rules, {
	draft,
});

const disableSaving = computed(() => {
	v$.value.draft.$touch();
	return v$.value.draft.$pending || v$.value.draft.$error;
});

function initXLSExport(fetchMethod, options = {}) {
	XLSExportInstance.value = new XLSExportClass(fetchMethod, options);
}

async function exportXLS(exportParams) {
	const routeQuery = route.query;
	const params = {
		...(exportParams || routeQuery),
		size: 5000,
	};
	if (selectedIds.value.length) {
		params.id = selectedIds.value;
	}
	await XLSExportInstance.value?.export(params);
}

function updateDraft({ format, separator } = {}) {
	draft.format = format || '';
	draft.separator = separator || '';
}

async function checkExportSettings() {
	const response = await ConfigurationAPI.getList({
		name: EngineSystemSettingName.ExportSettings,
	});
	const exportSettingsValue = response.items[0]?.value;

	if (exportSettingsValue) {
		updateDraft(exportSettingsValue);
	}
}

function getExportFilename() {
	const date = formatDate(Date.now(), FormatDateMode.DATE);
	const time = formatDate(Date.now(), FormatDateMode.TIME_SEC);
	return `history-${date}-${time}`;
}

function exportFile(format) {
	const delimiter = draft.separator;
	const filename = getExportFilename();
	// https://webitel.atlassian.net/browse/DEV-3797
	const params = {
		...filters.value,
		fields: fields.value,
		skipParent: true,
		_columns: fields.value,
	};

	if (CSVExport.value) {
		CSVExport.value.filename = filename;
	}
	if (XLSExport.value) {
		XLSExport.value.filename = filename;
	}

	switch (format) {
		case TypesExportedSettingsEnum.CSV:
			return exportCSV({
				...params,
				delimiter,
			});
		case TypesExportedSettingsEnum.XLSX:
			return exportXLS(params);
		default:
			console.error(`Unsupported format: ${format}`);
	}
}

function handleExport() {
	if (!draft.format?.length) {
		exportPopup.value = true;
	} else {
		exportFile(draft.format);
	}
}

function closePopup() {
	exportPopup.value = false;
	// NOTE: this is required to clear draft and re-execute checkExportSettings
	updateDraft();
}

function save() {
	isLoading.value = true;
	try {
		exportFile(draft.format);
	} finally {
		isLoading.value = false;
		closePopup();
	}
	// NOTE: this is required to clear draft and re-execute checkExportSettings
	updateDraft();
}

function selectHandler(selectedValue) {
	draft.format = selectedValue.value;
	if (!isExportSettingsFormatCSV.value) {
		draft.separator = '';
	}
}

initCSVExport(APIRepository.history.exportHistoryToFile, {
	filename: 'history',
});
initXLSExport(APIRepository.history.exportHistoryToFile, {
	filename: 'history',
});
onMounted(checkExportSettings);
</script>

<style lang="scss" scoped>
.history-export-action {
  position: relative;
}
</style>
