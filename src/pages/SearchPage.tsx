import { useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchMovies } from "@/redux/features/movies/searchSlice";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import SearchMovieItem from "@/components/movie-components/SearchMovieItem";
import Loading from "@/components/Loading";
import { gsap } from "gsap";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const getPages = (current: number, total: number) => {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      // If small, show everything
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1); // first page always visible

    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    pages.push(total); // last page always visible

    return pages;
  };

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 1000);

  const dispatch = useAppDispatch();
  const { result, loading, error } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchMovies({ s: debouncedQuery, page }));
    }
  }, [debouncedQuery, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ s: debouncedQuery, page: newPage.toString() });
    dispatch(searchMovies({ s: debouncedQuery, page: newPage }));
  };

  useLayoutEffect(() => {
    if (!result?.Search) return;

    const ctx = gsap.context(() => {
      gsap.from(".movie-item", {
        opacity: 0,
        y: 20,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [result?.Search]);

  return (
    <div className="max-w-6xl mx-auto p-4 mb-20">
      <h1 className="text-3xl text-center font-bold my-4">Results for "{debouncedQuery}"</h1>

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
              {result.totalResults} result
              {parseInt(result.totalResults) > 1 ? "s" : ""}
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      {loading && <Loading />}
      {error && <p className="text-destructive">Error: {error}</p>}
      {!loading && !error && result?.Search?.length === 0 && <p>No results found.</p>}

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {result?.Search?.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <SearchMovieItem movie={movie} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {result?.totalResults && parseInt(result.totalResults) > 10 && (() => {
        const totalPages = Math.ceil(parseInt(result.totalResults) / 10);
        const pages = getPages(page, totalPages);

        return (
          <Pagination className="mt-6 justify-center">
            <PaginationContent>

              {/* Prev */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) handlePageChange(page - 1);
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Page links */}
              {pages.map((p, i) => (
                <PaginationItem key={i}>
                  {p === "..." ? (
                    <span className="px-2">…</span>
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(p as number);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) handlePageChange(page + 1);
                  }}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        );
      })()}
    </div>
  );
}
