import { useState, useRef, useEffect } from "react";
import Genre from "@/components/movie-components/Genre";
import { PersonList } from "@/components/movie-components/PersonList";
import Runtime from "@/components/movie-components/Runtime";
import Title from "@/components/movie-components/Title";
import Year from "@/components/movie-components/Year";
import Plot from "@/components/movie-components/Plot";
import Ratings from "@/components/movie-components/Ratings";
import InfoItem from "@/components/movie-components/InfoItem";
import Poster from "@/components/movie-components/Poster";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import { clearMovie, fetchMovie } from "@/redux/features/movies/movieSlice";
import Loading from "@/components/Loading";

export default function MovieDetailsPage() {
  const { imdbID } = useParams<{ imdbID: string }>();
  
  const [showFullPoster, setShowFullPoster] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { data: movie, loading, error } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  const handlePosterClick = () => setShowFullPoster((prev) => !prev);

  useEffect(() => {
    if (!imdbID) return;

    dispatch(fetchMovie({ i: imdbID }));

    return () => {
      dispatch(clearMovie());
    };
  }, [dispatch, imdbID]);

  useEffect(() => {
    if (!posterRef.current || !infoRef.current) return;

    const posterEl = posterRef.current;
    const infoEl = infoRef.current;

    // Mobile-only animation
    if (window.innerWidth < 768) {
      gsap.to(posterEl, {
        height: showFullPoster ? "auto" : 250,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(infoEl, {
        y: showFullPoster ? 0 : -80,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [showFullPoster]);

  if (loading) return <Loading />;
  if (error) return <h1 className="text-center text-3xl p-6 text-red-500">{error}</h1>;

  if (!movie) return null;

  return (
    <div className="mx-auto p-6">
      <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-visible md:flex relative">
        {/* Poster */}
        <div
          ref={posterRef}
          className="relative w-full md:w-1/3 z-10 cursor-pointer overflow-hidden
            h-80 md:h-auto"
          onClick={handlePosterClick}
        >
          <Poster
            poster={movie.Poster}
            title={movie.Title}
            type={movie.Type}
          />

          {!showFullPoster && (
            <div className="absolute inset-0 flex items-center justify-center md:hidden"></div>
          )}
        </div>

        {/* Movie Info */}
        <div
          ref={infoRef}
          className="rounded-t-3xl z-20 flex flex-col justify-between space-y-4 w-full md:w-2/3 bg-card relative p-6"
        >
          <div>
            <Title>{movie.Title}</Title>
            <div className="text-sm text-muted-foreground mb-4 text-center">
              <Year>{movie.Year}</Year>
              <br />
              <Genre genre={movie.Genre} /> <br />
              <Runtime runtime={movie.Runtime} />
            </div>
            <PersonList label="Director" names={movie.Director} />
            <PersonList label="Writer" names={movie.Writer} />
            <PersonList label="Actors" names={movie.Actors} />
            <Plot plot={movie.Plot} />
          </div>

          {/* Ratings */}
          <Ratings ratings={movie.Ratings} />

          {/* Extra Info */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <InfoItem label="Box Office" value={movie.BoxOffice} />
            <InfoItem label="Production" value={movie.Production} />
            <InfoItem label="Awards" value={movie.Awards} />
            <InfoItem label="IMDB Rating" value={movie.imdbRating} extra={movie.imdbVotes} />
          </div>
        </div>
      </div>
    </div>
  );
}
