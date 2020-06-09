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
    this.restore({ filterQuery: this.filterQuery });
  },

  methods: {
    restore({ filterQuery }) {
      this.restoreArray({ filterQuery });
    },

    restoreArray({ filterQuery }) {
      const valueArray = this.parseQueryArray({ filterQuery });
      if (valueArray) this.fillValue(valueArray);
    },
  },
};
