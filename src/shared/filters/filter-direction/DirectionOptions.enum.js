import { CallDirection } from 'webitel-sdk';

/**
 * Directions to filter
 * @enum
 * @readonly
 */
const DirectionOptions = Object.freeze([
  {
    name: 'enums.DirectionOptions.inbound',
    value: CallDirection.Inbound,
  },
  {
    name: 'enums.DirectionOptions.outbound',
    value: CallDirection.Outbound,
  },
]);

export default DirectionOptions;
