import { useEffect, useRef } from "react";
import gsap from "gsap";

type PersonProps = {
  label: string;
  names: string;
};

export function PersonList({ label, names }: PersonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const nameEls = Array.from(el.querySelectorAll<HTMLSpanElement>(".name"));

    // Reset any previous transforms
    gsap.set(nameEls, { y: 20, opacity: 0 });

    // Animate from below with stagger
    gsap.to(nameEls, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [names]);

  const nameArray = names.split(",").map((n) => n.trim());

  return (
    <div ref={containerRef} className="text-sm mb-1">
      <span className="font-semibold">{label}: </span>
      {nameArray.map((name) => (
        <span key={name} className="name inline-block mr-2">
          {name}
        </span>
      ))}
    </div>
  );
}
