import { formatDate } from '@webitel/ui-sdk/utils';

export default Object.freeze([
  {
    locale: 'dashboards.interval.options.auto',
    value: 'auto',
    prettify: (date) => formatDate(new Date(date), 'datetime'),
  },
  {
    locale: ['dashboards.interval.options.min', 2, { value: 15 }],
    value: '15 min',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.min', 2, { value: 30 }],
    value: '30 min',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.hour', 1, { value: 1 }],
    value: '1 hour',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.hour', 2, { value: 3 }],
    value: '3 hour',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.hour', 2, { value: 6 }],
    value: '6 hour',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.hour', 2, { value: 12 }],
    value: '12 hour',
    prettify: (date) => formatDate(new Date(date), 'time'),
  },
  {
    locale: ['dashboards.interval.options.day', 1, { value: 1 }],
    value: '1 day',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.day', 2, { value: 2 }],
    value: '2 day',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.week', 1, { value: 1 }],
    value: '1 week',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.week', 2, { value: 2 }],
    value: '2 week',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.month', 1, { value: 1 }],
    value: '1 month',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.month', 2, { value: 3 }],
    value: '3 month',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.month', 2, { value: 6 }],
    value: '6 month',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
  {
    locale: ['dashboards.interval.options.year', 1, { value: 1 }],
    value: '1 year',
    prettify: (date) => formatDate(new Date(date), 'date'),
  },
]);
