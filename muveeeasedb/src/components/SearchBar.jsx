import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-[--color-card] p-2 rounded-xl shadow-md"
    >
      <input
        type="text"
        placeholder="Search for a movie..."
        className="flex-1 px-4 py-3 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[--color-primary] hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold transition-colors"
      >
        Search
      </button>
    </form>
  );
}
