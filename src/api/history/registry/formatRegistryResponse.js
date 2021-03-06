import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';

const computeDate = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(+timestamp);
  return date.toLocaleDateString();
};

const computeTime = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(+timestamp);
  return date.toLocaleTimeString();
};

const mapItems = (items) => {
  const defaultObject = {
    _isSelected: false,
  };
  return items.map((item) => ({
    ...defaultObject,
    ...item,
    date: computeDate(item.createdAt),
    time: computeTime(item.createdAt),
    bridgedAt: computeTime(item.bridgedAt),
    queueBridgedAt: computeTime(item.queueBridgedAt),
    answeredAt: computeTime(item.answeredAt),
    joinedAt: computeTime(item.joinedAt),
    leavingAt: computeTime(item.leavingAt),
    hangupAt: computeTime(item.hangupAt),
    reportingAt: computeTime(item.reportingAt),
    duration: convertDuration(item.duration),
    holdSec: convertDuration(item.holdSec),
    waitSec: convertDuration(item.waitSec),
    billSec: convertDuration(item.billSec),
    reportingSec: convertDuration(item.reportingSec),
    queueWaitSec: convertDuration(item.queueWaitSec),
    queueDurationSec: convertDuration(item.queueDurationSec),
  }));
};

const formatResponse = (response) => {
  if (response.items) {
    return {
      next: response.next || false,
      items: mapItems(response.items),
    };
  }
  return { items: [], next: false };
};

export default formatResponse;
