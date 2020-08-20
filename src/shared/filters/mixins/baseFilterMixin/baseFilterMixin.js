import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin';

export default {
  mixins: [_urlControllerMixin],

  watch: {
    '$route.query': {
      handler(newValue, oldValue) {
        if (newValue[this.filterQuery] !== oldValue[this.filterQuery]) {
          this.restore({ filterQuery: this.filterQuery });
        }
      },
    },
  },

  created() {
    this.restore({ filterQuery: this.filterQuery });
  },

  methods: {
    restore({ filterQuery }) {
      const value = this.getValue({ filterQuery });
      this.restoreValue(value);
    },

    getValue({ filterQuery }) {
      return this.getValueFromQuery({ filterQuery });
    },
  },
};
