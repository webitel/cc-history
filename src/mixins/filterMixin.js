export default {
  data: () => ({
    isOpened: false,
    joinSymbol: '|',
  }),

  created() {
    this.getValueFromQuery({});
  },

  watch: {
    // eslint-disable-next-line func-names
    '$route.query': function () {
      this.getValueFromQuery({});
    },
  },

  computed: {
    filterStr() {
      return this.value
        .filter((item) => item.show)
        .map((item) => item.value)
        .join(this.joinSymbol);
    },
  },

  methods: {
    filter({ filter = this.filterStr, filterQuery = this.filterQuery }) {
      const query = { ...this.$route.query };
      query[filterQuery] = filter;
      this.$router.replace({
        name: 'history',
        query,
      });
      this.isOpened = false;
    },

    getValueFromQuery({ filterQuery = this.filterQuery }) {
      const { query } = this.$route;
      const value = query[filterQuery];
      this.setValue({
        value,
        filterQuery,
      });
    },

    setValue({ value, filterQuery }) {
      this[filterQuery] = value;
    },
  },
};
