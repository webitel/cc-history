import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    defaultValue: [],
    trackBy: 'id',
    storedProp: 'id',
  }),

  methods: {
    async restoreValue(idList) {
      if (idList && idList.length) this.value = await this.fetchSelected(idList);
    },

    async fetchSelected(idList) {
      return idList;
    },
  },
};
