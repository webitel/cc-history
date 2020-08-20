import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    trackBy: 'id',
    storedProp: 'id',
  }),

  methods: {
    getValue({ filterQuery }) {
      return this.getValueArrayFromQuery({ filterQuery });
    },

    async restoreValue(idList) {
      this.value = (idList && idList.length) ? await this.fetchSelected(idList) : [];
    },

    async fetchSelected(idList) {
      return idList;
    },
  },
};
