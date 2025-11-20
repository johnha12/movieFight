// following is a very good way to make a fetch and cancel the prev fetch
// function to wrap any function to have a delay
const debounce = (func, delay=1000) => {    // note func may have args passed
  let timeOutId;
  return (...args) => {         // ...args takes in any num of args passed in
    if (timeOutId) {            // first run nothing happends
      clearTimeout(timeOutId);  // stops prev fetch for next fetch
    }
    timeOutId = setTimeout(() => {  // once full wait, newest fetch executes
      func.apply(null, args);   // apply calls function and takes all args and pass them in original funciton
    }, delay);
  };
};