const computeDate = (createdAt) => {
  const date = new Date(+createdAt);
  return date.toLocaleDateString();
};

const computeTime = (createdAt) => {
  const date = new Date(+createdAt);
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
    duration: new Date(item.duration * 10 ** 3 || 0).toISOString()
      .substr(11, 8),
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
