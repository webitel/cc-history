import { getHistory } from '../api/history/history';
import historyHeaders from './loadHistoryMixin/historyHeaders';
import convertQuery from './loadHistoryMixin/loadHistoryScripts';
import download from '../utils/downloadFile';

const getDefaultFields = () => historyHeaders
  .filter((header) => header.show)
  .map((header) => header.value);

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
  data: () => ({
    isCSVLoading: false,
  }),

  methods: {
    async exportCSV() {
      this.isCSVLoading = true;

      const size = 100;
      const params = {
        ...this.getQueryParams(),
        size,
      };
      const fields = this.getFields();

      let csv = 'data:text/csv;charset=utf-8,';
      let page = 1;
      let isNext = false;

      csv += `${fields.join(',')}\n`;

      do {
        // eslint-disable-next-line no-await-in-loop
        const { items, next } = await this.loadList({ ...params, page });
        csv += responseToCSV({ fields, items });

        isNext = next;
        page += 1;
      } while (isNext);

      download(csv, 'history.csv');
      this.isCSVLoading = true;
    },

    getFields() {
      const { fields } = this.$route.query;
      return fields ? fields.split(',') : getDefaultFields();
    },

    loadList(params) {
      return getHistory(params);
    },

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },
  },
};
