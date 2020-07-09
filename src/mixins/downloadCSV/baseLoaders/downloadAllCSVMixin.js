/* eslint-disable no-await-in-loop  */

import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('history', {
      fetchDownloadList: 'FETCH_DOWNLOAD_LIST', // files and data download
    }),

    async downloadAllCSV(fields) {
      let csv = '';
      const size = 100;
      const params = {
        size,
      };

      let page = 1;
      let isNext = false;

      do {
        const { items, next } = await this.fetchDownloadList({ ...params, page });
        csv += this.responseToCSV({ fields, items });

        isNext = next;
        page += 1;
      } while (isNext);
      return csv;
    },
  },
};
