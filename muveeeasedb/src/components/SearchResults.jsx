import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/omdb";
import MovieCard from "./MovieCard";

export default function SearchResults({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(query);
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, [query]);

  if (!query)
    return (
      <p className="text-center text-gray-400">
        Start by searching for your favorite movie 🎬
      </p>
    );

  if (loading)
    return <p className="text-center text-gray-400">Loading movies...</p>;

  if (movies.length === 0)
    return (
      <p className="text-center text-gray-400">
        No movies found for “{query}” 😔
      </p>
    );

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
