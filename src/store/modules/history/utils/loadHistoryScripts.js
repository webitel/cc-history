import { kebabToCamel } from '../../../../api/utils/caseConverters';
import { SortSymbols } from '../../../../mixins/filters/sortFilterMixin/sortFilterMixin';

const defaultFields = ['has_children', 'variables', 'files', 'id'];

// - create set to remove created_at duplicates
// - convert to array by ...
const removeDuplicates = (arr) => [...new Set(arr.split(','))];

const datetimeToCreatedAt = (value) => {
  let result = value.slice();
  if (result.includes('date')) {
    result = result.replace('date', 'created_at');
  }
  if (result.includes('time')) {
    result = result.replace('time', 'created_at');
  }
  return result;
};

/**
 * @Function removes queries with empty values
 * @private
 * @returns {Array} of query keys
 */
const filterEmptyQueries = (query) => Object.keys(query)
  .filter((key) => query[key]);

/**
 * @Function
 * @private
 * @returns sort value
 */
const handleSortQuery = (value) => {
  let result = datetimeToCreatedAt(value);
  result = result.split(',').map((item) => {
    const field = item.split('=')[0];
    if (item.includes(SortSymbols.ASC)) {
      return `-${field}`;
    }
    if (item.includes(SortSymbols.DESC)) {
      return `+${field}`;
    }
    return field;
  }).join(',');
  return result;
};

/**
 * @Function
 * @private
 * @returns fields value
 */
const handleFieldsQuery = (value) => {
  let result = datetimeToCreatedAt(value);
  result += `,${defaultFields.join(',')}`;
  return removeDuplicates(result);
};

/**
 * @Function
 * @private
 * @returns {Object} of params to send a request
 */
const parseQuery = ({ query, keys }) => {
  const result = {};
  keys.forEach((key) => {
    let value = query[key];
    switch (key) {
      case 'sort':
        value = handleSortQuery(value);
        break;
      case 'fields':
        value = handleFieldsQuery(value);
        break;
      case 'search':
        break;
      default:
        break;
    }
    if (typeof value === 'string') value = value.split('|');
    result[kebabToCamel(key)] = value;
  });
  return result;
};

/**
 * @Function removes queries with empty values
 * @public
 * @returns {Object} of params to send a request
 */
export const convertQuery = (query) => {
  const filledQueryKeysList = filterEmptyQueries(query);
  return parseQuery({
    query,
    keys: filledQueryKeysList,
  });
};

export const getDefaultFields = (headers) => (
  headers
    .filter((header) => header.show)
    .map((header) => header.field)
);
