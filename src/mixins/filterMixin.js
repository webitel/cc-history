export default {
  data: () => ({
  }),

  created() {
  },

  computed: {
  },

  methods: {
    filter({ filter, filterQuery }) {
      const query = { ...this.$route.query };
      query[filterQuery] = filter;
      this.$router.replace({
        name: 'history',
        query,
      });
      this.isOpened = false;
    },
  },
};
