import { CallDirection } from 'webitel-sdk';

/**
 * Directions to filter
 * @enum
 * @readonly
 */
const DirectionOptions = Object.freeze([
  {
    name: 'Inbound',
    value: CallDirection.Inbound,
  },
  {
    name: 'Outbound',
    value: CallDirection.Outbound,
  },
]);

export default DirectionOptions;
