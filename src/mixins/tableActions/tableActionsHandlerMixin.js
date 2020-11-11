import deepEqual from 'deep-equal';

export default {
  methods: {
    tableActionsHandler(eventName) {
      switch (eventName) {
        case 'refresh':
          this.refreshList();
          break;
        case 'columnSelect':
          this.openColumnSelect();
          break;
        case 'filterReset':
          this.resetFilters();
          break;
        case 'settings':
          this.expandFilters();
          break;
        default:
      }
    },

    expandFilters() {
      this.isOpened = !this.isOpened;
    },
    refreshList() {
      this.loadData();
    },
    openColumnSelect() {
      this.isFilterFieldsOpened = true;
    },
    resetFilters() {
      const { fields } = this.$route.query;
      if (!deepEqual(this.$route.query, { fields })) this.$router.push({ query: { fields } });
      this.resetFilters();
    },
  },
};
