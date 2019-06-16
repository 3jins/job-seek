export default ({
  uris: {
    developer: 'https://recruit.navercorp.com/naver/job/list/developer',
    designer: 'https://recruit.navercorp.com/naver/job/list/designer',
    contents: 'https://recruit.navercorp.com/naver/job/list/contents',
    management: 'https://recruit.navercorp.com/naver/job/list/management',
  },
  category: {
    type: 'query',
    variableName: 'searchTxt',
  },
  pagination: {
    type: 'moreButton',
    selector: '.more_btn',
  },
  selector: {
    list: {
      title: '.crd_tit',
      date: {
        selector: '.crd_date',
        format: [
          {
            type: 'double',
            delimeter: '~',
            dateFormats: ['yyyymmdd', 'yyyymmdd'],
            dateDelimeters: ['.', '.'],
          },
          {
            type: 'single',
            dateFormat: '상시모집',
            dateDelimeters: [''],
          },
        ],
      },
      detailLink: {
        type: 'anotherPage',
        selector: '.card_list>ul>li>a',
      },
    },
    detail: {
      title: '.dtl_tit_con strong',
      content: '.dtl_context .context_area',
    },
  },
});
