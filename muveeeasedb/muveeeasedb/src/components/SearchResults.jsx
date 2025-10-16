import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/omdb";

export default function SearchResults({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError("");
    searchMovies(query, page)
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults));
        } else {
          setError(data.Error || "No results found.");
          setMovies([]);
          setTotalResults(0);
        }
      })
      .catch(() => setError("An error occurred while fetching data."))
      .finally(() => setLoading(false));
  }, [query, page]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (!query) return null;

  return (
    <div className="text-center">
      {loading && <p className="text-gray-400">Loading movies...</p>}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-10 space-x-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-300">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
