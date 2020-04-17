
const computeDate = (createdAt) => {
  const date = new Date(+createdAt);
  return date.toLocaleDateString();
};

const computeTime = (createdAt) => {
  const date = new Date(+createdAt);
  return date.toLocaleTimeString();
};

const formatResponse = (response) => {
  const defaultObject = {
    _isSelected: false,
  };
  if (response.items) {
    return response.items.map((item) => ({
      ...defaultObject,
      ...item,
      date: computeDate(item.createdAt),
      time: computeTime(item.createdAt),
      duration: new Date(item.duration || 0).toISOString()
        .substr(11, 8),
    }));
  }
  return [];
};

export default formatResponse;
