const normalizeDashboardData = ({
                                         aggValue,
                                         param,
                                         data,
                                         dateKey = 'createdAt',
                                         defaultValue = 0,
                                       }) => {
  const dataSources = data.reduce((wrapper, item) => {
    const itemParam = item[param];
    const itemValue = item[aggValue] || defaultValue;
    const itemDate = item[dateKey];

    const date = wrapper.dates.get(itemDate);
    if (date) {
      wrapper.dates.set(itemDate, date + itemValue);
    } else {
      wrapper.dates.set(itemDate, itemValue);
    }

    if (!wrapper.datasets.has(itemParam)) {
      wrapper.datasets.set(itemParam, { data: [] });
    }

    const datasets = wrapper.datasets.get(itemParam);
    if (datasets.data.length < wrapper.dates.size) {
      datasets.data = datasets.data
        .concat(new Array(wrapper.dates.size - datasets.data.length - 1).fill(defaultValue));
    }
    datasets.data.push(itemValue);
    return wrapper;
  }, {
    datasets: new Map(),
    dates: new Map(),
  });

  // fill with 0's
  dataSources.datasets.forEach((dataset) => {
    if (dataset.data.length < dataSources.dates.size) {
      // eslint-disable-next-line no-param-reassign
      dataset.data = dataset.data
        .concat(new Array(dataSources.dates.size - dataset.data.length).fill(defaultValue));
    }
  });

  dataSources.datasets.delete(null);
  return dataSources;
};

export default normalizeDashboardData;
