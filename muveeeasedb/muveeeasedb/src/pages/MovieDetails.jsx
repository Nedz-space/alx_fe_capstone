import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/omdb";
import { FavoritesContext } from "../context/FavoritesContext";
import { Heart } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

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

  const favorite = isFavorite(movie.imdbID);

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
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-4xl font-bold">{movie.Title}</h2>
            <button
              onClick={() => toggleFavorite(movie)}
              className={`p-2 rounded-full transition ${
                favorite ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
              title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={22} fill={favorite ? "white" : "none"} stroke="white" />
            </button>
          </div>

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

          {movie.Director && (
            <p className="text-gray-400 mt-4">
              <strong>Director:</strong> {movie.Director}
            </p>
          )}
          {movie.Writer && (
            <p className="text-gray-400">
              <strong>Writer:</strong> {movie.Writer}
            </p>
          )}
          {movie.Actors && (
            <p className="text-gray-400">
              <strong>Cast:</strong> {movie.Actors}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
