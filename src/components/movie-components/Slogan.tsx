import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const words = ["movies!", "series!", "episodes!"];

function Slogan() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    const el = spanRef.current;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    words.forEach((word) => {
      tl.to(el, { duration: word.length * 0.15, text: word, ease: "none" });

      tl.to({}, { duration: 2 });

      for (let i = word.length; i >= 0; i--) {
        tl.to(el, { duration: 0.08, text: word.substring(0, i), ease: "none" });
      }
      
      tl.to({}, { duration: 0.5 });
    });
  }, []);

  return <span ref={spanRef} className="slogan font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-blue-500"></span>;
}

export default Slogan;
