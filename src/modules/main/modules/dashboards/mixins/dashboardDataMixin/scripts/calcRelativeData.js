const calcPercent = (sum, value) =>
  value ? Math.round((value * 100) / sum) : 0;

const calcRelativeData = (datasets, dates) => {
  // if dates, we have to params metric
  // array from map looks like [[key, value], [key, value],...]
  const datesArr = Array.from(dates);
  const datasetsArr = Array.from(datasets);
  const relativeDatasetsArr = datasetsArr.map((dataset) => {
    const data = datesArr.map((date, index) =>
      calcPercent(date[1], dataset[1].data[index]),
    );
    return [dataset[0], { data }];
  });
  return { datasets: new Map(relativeDatasetsArr), dates };
};

export default calcRelativeData;
