export default ({
  uris: {
    all: 'https://zepl.breezy.hr/?&location=Seoul,%20KR#positions',
  },
  category: {
    type: 'in-title',
    delimeter: ' ',
    location: 0, // From 0th index of the string
  },
  pagination: {
    type: 'none',
  },
  selector: {
    list: {
      title: 'ul.positions li.position h2',
      detailLink: {
        type: 'anotherPage',
        selector: 'ul.positions li.position>a',
      },
    },
    detail: {
      title: '.banner h1',
      content: '.description',
    },
  },
});
