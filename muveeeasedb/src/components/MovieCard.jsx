import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { Title, Year, Poster, imdbID } = movie;
  const validPoster =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/300x445?text=No+Image";

  return (
    <Link
      to={`/movie/${imdbID}`}
      className="bg-[--color-card] rounded-xl overflow-hidden shadow-lg hover:shadow-[--color-primary]/40 hover:scale-105 transition-transform"
    >
      <img
        src={validPoster}
        alt={`${Title} Poster`}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{Title}</h3>
        <p className="text-sm text-gray-400">{Year}</p>
      </div>
    </Link>
  );
}
