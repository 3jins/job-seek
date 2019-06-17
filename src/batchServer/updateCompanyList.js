import _ from 'lodash';
import Company from '../mongodb/model/Company';

export default (hiringNoticeData, existingCompanies) => {
  const companies = hiringNoticeData.map(hiringNotice => hiringNotice.companyName);

  const dataToAdd = _.uniq(companies
    .filter(company => !existingCompanies.includes(company)));
  const dataToRemove = existingCompanies
    .filter(existingCompany => !companies.includes(existingCompany));

  Company.deleteMany({ name: { $in: dataToRemove } }, (err) => {
    if (err) console.error(err);
  });
  Company.insertMany(dataToAdd.map(companyName => ({ name: companyName })), (err) => {
    if (err) console.error(err);
  });
};
