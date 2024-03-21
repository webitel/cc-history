/*
values are strings instead of booleans because restoration from url query
returns string for any type of value [DEV-3924]
 */
const HasTranscription = Object.freeze([
  {
    locale: 'vocabulary.yes',
    value: 'true',
  },
  {
    locale: 'vocabulary.no',
    value: 'false',
  },
]);

export default HasTranscription;
