<template>
  <div class="history-export-csv-action">
    <wt-button
      :disabled="!dataList.length"
      class="history-action"
      color="secondary"
      @click="handleExport"
    >
      {{ $t('headerSection.exportCSV') }}
    </wt-button>
    <files-counter
      v-show="isCSVLoading || isXLSLoading"
      :download-progress="CSVDownloadProgress || XLSDownloadProgress"
    />
    <wt-popup
      overflow
      v-if="exportPopup"
      width="480"
      @close="closePopup"
    >
      <template #title>
        {{ $t('headerSection.exportCSV') }}
      </template>
      <template #main>
        <wt-select
          :clearable="false"
          :label="$t('vocabulary.format')"
          :options="exportSettingOptions"
          :v="v$.exportSettings.format"
          :value="exportSettings.format"
          required
          @input="selectHandler"
        />
        <wt-input
          v-if="isExportSettingsFormatCSV"
          :label="$t('objects.CSV.separator')"
          :v="v$.exportSettings.separator"
          :value="exportSettings.separator"
          required
          @input="inputHandler"
        />
      </template>
      <template #actions>
        <wt-button
          :disabled="v$.$error"
          :loading="isLoading"
          @click="save"
        >
          {{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportXLSMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportXLSMixin';
import APIRepository from '../../../../app/api/APIRepository';
import ConfigurationAPI from '../../api/configuration.js';
import historyActionMixin from '../../mixins/historyActionMixin';
import FilesCounter from './files-counter.vue';

export default {
  name: 'HistoryExportCsvAction',
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
    let exportSettings;
    exportSettings = {
      exportSettings: {
        format: { required },
      },
      a: {required}
    };
    if (this.isExportSettingsFormatCSV) {
      exportSettings = {
        exportSettings: {
          format: { required },
          separator: { required },
        },
      };
    }
    return { exportSettings };
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    exportPopup: false,
    isLoading: false,
    TypesExportedSettings: {
      CSV: 'csv',
      XLS: 'xls',
    },
    exportSettings: {
      format: {},
      separator: '',
    },
  }),
  computed: {
    exportSettingOptions() {
      return Object.keys(this.TypesExportedSettings)
      .map(key => ({
        name: this.TypesExportedSettings[key],
        value: this.TypesExportedSettings[key],
        id: this.TypesExportedSettings[key],
      }));
    },
    isExportSettingsFormatCSV() {
      return this.exportSettings?.format === this.TypesExportedSettings.CSV;
    },
  },
  created() {
    this.initCSVExport(APIRepository.history.exportHistoryToFile, { filename: 'history' });
    this.initXLSExport(APIRepository.history.exportHistoryToFile, { filename: 'history' });
  },
  methods: {
    async checkExportSettings() {
      const response = await ConfigurationAPI.getList({ name: 'export_settings' });
      const exportSettingsValue = response.items[3]?.value;

      if (exportSettingsValue) {
        this.exportSettings = {
          format: exportSettingsValue.format,
          separator: exportSettingsValue.separator,
        };
      }
    },
    exportFile(format) {
      const fields = this.fields.filter((field) => !['files', 'files_job', 'transcripts'].includes(field));
      const delimiter = this.exportSettings.separator;
      // https://webitel.atlassian.net/browse/DEV-3797
      const params = {
        ...this.filters,
        fields,
        skipParent: true,
        _columns: fields,
      };
      try {
        if (format === this.TypesExportedSettings.CSV) {
          return this.exportCSV({ ...params, delimiter });
        } else if (format === this.TypesExportedSettings.XLS) {
          return this.exportXLS(params);
        }
      } catch (err) {
        throw err;
      }
    },
    handleExport() {
      if (!this.exportSettings.format?.length) {
        this.exportPopup = true;
      } else {
        this.exportFile(this.exportSettings.format);
      }
    },
    save() {
      this.isLoading = true;
      try {
        this.exportFile(this.exportSettings.format);
      } finally {
        this.isLoading = false;
        this.exportPopup = false;
      }
    },
    selectHandler(selectedValue) {
      this.exportSettings.format = selectedValue.value;
      if (!this.isExportSettingsFormatCSV) {
        delete this.exportSettings.separator;
      }
    },
    inputHandler(inputValue) {
      this.exportSettings.separator = inputValue;
    },
    closePopup() {
      this.exportPopup = false;
    },
  },
  mounted() {
    this.checkExportSettings();
  },
};
</script>

<style lang="scss" scoped>
.history-export-csv-action {
  position: relative;
}
</style>
