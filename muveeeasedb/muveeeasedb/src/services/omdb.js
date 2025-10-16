// src/services/omdb.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Fetch movies based on a search query and optional page number.
 * @param {string} query - The movie search keyword.
 * @param {number} page - The page number for paginated results (default: 1).
 * @returns {Promise<Object>} - Returns OMDb search results with pagination metadata.
 */
export async function fetchMovies(query, page = 1) {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
    const data = await res.json();

    if (data.Response === "False") {
      return { Response: "False", Error: data.Error || "No results found." };
    }

    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return { Response: "False", Error: "Network error occurred." };
  }
}

/**
 * Alias for fetchMovies — keeps backwards compatibility.
 */
export const searchMovies = fetchMovies;

/**
 * Fetch detailed information about a specific movie.
 * @param {string} id - The IMDb ID of the movie.
 * @returns {Promise<Object|null>} - Returns movie details or null on failure.
 */
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
