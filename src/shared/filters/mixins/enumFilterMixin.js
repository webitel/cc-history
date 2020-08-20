import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    options: [],
    trackBy: 'value',
    storedProp: 'value',
  }),

  methods: {
    getValue({ filterQuery }) {
      return this.getValueArrayFromQuery({ filterQuery });
    },

    restoreValue(values) {
      this.value = this.options
      .filter((item) => values.some((value) => `${value}` === item[this.storedProp]));
    },
  },
};
