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
      this.filter({
        value,
        filterQuery,
      });
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
                    queriedProp = 'value',
                    separator = '|',
                  }) {
      const filter = value.map((item) => item[queriedProp])
        .join(separator);
      this.filter({
        value: filter,
        filterQuery,
      });
    },

    /**
     * Sets query value to data property
     * Called by query param watcher in components
     * @Function
     * @public
     * @param {Object} payload
     * @param {String} payload.prop this.data[prop] to set
     * @param payload.value prop value,
     */
    getQueryValue({ prop, value }) {
      if (value) this[prop] = value;
    },


    /**
     * Sets query array value to data property
     * Called by query param watcher in components
     * @Function
     * @public
     * @param {Object} payload
     * @param {String} payload.prop this.data[prop] to set
     * @param {Array} payload.value prop value,
     * @param {String} [payload.queriedProp = 'value'] value property to set and retrieve from url
     * @param {String} [payload.separator = '|'] separates array values in url
     */
    getQueryArray({
                    prop,
                    value,
                    queriedProp = 'value',
                    separator = '|',
                  }) {
      if (value) {
        this[prop] = value.split(separator)
          .map((item) => ({ [queriedProp]: item }));
      }
    },
  },
};
