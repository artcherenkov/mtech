const DEBOUNCE_INTERVAL = 100; // ms

export const debounce = (cb) => {
  let lastTimeout = null;

  return function () {
    const parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
