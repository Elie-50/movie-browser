import { useRef, useEffect } from "react";
import gsap from "gsap";

type Props = {
  poster: string;
  title: string;
  type: string;
};

export default function Poster({ poster, title, type }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    // Animation function
    const animateImage = () => {
      gsap.fromTo(
        imgEl,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    };

    // If image is already loaded
    if (imgEl.complete) {
      animateImage();
    } else {
      imgEl.onload = animateImage;
    }

    // Cleanup on unmount
    return () => {
      if (imgEl) imgEl.onload = null;
    };
  }, [poster]);

  const imageSrc = poster && poster !== "N/A" ? poster : "/movie-browser/placeholder.png";

  return (
    <div className="w-full relative">
      <img
				ref={imgRef}
				src={imageSrc}
				alt={title}
				className="w-full h-full object-contain rounded-lg shadow-lg bg-black md:h-auto"
			/>
      <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 via-transparent to-transparent p-4 text-white">
        <span className="font-bold text-lg">{type.toUpperCase()}</span>
      </div>
    </div>
  );
}
