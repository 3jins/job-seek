import _ from 'lodash';

export default jobData => _.reduce(jobData, (dataForMongodb, company, companyName) => [
  ...dataForMongodb,
  ..._.reduce(company, (mergedJobOffers, jobGroup, jobGroupName) => [
    ...mergedJobOffers,
    ...jobGroup.map(jobOffer => ({
      ...jobOffer,
      companyName,
      jobGroup: jobGroupName,
      dateCreated: new Date().getTime(),
    })),
  ], []),
], []);
