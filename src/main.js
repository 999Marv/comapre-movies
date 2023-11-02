import movieData from '../movie-data.json' assert { type: 'json' };
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

//charts
const boxCtx = document.querySelector('#box-chart');
const genreCtx = document.querySelector('#genre-chart');
const critCtx = document.querySelector('#crit-chart');

//box arrays
const labelArray = [];
const dataArray = [];

//crit

//display movie function
const displayMovie = (mov, critS, audS, dom, gen) => {
  const li = document.createElement('li');
  li.className = 'movie-card';
  li.ariaLabel = 'movie information';
  li.tabIndex = '0';

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
    labelArray.push(movieData[i].title);
    dataArray.push(movieData[i].domestic);
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

  labelArray.unshift(movieTitle);
  dataArray.unshift(dgs);

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

const displayBoxChart = () => {
  new Chart(boxCtx, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [
        {
          label: 'Domestic Gross Totals',
          data: dataArray,
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(genreCtx, {
    type: 'doughnut',
    data: {
      labels: labelArray,
      datasets: [
        {
          label: 'Domestic Gross Totals',
          data: dataArray,
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(critCtx, {
    type: 'scatter',
    data: {
      labels: labelArray,
      datasets: [
        {
          label: 'Critic Score',
          data: [
            {
              x: -10,
              y: 0,
            },
            {
              x: 0,
              y: 10,
            },
            {
              x: 10,
              y: 5,
            },
            {
              x: 100,
              y: 5.5,
            },
          ],
          borderWidth: 3,
        },

        {
          label: 'Audience Score',
          data: [
            {
              x: -10,
              y: 0,
            },
            {
              x: 0,
              y: 10,
            },
            {
              x: 10,
              y: 5,
            },
            {
              x: 0.5,
              y: 5.5,
            },
          ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

//main function
const main = () => {
  displayLocalMovies();
  displayAllMovies();
  displayBoxChart();
};

main();
