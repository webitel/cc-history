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
      v-show="isCSVLoading"
      :download-progress="CSVDownloadProgress"
    />
    <wt-popup
      v-if="exportPopup"
      width="480"
      @close="exportPopup = false"
    >
      <template #title>
        {{ $t('headerSection.exportCSV') }}
      </template>
      <template #main>
        <wt-select
          :clearable="false"
          :label="$t('vocabulary.format')"
          :options="exportSettingOptions"
          :value="exportSettings.format"
          required
          @input="selectHandler"
        />
        <wt-input
          v-if="isExportSettingsFormatXls"
          :label="$t('objects.CSV.separator')"
          :value="exportSettings.separator"
          required
          @input="inputHandler"
        />
      </template>
      <template #actions>
        <wt-button
          :loading="isLoading"
          @click="save"
        >
          {{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="exportPopup = false"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
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
  data: () => ({
    exportPopup: false,
    isLoading: false,
    exportSettingsValue: {},
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
    isExportSettingsFormatXls() {
      return this.exportSettings?.format?.value === this.TypesExportedSettings.XLS;
    },
  },
  created() {
    this.initCSVExport(APIRepository.history.exportHistoryToCsv, { filename: 'history' });
    this.initXLSExport(APIRepository.history.exportHistoryToCsv, { filename: 'history' });
  },
  methods: {
    async checkExportSettings() {
      const ConfigurationAPIResponse = await ConfigurationAPI.getList({ name: 'export_settings' });
      console.log(ConfigurationAPIResponse);
      this.exportSettingsValue = ConfigurationAPIResponse.items[0].value;
    },
    exportFile(format) {
      const fields = this.fields.filter((field) => !['files', 'files_job', 'transcripts'].includes(field));
      const delimiter = this.exportSettings.separator;
      try {
        // https://webitel.atlassian.net/browse/DEV-3797
        const params = {
          ...this.filters,
          fields,
          skipParent: true,
          _columns: fields,
        };
        return format === 'csv' ? this.exportCSV({ ...params, delimiter }) : this.exportXLS(params);
      } catch (err) {
        throw err;
      }
    },
    handleExport() {
      this.checkExportSettings();
      if (!this.exportSettingsValue) {
        this.exportPopup = true;
      } else {
        this.exportFile('csv');
      }
    },
    save() {
      this.exportFile('csv');
    },
    selectHandler(selectedValue) {
      this.exportSettings.format = selectedValue;
      if (!this.isExportSettingsFormatXls) {
        delete this.exportSettings.separator;
      }
    },
    inputHandler(inputValue) {
      this.exportSettings.separator = inputValue;
    },
  },
  async mounted() {
    let a = await ConfigurationAPI.getList({ name: 'export_settings' });
    console.log(a);
  },
};
</script>

<style lang="scss" scoped>
.history-export-csv-action {
  position: relative;
}
</style>
