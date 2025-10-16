import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => setSearchQuery(query);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-500 mb-2 tracking-tight">
          MuveeEaseDB
        </h1>
        <p className="text-gray-300">
          Discover movies, shows, and entertainment at ease.
        </p>
      </header>

      {/* Search */}
      <section className="max-w-2xl mx-auto mb-10">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Results */}
      <section>
        <SearchResults query={searchQuery} />
      </section>
    </main>
  );
}
