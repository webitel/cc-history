import baseFilterMixin from './baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    options: [],
    apiMode: false,
    trackBy: 'value',
    queriedProp: 'value',
  }),

  methods: {
    fillValue(valueArray) {
      this.value = this.options
        .filter((item) => valueArray.some((value) => `${value}` === item[this.queriedProp]));
    },
  },
};
