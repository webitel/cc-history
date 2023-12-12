import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('registry', {
      headersValue: (state) => state.headers,
    }),

    headers: {
      get() {

        return this.headersValue
          .map((header) => ({
            ...header,
            // NOTE: This condition is necessary for the normal display of variable headers
            text: header.value.includes('variables') ?
              header.value.replace(/^variables\./, '') :
              this.$t(`fields.${header.value}`),
          }));
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
