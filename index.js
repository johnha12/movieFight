const fetchData = async (searchTerm)  => {    // axios puts everything together
  const response = await axios.get("http://www.omdbapi.com/", {   // response take time
    params: {
      apikey: "2d0ad63e",
      // s: "avengers"
      s: searchTerm
    }
  });
  console.log(response.data);
};

// fetchData();

const input = document.querySelector("input");


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

// following is a very good way to make a fetch and cancel the prev fetch

const onInput = event => {
  fetchData(event.target.value);
};

input.addEventListener("input", debounce(onInput, 500));