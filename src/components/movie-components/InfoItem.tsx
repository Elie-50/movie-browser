import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  label: string;
  value: string | number;
  extra?: string;
};

export default function InfoItem({ label, value, extra }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={ref}>
      <span className="font-semibold">{label}:</span> {value} {extra && `(${extra})`}
    </div>
  );
}
