export default (event, href) => {
  const { ctrlKey, shiftKey } = event;
  if (ctrlKey) {
    window.open(href, '_blank').focus();
  } else if (shiftKey) {
    window.open(href);
  } else {
    window.location = href;
  }
};
