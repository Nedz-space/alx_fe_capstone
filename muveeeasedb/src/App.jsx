import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <div className="min-h-screen bg-[--color-bg] text-white">
      <nav className="p-4 flex justify-between items-center bg-gray-900">
        <Link to="/" className="text-2xl font-bold text-[--color-primary]">MuveeEaseDB</Link>
        <Link to="/favorites" className="text-gray-300 hover:text-white">Favorites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}
