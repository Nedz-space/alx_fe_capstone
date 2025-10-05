import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchDetails = async () => {
      setStatus("loading");
      try {
        const data = await getMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    fetchDetails();
  }, [id]);

  if (status === "loading")
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  if (status === "error" || !movie)
    return (
      <p className="text-center text-red-400 mt-10">
        Failed to load movie details.
      </p>
    );

  return (
    <main className="container mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-block mb-6 text-[--color-primary] hover:underline"
      >
        ← Back to Search
      </Link>

      <div className="grid md:grid-cols-2 gap-8 bg-[--color-card] p-6 rounded-xl shadow-lg">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={movie.Title}
          className="rounded-lg shadow-md w-full"
        />

        <div>
          <h2 className="text-3xl font-bold text-[--color-primary] mb-2">
            {movie.Title}
          </h2>
          <p className="text-gray-300 mb-4">
            {movie.Year} • {movie.Genre}
          </p>

          <p className="text-gray-200 mb-6 leading-relaxed">{movie.Plot}</p>

          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-100">Director:</span>{" "}
              {movie.Director}
            </p>
            <p>
              <span className="font-semibold text-gray-100">Cast:</span>{" "}
              {movie.Actors}
            </p>
            <p>
              <span className="font-semibold text-gray-100">Language:</span>{" "}
              {movie.Language}
            </p>
            <p>
              <span className="font-semibold text-gray-100">IMDB Rating:</span>{" "}
              {movie.imdbRating}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
