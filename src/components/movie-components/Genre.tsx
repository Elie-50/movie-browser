import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

type Props = {
  genre: string;
};

function Genre({ genre }: Props) {
  const spanRef = useRef<HTMLSpanElement>(null);


  useEffect(() => {
    if (!spanRef.current) return;
    const el = spanRef.current;

    const list = genre.split(",").map((g) => g.trim());

    const tl = gsap.timeline({
			repeat: -1,
			defaults: {
				ease: "none"
			},
		});

    list.forEach((word) => {
      // Type the genre
      tl.to(el, {
        duration: word.length * 0.15,
        text: word,
      });

      // Pause
      tl.to({}, { duration: 1.5 });

      // Erase in reverse
      for (let i = word.length; i >= 0; i--) {
        tl.to(el, {
          duration: 0.08,
          text: word.substring(0, i),
        });
      }

      // Pause between genres
      tl.to({}, { duration: 0.5 });
    });
  }, [genre]);

  return (
    <span
      ref={spanRef}
      className="genre font-bold text-transparent bg-clip-text text-md
      bg-linear-to-r from-purple-700 to-blue-500"
    ></span>
  );
}

export default Genre;
