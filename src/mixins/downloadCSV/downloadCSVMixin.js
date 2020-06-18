/* eslint-disable no-await-in-loop  */

import { mapGetters } from 'vuex';
import getHistory from '../../api/history/HistoryAPIRepository';
import historyHeaders from '../../store/modules/history/utils/historyHeaders';
import { convertQuery } from '../../store/modules/history/utils/loadHistoryScripts';
import download from '../../utils/downloadFile';

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

  computed: {
    ...mapGetters('history', {
      selectedData: 'SELECTED_DATA',
    }),
  },

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

    downloadSelectedCSV(fields) {
      const items = this.selectedData;
      return responseToCSV({ fields, items });
    },

    async downloadAllCSV(fields) {
      let csv = '';
      const size = 100;
      const params = {
        ...this.getQueryParams(),
        size,
      };

      let page = 1;
      let isNext = false;

      csv += `${fields.join(',')}\n`;

      do {
        const { items, next } = await this.loadListForDownload({ ...params, page });
        csv += responseToCSV({ fields, items });

        isNext = next;
        page += 1;
      } while (isNext);
      return csv;
    },

    getFields() {
      const { fields } = this.$route.query;
      return fields ? fields.split(',') : getDefaultFields();
    },

    loadListForDownload(params) {
      return getHistory(params);
    },

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },
  },
};
