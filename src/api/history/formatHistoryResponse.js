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

const prettifySec = (sec) => {
  if (!sec) return null;
  return new Date(sec * 10 ** 3).toISOString()
    .substr(11, 8);
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
    duration: prettifySec(item.duration),
    holdSec: prettifySec(item.holdSec),
    waitSec: prettifySec(item.waitSec),
    billSec: prettifySec(item.billSec),
    reportingSec: prettifySec(item.reportingSec),
    queueWaitSec: prettifySec(item.queueWaitSec),
    queueDurationSec: prettifySec(item.queueDurationSec),
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
