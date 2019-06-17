import _ from 'lodash';
import JobGroup from '../mongodb/model/JobGroup';

export default (hiringNoticeData, existingJobGroups) => {
  const jobGroups = hiringNoticeData.map(hiringNotice => hiringNotice.jobGroup);

  const dataToAdd = _.uniq(jobGroups
    .filter(jobGroup => !existingJobGroups.includes(jobGroup)));
  const dataToRemove = existingJobGroups
    .filter(existingJobGroup => !jobGroups.includes(existingJobGroup));

  JobGroup.deleteMany({ name: { $in: dataToRemove } }, (err) => {
    if (err) console.error(err);
  });
  JobGroup.insertMany(dataToAdd.map(jobGroupName => ({ name: jobGroupName })), (err) => {
    if (err) console.error(err);
  });
};
