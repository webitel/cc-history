import {
  getDefaultFields,
} from '../../store/modules/history/utils/loadHistoryScripts';
import download from '../../utils/downloadFile';
import downloadAllCSVMixin from './baseLoaders/downloadAllCSVMixin';
import downloadSelectedCSVMixin from './baseLoaders/downloadSelectedCSVMixin';

const responseToCSV = ({ fields, items }) => {
  let csv = '';
  items.forEach((item) => {
    let result = '';
    fields.forEach((key) => {
      let value = item[key] || '';
      if (typeof value === 'object') value = value.name || '';
      result += `${value},`;
    });
    csv += encodeURIComponent(`${result}\n`);
  });

  return csv;
};

export default {
  mixins: [downloadAllCSVMixin, downloadSelectedCSVMixin],
  data: () => ({
    isCSVLoading: false,
  }),

  methods: {
    async downloadCSV() {
      this.isCSVLoading = true;

      let csv = 'data:text/csv;charset=utf-8,';
      const fields = this.getFields();
      if (this.selectedData.length) {
        csv += this.downloadSelectedCSV(fields);
      } else {
        csv += await this.downloadAllCSV(fields);
      }

      download(csv, 'history.csv');
      this.isCSVLoading = false;
    },

    responseToCSV,

    getFields() {
      const { fields } = this.$route.query;
      return fields ? fields.split(',') : getDefaultFields();
    },
  },
};
