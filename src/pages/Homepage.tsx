import HighestGrossingFilms from "@/components/movie-components/HighestGrossingFilms";
import Slogan from "@/components/movie-components/Slogan";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?s=${encodeURIComponent(query.trim())}&page=1`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold">Movie Browser</h1>
        <p className="text-lg text-muted-foreground">
          Search for your favorite <Slogan />
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-6 flex w-full max-w-xl mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="flex-1 px-4 py-3 rounded-l-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-r-lg font-semibold hover:bg-primary/80 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <HighestGrossingFilms />
    </div>
  );
}
