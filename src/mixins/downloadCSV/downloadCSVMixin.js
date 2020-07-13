import download from '../../utils/downloadFile';
import downloadAllCSVMixin from './baseLoaders/downloadAllCSVMixin';
import downloadSelectedCSVMixin from './baseLoaders/downloadSelectedCSVMixin';
import { snakeToCamel } from '../../api/utils/caseConverters';

const responseToCSV = ({ fields, items }) => {
  let csv = '';
  items.forEach((item) => {
    let result = '';
    fields.forEach((snakeKey) => {
      const key = snakeToCamel(snakeKey);
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

  computed: {
    isAnySelected() {
      return this.selectedItems.length;
    },
  },

  methods: {
    async downloadCSV() {
      this.isCSVLoading = true;

      let csv = 'data:text/csv;charset=utf-8,';
      const fields = this.getFields();
      // add headers
      csv += `${fields.join(',')}\n`;
      if (this.isAnySelected) {
        csv += this.downloadSelectedCSV(fields);
      } else {
        csv += await this.downloadAllCSV(fields);
      }

      download(csv, 'history.csv');
      this.isCSVLoading = false;
    },

    responseToCSV,

    getFields() {
      return this.dataFields.filter((field) => (field !== 'files'));
    },
  },
};
