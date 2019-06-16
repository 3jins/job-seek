import _ from 'lodash';

export default (crawled) => {
  const getDuplicateIndex = (merged, title) => merged
    .reduce((duplicateIndex, hiringNotice, idx) => {
      if (duplicateIndex >= 0) return duplicateIndex;
      if (hiringNotice.title === title) return idx;
      return duplicateIndex;
    }, -1);

  return crawled.reduce((merged, hiringNotice) => {
    const { title, categories } = hiringNotice;
    const duplicateIndex = getDuplicateIndex(merged, title);
    if (duplicateIndex >= 0 && !merged[duplicateIndex].categories.includes(categories[0])) {
      merged[duplicateIndex].categories = _.concat(merged[duplicateIndex].categories, categories);
    } else {
      merged.push(hiringNotice);
    }
    return merged;
  }, []);
};
