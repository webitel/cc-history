/**
 * Hangup causes to filter
 * @enum
 * @readonly
 */
const HangupCauseOptions = Object.freeze([
  {
    name: 'UNSPECIFIED',
    code: 'UNSPECIFIED',
  },
  {
    name: 'UNALLOCATED_NUMBER',
    code: 'UNALLOCATED_NUMBER',
  },
  {
    name: 'NO_ROUTE_TRANSIT_NET',
    code: 'NO_ROUTE_TRANSIT_NET',
  },
  {
    name: 'NO_ROUTE_DESTINATION',
    code: 'NO_ROUTE_DESTINATION',
  },
  {
    name: 'CHANNEL_UNACCEPTABLE',
    code: 'CHANNEL_UNACCEPTABLE',
  },
  {
    name: 'CALL_AWARDED_DELIVERED',
    code: 'CALL_AWARDED_DELIVERED',
  },
  {
    name: 'NORMAL_CLEARING',
    code: 'NORMAL_CLEARING',
  },
  {
    name: 'USER_BUSY',
    code: 'USER_BUSY',
  },
  {
    name: 'NO_USER_RESPONSE',
    code: 'NO_USER_RESPONSE',
  },
  {
    name: 'NO_ANSWER',
    code: 'NO_ANSWER',
  },
  {
    name: 'SUBSCRIBER_ABSENT',
    code: 'SUBSCRIBER_ABSENT',
  },
  {
    name: 'CALL_REJECTED',
    code: 'CALL_REJECTED',
  },
  {
    name: 'NUMBER_CHANGED',
    code: 'NUMBER_CHANGED',
  },
  {
    name: 'REDIRECTION_TO_NEW_DESTINATION',
    code: 'REDIRECTION_TO_NEW_DESTINATION',
  },
  {
    name: 'EXCHANGE_ROUTING_ERROR',
    code: 'EXCHANGE_ROUTING_ERROR',
  },
  {
    name: 'DESTINATION_OUT_OF_ORDER',
    code: 'DESTINATION_OUT_OF_ORDER',
  },
  {
    name: 'INVALID_NUMBER_FORMAT',
    code: 'INVALID_NUMBER_FORMAT',
  },
  {
    name: 'FACILITY_REJECTED',
    code: 'FACILITY_REJECTED',
  },
  {
    name: 'RESPONSE_TO_STATUS_ENQUIRY',
    code: 'RESPONSE_TO_STATUS_ENQUIRY',
  },
  {
    name: 'NORMAL_UNSPECIFIED',
    code: 'NORMAL_UNSPECIFIED',
  },
  {
    name: 'NORMAL_CIRCUIT_CONGESTION',
    code: 'NORMAL_CIRCUIT_CONGESTION',
  },
  {
    name: 'NETWORK_OUT_OF_ORDER',
    code: 'NETWORK_OUT_OF_ORDER',
  },
  {
    name: 'NORMAL_TEMPORARY_FAILURE',
    code: 'NORMAL_TEMPORARY_FAILURE',
  },
  {
    name: 'SWITCH_CONGESTION',
    code: 'SWITCH_CONGESTION',
  },
  {
    name: 'ACCESS_INFO_DISCARDED',
    code: 'ACCESS_INFO_DISCARDED',
  },
  {
    name: 'REQUESTED_CHAN_UNAVAIL',
    code: 'REQUESTED_CHAN_UNAVAIL',
  },
  {
    name: 'PRE_EMPTED',
    code: 'PRE_EMPTED',
  },
  {
    name: 'FACILITY_NOT_SUBSCRIBED',
    code: 'FACILITY_NOT_SUBSCRIBED',
  },
  {
    name: 'OUTGOING_CALL_BARRED',
    code: 'OUTGOING_CALL_BARRED',
  },
  {
    name: 'INCOMING_CALL_BARRED',
    code: 'INCOMING_CALL_BARRED',
  },
  {
    name: 'BEARERCAPABILITY_NOTAUTH',
    code: 'BEARERCAPABILITY_NOTAUTH',
  },
  {
    name: 'BEARERCAPABILITY_NOTAVAIL',
    code: 'BEARERCAPABILITY_NOTAVAIL',
  },
  {
    name: 'SERVICE_UNAVAILABLE',
    code: 'SERVICE_UNAVAILABLE',
  },
  {
    name: 'BEARERCAPABILITY_NOTIMPL',
    code: 'BEARERCAPABILITY_NOTIMPL',
  },
  {
    name: 'CHAN_NOT_IMPLEMENTED',
    code: 'CHAN_NOT_IMPLEMENTED',
  },
  {
    name: 'FACILITY_NOT_IMPLEMENTED',
    code: 'FACILITY_NOT_IMPLEMENTED',
  },
  {
    name: 'SERVICE_NOT_IMPLEMENTED',
    code: 'SERVICE_NOT_IMPLEMENTED',
  },
  {
    name: 'INVALID_CALL_REFERENCE',
    code: 'INVALID_CALL_REFERENCE',
  },
  {
    name: 'INCOMPATIBLE_DESTINATION',
    code: 'INCOMPATIBLE_DESTINATION',
  },
  {
    name: 'INVALID_MSG_UNSPECIFIED',
    code: 'INVALID_MSG_UNSPECIFIED',
  },
  {
    name: 'MANDATORY_IE_MISSING',
    code: 'MANDATORY_IE_MISSING',
  },
  {
    name: 'MESSAGE_TYPE_NONEXIST',
    code: 'MESSAGE_TYPE_NONEXIST',
  },
  {
    name: 'WRONG_MESSAGE',
    code: 'WRONG_MESSAGE',
  },
  {
    name: 'IE_NONEXIST',
    code: 'IE_NONEXIST',
  },
  {
    name: 'INVALID_IE_CONTENTS',
    code: 'INVALID_IE_CONTENTS',
  },
  {
    name: 'WRONG_CALL_STATE',
    code: 'WRONG_CALL_STATE',
  },
  {
    name: 'RECOVERY_ON_TIMER_EXPIRE',
    code: 'RECOVERY_ON_TIMER_EXPIRE',
  },
  {
    name: 'MANDATORY_IE_LENGTH_ERROR',
    code: 'MANDATORY_IE_LENGTH_ERROR',
  },
  {
    name: 'PROTOCOL_ERROR',
    code: 'PROTOCOL_ERROR',
  },
  {
    name: 'INTERWORKING',
    code: 'INTERWORKING',
  },
  {
    name: 'ORIGINATOR_CANCEL',
    code: 'ORIGINATOR_CANCEL',
  },
  {
    name: 'CRASH',
    code: 'CRASH',
  },
  {
    name: 'SYSTEM_SHUTDOWN',
    code: 'SYSTEM_SHUTDOWN',
  },
  {
    name: 'LOSE_RACE',
    code: 'LOSE_RACE',
  },
  {
    name: 'MANAGER_REQUEST',
    code: 'MANAGER_REQUEST',
  },
  {
    name: 'BLIND_TRANSFER',
    code: 'BLIND_TRANSFER',
  },
  {
    name: 'ATTENDED_TRANSFER',
    code: 'ATTENDED_TRANSFER',
  },
  {
    name: 'ALLOTTED_TIMEOUT',
    code: 'ALLOTTED_TIMEOUT',
  },
  {
    name: 'USER_CHALLENGE',
    code: 'USER_CHALLENGE',
  },
  {
    name: 'MEDIA_TIMEOUT',
    code: 'MEDIA_TIMEOUT',
  },
  {
    name: 'PICKED_OFF',
    code: 'PICKED_OFF',
  },
  {
    name: 'USER_NOT_REGISTERED',
    code: 'USER_NOT_REGISTERED',
  },
  {
    name: 'PROGRESS_TIMEOUT',
    code: 'PROGRESS_TIMEOUT',
  },
  {
    name: 'GATEWAY_DOWN',
    code: 'GATEWAY_DOWN',
  },
]);

export default HangupCauseOptions;
