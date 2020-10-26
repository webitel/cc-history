const mapItems = (items) => (
  // retrieve data from item and round all numerical values to 2 digits after comma
  items.map((item) => (
    item.data.map((dataItem) => {
      const mappedItem = {};
      Object.keys(dataItem).forEach((key) => {
        let value = dataItem[key];
        if (typeof value === 'number') value = Math.round(value * 100) / 100;
        mappedItem[key] = value;
      });
      return mappedItem;
    })
  ))
);

const formatResponse = (response) => {
  if (response.items) {
    return mapItems(response.items);
  }
  return [];
};

export default formatResponse;
