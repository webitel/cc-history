import IntervalOptions from '../../../../shared/filters/api/IntervalOptions.enum';

export default {
  methods: {
    prettifyDate(date) {
      const { interval } = this.$route.query;
      if (interval) {
        const Interval = IntervalOptions.find((Interval) => Interval.value === interval);
        return Interval.prettify(date);
      }
      return new Date(date).toLocaleString();
    },
  },
};
