import leaveRemovedDataOnly from '../mongodb/refineData/leaveRemovedDataOnly';
import leaveUpdatedDataOnly from '../mongodb/refineData/leaveUpdatedDataOnly';
import leaveNewDataOnly from '../mongodb/refineData/leaveNewDataOnly';
import HiringNotice from '../mongodb/model/HiringNotice';

export default (newData, existingData) => {
  const idToRemove = leaveRemovedDataOnly(newData, existingData)
    .map(dataToRemove => dataToRemove._id);
  const dataToUpdate = leaveUpdatedDataOnly(newData, existingData);
  const dataToInsert = leaveNewDataOnly(newData, existingData);
  HiringNotice.deleteMany({ _id: { $in: idToRemove } }, (err) => {
    if (err) console.error(err);
  });
  HiringNotice.insertMany(dataToInsert, (err) => {
    if (err) console.error(err);
  });
  dataToUpdate.forEach(updatedOne => HiringNotice.updateOne(
    { _id: updatedOne._id },
    updatedOne,
    (err) => {
      if (err) console.error(err);
    },
  ));
};
