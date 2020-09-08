import deepEqual from 'deep-equal';

export default {
  methods: {
    changeRouteQuery({ filterQuery, value }) {
      const query = { ...this.$route.query };
      query[filterQuery] = value;
      return this.$router.replace({
        name: this.$router.currentRoute.name,
        query,
      });
    },

    setValueToQuery({ filterQuery, value, storedProp = 'id' }) {
      const newValue = Array.isArray(value)
        ? value.map((item) => item[storedProp])
        : value;
      if (!deepEqual(this.$route.query[filterQuery], newValue)) {
        this.changeRouteQuery({ value: newValue, filterQuery });
      }
    },

    getValueFromQuery({ filterQuery }) {
      return this.$route.query[filterQuery];
    },
  },
};
