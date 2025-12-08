import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText, useGSAP);

type Props = {
	children: ReactNode;
}

function Title({ children }: Props) {
	useGSAP(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

			const titleSplit = new SplitText(".title", { type: "chars" });

			tl.from(titleSplit.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.03,
      }, 0);
		})
		return () => ctx.revert();
	}, []);

  return (
    <h1 className="title text-4xl text-center font-extrabold mb-2">
      { children }
    </h1>
  )
}

export default Title
