export default ({
  uris: {
    all: 'https://recruit.linepluscorp.com/lineplus/career/',
  },
  category: {
    type: 'query',
    variableName: 'tag',
  },
  pagination: {
    type: 'none',
  },
  selector: {
    list: {
      title: '.td_tit a',
      date: {
        selector: '.jobs_table tr td:nth-child(5)', // Starts from 0
        format: [
          {
            type: 'double',
            delimeter: '~',
            dateFormats: ['yyyymmdd'],
            dateDelimeters: ['.'],
          },
          {
            type: 'double',
            delimeter: '~',
            dateFormats: ['yyyymmdd', '채용시까지'],
            dateDelimeters: ['.', ''],
          },
        ],
      },
      detailLink: {
        type: 'anotherPage',
        selector: '.td_tit a',
      },
    },
    detail: {
      title: '.content_title_area h3',
      content: '.content_area',
    },
  },
});
