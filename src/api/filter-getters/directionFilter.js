import { CallDirection } from 'webitel-sdk';

/**
 * Directions to filter
 * @enum
 * @readonly
 */
export default Object.freeze([
  {
    text: 'Inbound',
    value: CallDirection.Inbound,
  },
  {
    text: 'Outbound',
    value: CallDirection.Outbound,
  },
]);
