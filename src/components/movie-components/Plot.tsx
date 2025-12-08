import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  plot: string;
};

export default function Plot({ plot }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordEls = Array.from(el.querySelectorAll(".word"));

    gsap.set(wordEls, { opacity: 0, y: 20 });

    gsap.to(wordEls, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [plot]);

  const words = plot.split(" ").map((word, idx) => (
    <span key={idx} className="word inline-block mr-1">
      {word}
    </span>
  ));

  return (
    <div ref={containerRef} className="mt-4 text-base leading-relaxed">
      {words}
    </div>
  );
}
