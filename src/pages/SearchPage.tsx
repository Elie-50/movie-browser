import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchMovies } from "@/redux/features/movies/searchSlice";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import SearchMovieItem from "@/components/movie-components/SearchMovieItem";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 1000);

  const dispatch = useAppDispatch();
  const { result, loading, error } = useAppSelector((state) => state.search);

  // Update URL when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      // Keep current page from URL or default to 1
      dispatch(searchMovies({ s: debouncedQuery, page }));
    }
  }, [debouncedQuery, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ s: debouncedQuery, page: newPage.toString() });
    dispatch(searchMovies({ s: debouncedQuery, page: newPage }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mb-20">
      <h1 className="text-3xl font-bold my-4">Results for "{debouncedQuery}"</h1>

      {/* Search Input */}
      <div className="mb-6">
        <InputGroup>
          <InputGroupInput
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search className="w-4 h-4 text-muted-foreground" />
          </InputGroupAddon>
          {result?.totalResults && (
            <InputGroupAddon align="inline-end">
              {result.totalResults} result{parseInt(result.totalResults) > 1 ? "s" : ""}
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-destructive">Error: {error}</p>}
      {!loading && !error && result?.Search?.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {result?.Search?.map((movie) => (
          <SearchMovieItem movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {result?.totalResults && parseInt(result.totalResults) > 10 && (
        <ul className="flex mt-6 justify-center space-x-1">
          <li>
            <button
              className="px-3 py-1 rounded bg-card hover:bg-primary hover:text-primary-foreground"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </button>
          </li>

          {Array.from(
            { length: Math.ceil(parseInt(result.totalResults) / 10) },
            (_, i) => i + 1
          ).map((p) => (
            <li key={p}>
              <button
                onClick={() => handlePageChange(p)}
                className={`px-3 py-1 rounded ${
                  p === page
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-card hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {p}
              </button>
            </li>
          ))}

          <li>
            <button
              className="px-3 py-1 rounded bg-card hover:bg-primary hover:text-primary-foreground"
              disabled={page === Math.ceil(parseInt(result.totalResults) / 10)}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      )}

    </div>
  );
}
