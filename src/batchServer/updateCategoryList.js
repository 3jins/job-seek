import _ from 'lodash';
import Category from '../mongodb/model/Category';
import category from './crawl/category';

export default (existingCategories) => {
  const categories = _.reduce(category, (mergedCategories, company) => {
    const newOnes = Object.keys(company)
      .filter(companyCategory => !mergedCategories.includes(companyCategory));
    return mergedCategories.concat(newOnes);
  }, []);

  const dataToAdd = categories
    .filter(category => !existingCategories.includes(category));
  const dataToRemove = existingCategories
    .filter(existingCategory => !categories.includes(existingCategory));

  Category.deleteMany({ name: { $in: dataToRemove } }, (err) => {
    if (err) console.error(err);
  });
  Category.insertMany(dataToAdd.map(categoryName => ({ name: categoryName })), (err) => {
    if (err) console.error(err);
  });
};
