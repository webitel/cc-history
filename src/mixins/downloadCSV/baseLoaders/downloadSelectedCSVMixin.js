import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('history', {
      selectedData: 'SELECTED_DATA',
    }),
  },

  methods: {
    downloadSelectedCSV(fields) {
      const items = this.selectedData;
      return this.responseToCSV({ fields, items });
    },
  },
};
