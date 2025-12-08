import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

type Props = {
  runtime: string;
};

function Runtime({ runtime }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const totalMinutes = parseInt(runtime.replace(" min", ""), 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const hourFormat = `${hours}h ${minutes}m`;
  const minuteFormat = `${totalMinutes} min`;

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.5, ease: "power2.out" } });

    tl.set(el, { y: 0, text: hourFormat });
    tl.to({}, { duration: 2 });

    tl.to(el, { y: "-100%" });
    tl.set(el, { y: "100%", text: minuteFormat });
    tl.to(el, { y: "0%" });
    tl.to({}, { duration: 2 });

    tl.to(el, { y: "-100%" });
    tl.set(el, { y: "100%", text: hourFormat });
    tl.to(el, { y: "0%" });
    tl.to({}, { duration: 2 });

    return () =>{
			tl.kill();
		}
  }, [hourFormat, minuteFormat]);

  return (
    <div className="w-full flex justify-center items-center h-6 overflow-hidden">
      <div ref={containerRef} className="text-center block" />
    </div>
  );
}

export default Runtime;
