export default (newData, existingData) => existingData.filter(
  existingOne => !newData.reduce(
    (isThereSameOne, newOne) => isThereSameOne
      || (newOne.companyName === existingOne.companyName && newOne.title === existingOne.title),
    false,
  ),
);
