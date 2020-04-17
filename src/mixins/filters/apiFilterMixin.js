import baseFilterMixin from './baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    apiMode: true,
    trackBy: 'id',
    queriedProp: 'id',
  }),

  methods: {
    async fillValue(idList) {
      this.value = await this.fetchSelected(idList);
    },

    async fetchSelected(idList) {
      return idList;
    },
  },
};
