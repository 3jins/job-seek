import _ from 'lodash';

const customizer = (obj1, obj2) => {
  // TODO: It might be possible that I'm handling Mongodb query in wrong way.
  const keyList = _.union(Object.keys(obj1), Object.keys(obj2))
    .filter(elem => !['_id', '__v', 'dateCreated'].includes(elem));
  return keyList.reduce((isSame, key) => isSame && obj1[key] === obj2[key], true);
};

export default (newData, existingData) => newData.reduce(
  (updatedDataList, newOne) => {
    const updatedOne = existingData.reduce(
      (updatedData, existingOne) => {
        const isUpdated = (existingOne.companyName === newOne.companyName && existingOne.title === newOne.title)
          && !_.isEqualWith(existingOne, newOne, customizer);
        if (isUpdated) updatedData = { _id: existingOne._id, ...newOne };
        return updatedData;
      }, {},
    );
    if (!_.isEmpty(updatedOne)) updatedDataList.push(updatedOne);
    return updatedDataList;
  }, [],
);
