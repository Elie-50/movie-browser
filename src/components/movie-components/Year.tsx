import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type Props = {
  children: number | string;
};

function Year({ children }: Props) {
  const yearStr = String(children);
  const chars = yearStr.split("");

  const refs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const delay = 2;

    refs.current.forEach((col, i) => {
      if (!col) return;

      const char = chars[i];
      if (!/^\d$/.test(char)) return;

      const numbers = col.querySelector(".numbers") as HTMLElement;
      const firstDigitEl = numbers.children[0] as HTMLElement;

      const digitHeight = firstDigitEl.offsetHeight;
      const targetDigit = Number(char);
      const yOffset = -targetDigit * digitHeight;

      gsap.fromTo(
        numbers,
        { y: 0 },
        {
          y: yOffset,
          duration: 1 + i * 0.25,
          delay,
          ease: "power3.out",
        }
      );
    });
  }, [children]);

  return (
    <span className="inline-flex gap-0.5">
      {chars.map((char, i) => {
        if (/^\d$/.test(char)) {
          return (
            <div
              key={i}
              className="digit-column w-4 h-10 overflow-hidden relative"
              ref={(el) => {
                refs.current[i] = el!;
              }}
            >
              <div className="numbers text-base font-semibold leading-none">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="h-7 flex items-center justify-center">
                    {n}
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={i}
              className="w-3 h-10 flex items-center justify-center text-base font-semibold leading-none"
            >
              {char}
            </div>
          );
        }
      })}
    </span>
  );
}

export default Year;
