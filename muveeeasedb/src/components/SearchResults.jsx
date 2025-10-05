import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { searchMovies } from "../services/omdb";

export default function SearchResults({ query }) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setStatus("loading");
      setError("");
      try {
        const data = await searchMovies(query);
        if (data.Response === "False") {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
        setStatus("success");
      } catch {
        setStatus("error");
        setError("Failed to fetch movies. Try again later.");
      }
    };

    fetchMovies();
  }, [query]);

  if (!query)
    return (
      <p className="text-center text-gray-400">
        Start searching to explore movies.
      </p>
    );

  if (status === "loading")
    return <p className="text-center text-gray-400">Loading...</p>;

  if (error)
    return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
