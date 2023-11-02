import movieData from '/src/movie-data.json';

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

//display movie function
const displayMovie = (mov, critS, audS, dom, gen) => {
  const li = document.createElement('li');
  li.className = 'movie-card';
  li.ariaLabel = 'movie information';

  const movieName = document.createElement('h4');
  const criticScore = document.createElement('p');
  const audienceScore = document.createElement('p');
  const domestic = document.createElement('p');
  const genre = document.createElement('p');

  movieName.textContent = mov;
  criticScore.textContent = `Critic Score: ${critS}%`;
  audienceScore.textContent = `Audience Score: ${audS}%`;
  domestic.textContent = `Domestic Total: $${Number(dom).toLocaleString()}`;
  genre.textContent = `Genre: ${gen}`;

  li.append(movieName, criticScore, audienceScore, domestic, genre);
  return li;
};

//display all movies function
const displayAllMovies = () => {
  for (let i = 0; i < movieData.length; i++) {
    movieContainer.append(
      displayMovie(
        movieData[i].title,
        movieData[i].criticScore,
        movieData[i].audienceScore,
        movieData[i].domestic,
        movieData[i].genre
      )
    );
  }
};

//event callback
const handleMovieInput = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const { movieTitle, criticScore, audienceScore, dgs, genre } =
    Object.fromEntries(formData);

  //save movies to local storage
  setLocalStorageKey(movieTitle, {
    movieTitle,
    criticScore,
    audienceScore,
    dgs,
    genre,
  });

  movieContainer.prepend(
    displayMovie(movieTitle, criticScore, audienceScore, dgs, genre)
  );

  form.reset();
};

//form event listener
form.addEventListener('submit', handleMovieInput);

//post local storage
const displayLocalMovies = () => {
  Object.keys(localStorage).forEach((key) => {
    const { movieTitle, criticScore, audienceScore, dgs, genre } =
      getLocalStorageValue(key);
    movieContainer.prepend(
      displayMovie(movieTitle, criticScore, audienceScore, dgs, genre)
    );
  });
};

//reset button
const resetBtn = document.querySelector('#reset');

//reset button function
const resetHandler = (e) => {
  if (!localStorage.length) {
    return;
  } else {
    localStorage.clear();
    movieContainer.innerHTML = '';
    displayAllMovies();
  }
};

resetBtn.addEventListener('click', resetHandler);

//main function
const main = () => {
  displayLocalMovies();
  displayAllMovies();
};

main();
