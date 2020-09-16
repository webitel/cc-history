/**
 * Hangup causes to filter
 * @enum
 * @readonly
 */
const HangupCauseOptions = Object.freeze([
  {
    name: 'UNSPECIFIED',
    id: 0,
  },
  {
    name: 'UNALLOCATED_NUMBER',
    id: 1,
  },
  {
    name: 'NO_ROUTE_TRANSIT_NET',
    id: 2,
  },
  {
    name: 'NO_ROUTE_DESTINATION',
    id: 3,
  },
  {
    name: 'CHANNEL_UNACCEPTABLE',
    id: 6,
  },
  {
    name: 'CALL_AWARDED_DELIVERED',
    id: 7,
  },
  {
    name: 'NORMAL_CLEARING',
    id: 16,
  },
  {
    name: 'USER_BUSY',
    id: 17,
  },
  {
    name: 'NO_USER_RESPONSE',
    id: 18,
  },
  {
    name: 'NO_ANSWER',
    id: 19,
  },
  {
    name: 'SUBSCRIBER_ABSENT',
    id: 20,
  },
  {
    name: 'CALL_REJECTED',
    id: 21,
  },
  {
    name: 'NUMBER_CHANGED',
    id: 22,
  },
  {
    name: 'REDIRECTION_TO_NEW_DESTINATION',
    id: 23,
  },
  {
    name: 'EXCHANGE_ROUTING_ERROR',
    id: 25,
  },
  {
    name: 'DESTINATION_OUT_OF_ORDER',
    id: 27,
  },
  {
    name: 'INVALID_NUMBER_FORMAT',
    id: 28,
  },
  {
    name: 'FACILITY_REJECTED',
    id: 29,
  },
  {
    name: 'RESPONSE_TO_STATUS_ENQUIRY',
    id: 30,
  },
  {
    name: 'NORMAL_UNSPECIFIED',
    id: 31,
  },
  {
    name: 'NORMAL_CIRCUIT_CONGESTION',
    id: 34,
  },
  {
    name: 'NETWORK_OUT_OF_ORDER',
    id: 38,
  },
  {
    name: 'NORMAL_TEMPORARY_FAILURE',
    id: 41,
  },
  {
    name: 'SWITCH_CONGESTION',
    id: 42,
  },
  {
    name: 'ACCESS_INFO_DISCARDED',
    id: 43,
  },
  {
    name: 'REQUESTED_CHAN_UNAVAIL',
    id: 44,
  },
  {
    name: 'PRE_EMPTED',
    id: 45,
  },
  {
    name: 'FACILITY_NOT_SUBSCRIBED',
    id: 50,
  },
  {
    name: 'OUTGOING_CALL_BARRED',
    id: 52,
  },
  {
    name: 'INCOMING_CALL_BARRED',
    id: 54,
  },
  {
    name: 'BEARERCAPABILITY_NOTAUTH',
    id: 57,
  },
  {
    name: 'BEARERCAPABILITY_NOTAVAIL',
    id: 58,
  },
  {
    name: 'SERVICE_UNAVAILABLE',
    id: 63,
  },
  {
    name: 'BEARERCAPABILITY_NOTIMPL',
    id: 65,
  },
  {
    name: 'CHAN_NOT_IMPLEMENTED',
    id: 66,
  },
  {
    name: 'FACILITY_NOT_IMPLEMENTED',
    id: 69,
  },
  {
    name: 'SERVICE_NOT_IMPLEMENTED',
    id: 79,
  },
  {
    name: 'INVALID_CALL_REFERENCE',
    id: 81,
  },
  {
    name: 'INCOMPATIBLE_DESTINATION',
    id: 88,
  },
  {
    name: 'INVALID_MSG_UNSPECIFIED',
    id: 95,
  },
  {
    name: 'MANDATORY_IE_MISSING',
    id: 96,
  },
  {
    name: 'MESSAGE_TYPE_NONEXIST',
    id: 97,
  },
  {
    name: 'WRONG_MESSAGE',
    id: 98,
  },
  {
    name: 'IE_NONEXIST',
    id: 99,
  },
  {
    name: 'INVALID_IE_CONTENTS',
    id: 100,
  },
  {
    name: 'WRONG_CALL_STATE',
    id: 101,
  },
  {
    name: 'RECOVERY_ON_TIMER_EXPIRE',
    id: 102,
  },
  {
    name: 'MANDATORY_IE_LENGTH_ERROR',
    id: 103,
  },
  {
    name: 'PROTOCOL_ERROR',
    id: 111,
  },
  {
    name: 'INTERWORKING',
    id: 127,
  },
  {
    name: 'ORIGINATOR_CANCEL',
    id: 487,
  },
  {
    name: 'CRASH',
    id: 500,
  },
  {
    name: 'SYSTEM_SHUTDOWN',
    id: 501,
  },
  {
    name: 'LOSE_RACE',
    id: 502,
  },
  {
    name: 'MANAGER_REQUEST',
    id: 503,
  },
  {
    name: 'BLIND_TRANSFER',
    id: 600,
  },
  {
    name: 'ATTENDED_TRANSFER',
    id: 601,
  },
  {
    name: 'ALLOTTED_TIMEOUT',
    id: 602,
  },
  {
    name: 'USER_CHALLENGE',
    id: 603,
  },
  {
    name: 'MEDIA_TIMEOUT',
    id: 604,
  },
  {
    name: 'PICKED_OFF',
    id: 605,
  },
  {
    name: 'USER_NOT_REGISTERED',
    id: 606,
  },
  {
    name: 'PROGRESS_TIMEOUT',
    id: 607,
  },
  {
    name: 'GATEWAY_DOWN',
    id: 609,
  },
]);

export default HangupCauseOptions;
