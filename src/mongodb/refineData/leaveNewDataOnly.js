export default (newData, existingData) => newData.filter(
  newOne => !existingData.reduce(
    (isThereSameOne, existingOne) => isThereSameOne
      || (existingOne.companyName === newOne.companyName && existingOne.title === newOne.title),
    false,
  ),
);
