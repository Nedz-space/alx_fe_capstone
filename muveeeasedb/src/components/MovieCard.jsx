import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { Heart } from "lucide-react"; // install via: npm install lucide-react

export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(movie.imdbID);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-80 object-cover"
        />
      </Link>

      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{movie.Title}</h2>
          <p className="text-gray-400">{movie.Year}</p>
        </div>

        <button
          onClick={() =>
            favorite ? removeFavorite(movie.imdbID) : addFavorite(movie)
          }
          className={`p-2 rounded-full ${
            favorite ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            fill={favorite ? "white" : "none"}
            stroke="white"
          />
        </button>
      </div>
    </div>
  );
}
