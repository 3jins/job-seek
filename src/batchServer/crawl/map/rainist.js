export default ({
  uris: {
    developer: 'https://rainist.com/recruit/engineer',
    designer: 'https://rainist.com/recruit/design',
    marketer: 'https://rainist.com/recruit/marketer',
    manager: 'https://rainist.com/recruit/business',
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
      title: '.styles__jobs___1Th1z li button', // 'li>button' can be an alternative
      detailLink: {
        type: 'singlePage',
        selector: '.styles__jobs___1Th1z li button',
      },
    },
    detail: {
      title: '.styles__detailsContainer___OGU3P p.styles__wrapper___YB1-0 b:nth-of-type(1)',
      content: '.styles__detailsContainer___OGU3P p.styles__wrapper___YB1-0',
    },
  },
});
