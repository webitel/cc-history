export default {
  methods: {
    /**
     * replaces $router with updated query params
     * @Function
     * @private
     * @param {Object} payload
     * @param {String} payload.filterQuery updated query property name
     * @param {String} payload.value updated query property value,
     */
    filter({ filterQuery, value }) {
      const query = { ...this.$route.query };
      query[filterQuery] = value;
      // if filters changed, reset page
      if (filterQuery !== 'page') {
        query.page = '1';
      }
      this.$router.replace({
        name: 'history',
        query,
      });
    },

    /**
     * Sets simple string query to url, calls filter function
     * @Function
     * @public
     * @param {Object} payload
     * @param {String} payload.filterQuery updated query property name
     * @param {String} payload.value updated query property value,
     */
    setQueryValue({ filterQuery, value }) {
      if (this.getValueByQuery({ filterQuery }) !== value) {
        this.filter({
          value,
          filterQuery,
        });
      }
    },

    /**
     * Sets array value query to url, calls filter function
     * @Function
     * @public
     * @param {Object} payload
     * @param {String} payload.filterQuery updated query property name
     * @param {Array} payload.value updated query property value,
     * @param {String} [payload.queriedProp = 'value'] value property to set and retrieve from url
     * @param {String} [payload.separator = '|'] separates array values in url
     */
    setQueryArray({
                    filterQuery,
                    value,
                    queriedProp = 'id',
                    separator = '|',
                  }) {
      const filter = value.map((item) => item[queriedProp])
        .join(separator);
      if (this.getValueByQuery({ filterQuery }) !== filter) {
        this.filter({
          value: filter,
          filterQuery,
        });
      }
    },

    /**
     * Sets query value to data property
     * Called by query param watcher in components
     * @Function
     * @public
     * @param {Object} payload
     * @param payload.value prop value,
     * @returns parsed value from query
     */
    parseQueryValue({ filterQuery }) {
      const value = this.getValueByQuery({ filterQuery });
      if (value) return value;
      return '';
    },


    /**
     * Sets query array value to data property
     * Called by query param watcher in components
     * @Function
     * @public
     * @param {Object} payload
     * @param {Array} payload.value prop value,
     * @param {String} [payload.queriedProp = 'value'] value property to set and retrieve from url
     * @param {String} [payload.separator = '|'] separates array values in url
     * @returns parsed value from query, converted to array or empty array
     */
    parseQueryArray({
                      filterQuery,
                      separator = '|',
                    }) {
      const value = this.getValueByQuery({ filterQuery });
      if (value) {
        return value.split(separator);
      }
      return null;
    },

    /**
     * Gets value from url query by its property aka filterQuery
     * @Function
     * @private
     * @returns value from query, converted to array or empty array
     */
    getValueByQuery({ filterQuery }) {
      return this.$route.query[filterQuery];
    },
  },
};
