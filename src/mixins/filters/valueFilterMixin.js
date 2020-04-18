import urlQueryControllerMixin from '../urlQueryControllerMixin';
import Multiselect from '../../components/utils/multiselect.vue';

export default {
  mixins: [urlQueryControllerMixin],
  components: {
    Multiselect,
  },

  data: () => ({}),

  created() {
    this.restore({ filterQuery: this.filterQuery });
  },

  methods: {
    restore({ filterQuery }) {
      const value = this.$route.query[filterQuery];
      if (value) this.restoreValue({ value });
    },

    restoreValue() {},
  },
};
