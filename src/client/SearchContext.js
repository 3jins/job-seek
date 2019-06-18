import { createContext } from 'react';

export default createContext({
  searchContext: {
    companies: [],
    jobGroups: [],
    categories: [],
  },
  setSearchContext: () => {},
});
