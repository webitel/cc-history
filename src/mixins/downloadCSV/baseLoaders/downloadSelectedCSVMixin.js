export default {
  methods: {
    downloadSelectedCSV(fields) {
      const items = this.selectedItems;
      return this.responseToCSV({ fields, items });
    },
  },
};
