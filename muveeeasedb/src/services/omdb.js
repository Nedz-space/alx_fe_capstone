const API_KEY = "51fdbfa9";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
}

export async function getMovieDetails(imdbID) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  const data = await response.json();
  return data;
}
