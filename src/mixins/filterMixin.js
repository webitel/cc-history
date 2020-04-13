export default {
  data: () => ({
    isOpened: false,
    joinSymbol: '|',
  }),

  methods: {
    filter() {
      const filter = this.value
        .filter((item) => item.show)
        .map((item) => item.value)
        .join(this.joinSymbol);
      const query = { ...this.$route.query };
      query[this.filterQuery] = filter;
      this.$router.replace({
        name: 'history',
        query,
      });
      this.isOpened = false;
    },
  },
};
