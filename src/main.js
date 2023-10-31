import movieData from '/src/movie-data.json';

console.log(movieData);

//Local Storage Code
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageValue = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

//dom elements
const form = document.querySelector('#new-movie-form');
const movieContainer = document.querySelector('#movie-container');

//steps to create movie
//create li
// li class = 'movie-card'   aria = "movie information"
// create h4 tag - movieName
// create p tag - criticScore
// create p tag - audienceScore
// create p tag - domesticGT
// create p tag - genre
//append all to li
//append li to movieContainer

console.log(form);
console.log(movieContainer);

const main = () => {
  console.log('yo');
};

main();
