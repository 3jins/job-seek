export default ({
  uris: {
    unclassified: 'https://skelterlabs.com/careers/',
  },
  category: {
    type: 'in-title',
    delimeter: '\n',
    location: 0, // From 0th index of the string
  },
  pagination: {
    type: 'none',
  },
  selector: {
    list: {
      title: '.job-item .position',
      detailLink: {
        type: 'anotherPage',
        selector: '.job-item .apply-button a',
      },
    },
    detail: {
      title: '.above-footer .page-container h1:nth-of-type(2)',
      content: '.above-footer .page-container div:nth-of-type(2)',
    },
  },
});
