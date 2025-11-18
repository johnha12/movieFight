const fetchData = async (searchTerm)  => {    // axios puts everything together
  const response = await axios.get("http://www.omdbapi.com/", {   // response take time
    params: {
      apikey: "2d0ad63e",
      // s: "avengers"
      s: searchTerm
    }
  });

  if (response.data.Error) {    // case where no movies found
    return [];
  }
  // console.log(response.data);
  return response.data.Search;    // array of movies
};

// is-active is for styling using bulma. will use later
// results in <div class="dropdown-content results">, just for styling
// dropdown content will show all results we'll get
const root = document.querySelector(".autocomplete")
root.innerHTML = `
  <label><b>Search for a movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;


const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results")


const onInput = async event => {    // mark async because await is inside
  const movies = await fetchData(event.target.value); // need await because fetchData is an async function
  // console.log(movies);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return
  }

  resultsWrapper.innerHTML = "";// clear out prev input
  dropdown.classList.add("is-active");
  for (let movie of movies) {   // edge case where no moive response found
    const option = document.createElement("a");
    const imgSrc = movie.Poster ==="N/A" ? "" : movie.Poster;
    // note backtick for multi-line code
    //onerror="this.src=''" for broken links
    option.classList.add("dropdown-item");
    option.innerHTML= `
    <img src="${imgSrc}" onerror="this.src=''"/>
    ${movie.Title}
    `
    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

// if user clicks outside root/menu, then close menu
document.addEventListener("click", event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});