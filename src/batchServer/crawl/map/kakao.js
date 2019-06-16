export default ({
  uris: {
    developer: 'https://careers.kakao.com/jobs?part=TECHNOLOGY',
    designer: 'https://careers.kakao.com/jobs?part=DESIGN',
    marketer: 'https://careers.kakao.com/jobs?part=BRAND_MARKETING',
    service: 'https://careers.kakao.com/jobs?part=BUSINESS_SERVICES',
    staff: 'https://careers.kakao.com/jobs?part=STAFF',
  },
  category: {
    type: 'query',
    variableName: 'skilset',
  },
  pagination: {
    type: 'urlQuery',
    variableName: 'page',
  },
  selector: {
    list: {
      title: '.txt_tit',
      detailLink: {
        type: 'anotherPage',
        selector: '.link_notice',
      },
    },
    detail: {
      title: '.txt_tit',
      content: '.cont_board',
    },
  },
});
