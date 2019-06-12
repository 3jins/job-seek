export default ({
  uris: {
    developer: 'https://rainist.com/recruit/engineer',
    designer: 'https://rainist.com/recruit/design',
    marketer: 'https://rainist.com/recruit/marketer',
    manager: 'https://rainist.com/recruit/business',
  },
  categoryUrl: {
    type: 'in-title',
    delimeter: ' ',
    location: 0, // From 0th index of the string
  },
  pagination: {
    type: 'none',
  },
  selector: {
    list: {
      title: '.styles__jobs___1Th1z li button', // 'li>button' can be an alternative
      detailLink: {
        type: 'singlePage',
        selector: '.styles__jobs___1Th1z li button',
      },
    },
    detail: {
      title: 'p.styles__wrapper___YB1-0 b:nth-child(1)',
      content: 'p.styles__wrapper___YB1-0',
    },
  },
});
