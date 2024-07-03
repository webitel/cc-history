<template>
  <div class="history-export-action">
    <wt-button
      :disabled="!dataList.length"
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
        <wt-input
          v-if="isExportSettingsFormatCSV"
          :label="$t('headerSection.exportPopup.separator')"
          :v="v$.draft.separator"
          :value="draft.separator"
          required
          @input="inputHandler"
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

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf } from '@vuelidate/validators';
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportXLSMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportXLSMixin';
import { EngineSystemSettingName } from 'webitel-sdk';
import APIRepository from '../../../../app/api/APIRepository';
import ConfigurationAPI from '../../api/configuration.js';
import historyActionMixin from '../../mixins/historyActionMixin';
import FilesCounter from './files-counter.vue';
import TypesExportedSettingsEnum from '@webitel/ui-sdk/src/enums/TypesExportedSettings/TypesExportedSettings.enum.js';

export default {
  name: 'HistoryExportAction',
  components: { FilesCounter },
  mixins: [
    historyActionMixin,
    exportCSVMixin,
    exportXLSMixin,
  ],
  props: {
    dataList: {
      type: Array,
    },
    filters: {
      type: Object,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  validations() {
    return {
      draft: {
        format: { required },
        separator: { requiredIfRef: requiredIf(this.isExportSettingsFormatCSV) },
      },
    };
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    exportPopup: false,
    isLoading: false,
    draft: {
      format: {},
      separator: '',
    },
  }),
  computed: {
    exportSettingOptions() {
      return Object.keys(TypesExportedSettingsEnum)
      .map(key => ({
        name: TypesExportedSettingsEnum[key],
        value: TypesExportedSettingsEnum[key],
        id: TypesExportedSettingsEnum[key],
      }));
    },
    isExportSettingsFormatCSV() {
      return this.draft?.format === TypesExportedSettingsEnum.CSV;
    },
    disableSaving() {
      this.v$.draft.$touch();
      return this.v$.draft.$pending || this.v$.draft.$error;
    },
  },
  methods: {
    updateDraft({format, separator} = {}) {
      this.draft = {
        format: format || '',
        separator: separator || '',
      };
    },
    async checkExportSettings() {
      const response = await ConfigurationAPI.getList({ name: EngineSystemSettingName.ExportSettings });
      const exportSettingsValue = response.items[0]?.value;

      if (exportSettingsValue) {
        this.updateDraft(exportSettingsValue);
      }
    },
    exportFile(format) {
      const fields = this.fields.filter((field) => !['files', 'files_job', 'transcripts'].includes(field));
      const delimiter = this.draft.separator;
      // https://webitel.atlassian.net/browse/DEV-3797
      const params = {
        ...this.filters,
        fields,
        skipParent: true,
        _columns: fields,
      };
      try {
        switch (format) {
          case TypesExportedSettingsEnum.CSV:
            return this.exportCSV({ ...params, delimiter });
          case TypesExportedSettingsEnum.XLS:
            return this.exportXLS(params);
          default:
            console.error(`Unsupported format: ${format}`);
        }
      } catch (err) {
        throw err;
      }
    },
    handleExport() {
      if (!this.draft.format?.length) {
        this.exportPopup = true;
      } else {
        this.exportFile(this.draft.format);
      }
    },
    save() {
      this.isLoading = true;
      try {
        this.exportFile(this.draft.format);
      } finally {
        this.isLoading = false;
        this.closePopup();
      }
      //NOTE: This code is required to clear draft and re-execute checkExportSettings
      this.updateDraft();
    },
    selectHandler(selectedValue) {
      this.draft.format = selectedValue.value;
      if (!this.isExportSettingsFormatCSV) {
        delete this.draft.separator;
      }
    },
    inputHandler(inputValue) {
      this.draft.separator = inputValue;
    },
    closePopup() {
      this.exportPopup = false;

      //NOTE: This code is required to clear draft and re-execute checkExportSettings
      this.updateDraft();
    },
  },
  mounted() {
    this.checkExportSettings();
  },
  created() {
    this.initCSVExport(APIRepository.history.exportHistoryToFile, { filename: 'history' });
    this.initXLSExport(APIRepository.history.exportHistoryToFile, { filename: 'history' });
  },
};
</script>

<style lang="scss" scoped>
.history-export-action {
  position: relative;
}
</style>
