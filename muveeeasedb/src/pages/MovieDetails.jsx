import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/omdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    getDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!movie) return <p className="text-center mt-20">Movie not found.</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-block mb-6 text-indigo-400 hover:underline text-sm"
      >
        ← Back to Search
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="rounded-lg shadow-lg w-full"
        />
        <div>
          <h2 className="text-4xl font-bold mb-4">{movie.Title}</h2>
          <p className="text-gray-400 mb-2">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-400 mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-400 mb-2">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p className="text-gray-400 mb-4">
            <strong>Rating:</strong> {movie.imdbRating} ⭐
          </p>
          <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
