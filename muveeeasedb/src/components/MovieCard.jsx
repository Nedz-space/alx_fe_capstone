import React from "react";

export default function MovieCard({ movie }) {
  const { Title, Year, Poster } = movie;
  const validPoster =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/300x445?text=No+Image";

  return (
    <div className="bg-[--color-card] rounded-xl overflow-hidden shadow-lg hover:shadow-[--color-primary]/40 hover:scale-105 transition-transform">
      <img
        src={validPoster}
        alt={`${Title} Poster`}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{Title}</h3>
        <p className="text-sm text-gray-400">{Year}</p>
      </div>
    </div>
  );
}
