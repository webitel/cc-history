export default Object.freeze([
  { name: 'Auto', value: 'auto', prettify: (date) => new Date(date).toLocaleString() },
  { name: '15 min', value: '15 min', prettify: (date) => new Date(date).toLocaleTimeString() },
  { name: '30 min', value: '30 min', prettify: (date) => new Date(date).toLocaleTimeString() },
  { name: '1 hour', value: '1 hour', prettify: (date) => new Date(date).toLocaleTimeString() },
  { name: '3 hours', value: '3 hour', prettify: (date) => new Date(date).toLocaleTimeString() },
  { name: '6 hours', value: '6 hour', prettify: (date) => new Date(date).toLocaleString() },
  { name: '12 hours', value: '12 hour', prettify: (date) => new Date(date).toLocaleString() },
  { name: '1 day', value: '1 day', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '2 days', value: '2 day', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '1 week', value: '1 week', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '2 weeks', value: '2 week', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '1 month', value: '1 month', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '3 month', value: '3 month', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '6 month', value: '6 month', prettify: (date) => new Date(date).toLocaleDateString() },
  { name: '1 year', value: '1 year', prettify: (date) => new Date(date).toLocaleDateString() },
]);