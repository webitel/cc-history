/* eslint-disable no-await-in-loop  */

export default {
  methods: {
    async downloadAllCSV(fields) {
      let csv = '';
      const size = 100;
      const params = {
        size,
      };

      let page = 1;
      let isNext = false;

      csv += `${fields.join(',')}\n`;

      do {
        const { items, next } = await this.loadListForDownload({ ...params, page });
        csv += this.responseToCSV({ fields, items });

        isNext = next;
        page += 1;
      } while (isNext);
      return csv;
    },
  },
};
