export default {
  methods: {
    enumNameTranslate(options) {
      options.forEach((item, index) => {
        options[index].name = this.$t(item.name);
      });
      return options;
    },
  },
};
