export function debounce(func, ms, immediate) {
  let timeout;
  return function() {
    let context = this
    let args = arguments;
    let delayedFunc = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(delayedFunc, ms);
    if (callNow) func.apply(context, args);
  };
}
