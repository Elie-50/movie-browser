import type { OmdbSearchMovie } from '@/redux/features/movies/moviesTypes';
import { useNavigate } from 'react-router-dom';

function SearchMovieItem({ movie }: { movie: OmdbSearchMovie }) {
  const navigate = useNavigate();

  return (
    <div
      key={movie.imdbID}
      className="group relative bg-card p-2 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/movie-browser/placeholder.png"}
        alt={movie.Title}
        className="w-full h-64 object-cover hover:scale-110 transition duration-300"
      />
      <div className="p-2 mt-2 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-center">{movie.Title}</h3>
        <p className="text-xs text-muted-foreground capitalize">{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
}

export default SearchMovieItem;
