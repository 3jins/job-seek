export default (callback, period) => {
  callback();
  return setInterval(callback, period);
};
