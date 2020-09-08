import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    options: [],
    defaultValue: [],
    trackBy: 'value',
    storedProp: 'value',
  }),

  methods: {
    restoreValue(values) {
      this.value = this.options
      .filter((item) => values.some((value) => `${value}` === item[this.storedProp]));
    },
  },
};
