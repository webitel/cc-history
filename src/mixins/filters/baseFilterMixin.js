import urlQueryControllerMixin from '../urlQueryControllerMixin';
import Multiselect from '../../components/utils/multiselect.vue';

export default {
  mixins: [urlQueryControllerMixin],
  components: {
    Multiselect,
  },

  data: () => ({
    value: null,
  }),

  created() {
    this.restoreValue({ filterQuery: this.filterQuery });
  },

  methods: {
    restoreValue({ filterQuery }) {
      this.restoreArray({ filterQuery });
    },

    restoreArray({ filterQuery }) {
      const valueArray = this.parseQueryArray({ filterQuery });
      if (valueArray) this.fillValue(valueArray);
    },
  },
};
