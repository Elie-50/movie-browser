import { highestGrossingMovies } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function HighestGrossingFilms() {
  const groupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" },
    });

    const step = 360 / highestGrossingMovies.length;

    highestGrossingMovies.forEach((_, index) => {
      tl.to(groupRef.current, {
        rotateY: -index * step,
        duration: 1.2,
      });
      tl.to({}, { duration: 2 });
    });
  }, []);

  return (
    <div className="sphere-wrapper mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Highest Grossing Films
      </h2>

      <div className="sphere-container">
        <div ref={groupRef} className="sphere-group">
          {highestGrossingMovies.map((movie, i) => (
            <div
              key={movie.imdbID}
              className="sphere-item"
              style={{
                transform: `rotateY(${i * (360 / highestGrossingMovies.length)}deg) translateZ(260px)`
              }}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <div className="sphere-label">{movie.Title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HighestGrossingFilms;
