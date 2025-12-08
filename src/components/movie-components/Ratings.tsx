import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { MovieRating } from "@/redux/features/movies/moviesTypes";

type Props = {
  ratings: MovieRating[];
};

export default function Ratings({ ratings }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const badges = Array.from(containerRef.current.children) as HTMLElement[];

    gsap.set(badges, { opacity: 0, scale: 0.8 });

    gsap.to(badges, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.3,
    });
  }, [ratings]);

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2 mt-4">
      {ratings.map((rating) => (
        <span
          key={rating.Source}
          className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm"
        >
          {rating.Source}: {rating.Value}
        </span>
      ))}
    </div>
  );
}
