import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('registry', {
      headersValue: (state) => state.headers,
    }),

    headers: {
      get() {
        return this.headersValue
        .map(({ text, ...header }) => {
          let modifiedText = text;

          if (header.value.includes('variables')) {
            modifiedText = header.value.replace(/^variables\./, '');
          }

          return {
            ...header,
            text: modifiedText,
          };
        });
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
