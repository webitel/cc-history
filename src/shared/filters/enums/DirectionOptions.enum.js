import { CallDirection } from 'webitel-sdk';

/**
 * Directions to filter
 * @enum
 * @readonly
 */
const DirectionOptions = Object.freeze([
  {
    locale: [`calls.direction.${CallDirection.Inbound}`, 2],
    value: CallDirection.Inbound,
  },
  {
    locale: [`calls.direction.${CallDirection.Outbound}`, 2],
    value: CallDirection.Outbound,
  },
]);

export default DirectionOptions;
