import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('registry', {
      headersValue: (state) => state.headers,
    }),

    headers: {
      get() {
        return this.headersValue
          .map((header) => ({ ...header, text: this.$t(`fields.${header.value}`) }));
      },
      set(value) {
        this.setHeaders(value);
      },
    },
  },
  methods: {
    ...mapActions('registry', {
      setHeaders: 'SET_HEADERS',
    }),
  },
};
