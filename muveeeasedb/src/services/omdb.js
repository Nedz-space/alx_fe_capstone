const API_KEY = "51fdbfa9"; // your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(query) {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    if (data.Response === "False") return [];
    return data.Search;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
}

export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    if (data.Response === "False") return null;
    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null;
  }
}
