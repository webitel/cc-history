/**
 * Hangup causes to filter
 * @enum
 * @readonly
 */
const HangupCauseOptions = Object.freeze([
  {
    name: 'UNSPECIFIED',
    code: '0',
  },
  {
    name: 'UNALLOCATED_NUMBER',
    code: '1',
  },
  {
    name: 'NO_ROUTE_TRANSIT_NET',
    code: '2',
  },
  {
    name: 'NO_ROUTE_DESTINATION',
    code: '3',
  },
  {
    name: 'CHANNEL_UNACCEPTABLE',
    code: '6',
  },
  {
    name: 'CALL_AWARDED_DELIVERED',
    code: '7',
  },
  {
    name: 'NORMAL_CLEARING',
    code: '16',
  },
  {
    name: 'USER_BUSY',
    code: '17',
  },
  {
    name: 'NO_USER_RESPONSE',
    code: '18',
  },
  {
    name: 'NO_ANSWER',
    code: '19',
  },
  {
    name: 'SUBSCRIBER_ABSENT',
    code: '20',
  },
  {
    name: 'CALL_REJECTED',
    code: '21',
  },
  {
    name: 'NUMBER_CHANGED',
    code: '22',
  },
  {
    name: 'REDIRECTION_TO_NEW_DESTINATION',
    code: '23',
  },
  {
    name: 'EXCHANGE_ROUTING_ERROR',
    code: '25',
  },
  {
    name: 'DESTINATION_OUT_OF_ORDER',
    code: '27',
  },
  {
    name: 'INVALID_NUMBER_FORMAT',
    code: '28',
  },
  {
    name: 'FACILITY_REJECTED',
    code: '29',
  },
  {
    name: 'RESPONSE_TO_STATUS_ENQUIRY',
    code: '30',
  },
  {
    name: 'NORMAL_UNSPECIFIED',
    code: '31',
  },
  {
    name: 'NORMAL_CIRCUIT_CONGESTION',
    code: '34',
  },
  {
    name: 'NETWORK_OUT_OF_ORDER',
    code: '38',
  },
  {
    name: 'NORMAL_TEMPORARY_FAILURE',
    code: '41',
  },
  {
    name: 'SWITCH_CONGESTION',
    code: '42',
  },
  {
    name: 'ACCESS_INFO_DISCARDED',
    code: '43',
  },
  {
    name: 'REQUESTED_CHAN_UNAVAIL',
    code: '44',
  },
  {
    name: 'PRE_EMPTED',
    code: '45',
  },
  {
    name: 'FACILITY_NOT_SUBSCRIBED',
    code: '50',
  },
  {
    name: 'OUTGOING_CALL_BARRED',
    code: '52',
  },
  {
    name: 'INCOMING_CALL_BARRED',
    code: '54',
  },
  {
    name: 'BEARERCAPABILITY_NOTAUTH',
    code: '57',
  },
  {
    name: 'BEARERCAPABILITY_NOTAVAIL',
    code: '58',
  },
  {
    name: 'SERVICE_UNAVAILABLE',
    code: '63',
  },
  {
    name: 'BEARERCAPABILITY_NOTIMPL',
    code: '65',
  },
  {
    name: 'CHAN_NOT_IMPLEMENTED',
    code: '66',
  },
  {
    name: 'FACILITY_NOT_IMPLEMENTED',
    code: '69',
  },
  {
    name: 'SERVICE_NOT_IMPLEMENTED',
    code: '79',
  },
  {
    name: 'INVALID_CALL_REFERENCE',
    code: '81',
  },
  {
    name: 'INCOMPATIBLE_DESTINATION',
    code: '88',
  },
  {
    name: 'INVALID_MSG_UNSPECIFIED',
    code: '95',
  },
  {
    name: 'MANDATORY_IE_MISSING',
    code: '96',
  },
  {
    name: 'MESSAGE_TYPE_NONEXIST',
    code: '97',
  },
  {
    name: 'WRONG_MESSAGE',
    code: '98',
  },
  {
    name: 'IE_NONEXIST',
    code: '99',
  },
  {
    name: 'INVALID_IE_CONTENTS',
    code: '100',
  },
  {
    name: 'WRONG_CALL_STATE',
    code: '101',
  },
  {
    name: 'RECOVERY_ON_TIMER_EXPIRE',
    code: '102',
  },
  {
    name: 'MANDATORY_IE_LENGTH_ERROR',
    code: '103',
  },
  {
    name: 'PROTOCOL_ERROR',
    code: '111',
  },
  {
    name: 'INTERWORKING',
    code: '127',
  },
  {
    name: 'ORIGINATOR_CANCEL',
    code: '487',
  },
  {
    name: 'CRASH',
    code: '500',
  },
  {
    name: 'SYSTEM_SHUTDOWN',
    code: '501',
  },
  {
    name: 'LOSE_RACE',
    code: '502',
  },
  {
    name: 'MANAGER_REQUEST',
    code: '503',
  },
  {
    name: 'BLIND_TRANSFER',
    code: '600',
  },
  {
    name: 'ATTENDED_TRANSFER',
    code: '601',
  },
  {
    name: 'ALLOTTED_TIMEOUT',
    code: '602',
  },
  {
    name: 'USER_CHALLENGE',
    code: '603',
  },
  {
    name: 'MEDIA_TIMEOUT',
    code: '604',
  },
  {
    name: 'PICKED_OFF',
    code: '605',
  },
  {
    name: 'USER_NOT_REGISTERED',
    code: '606',
  },
  {
    name: 'PROGRESS_TIMEOUT',
    code: '607',
  },
  {
    name: 'GATEWAY_DOWN',
    code: '609',
  },
]);

export default HangupCauseOptions;
