"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Gold ring cursor. Grows over links/buttons; shows a label over elements with [data-cursor]. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const lx = gsap.quickTo(label.current, "x", { duration: 0.35, ease: "power3" });
    const ly = gsap.quickTo(label.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      rx(e.clientX); ry(e.clientY); lx(e.clientX); ly(e.clientY);
      gsap.set(dot.current, { x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      label.current!.textContent = labelled?.dataset.cursor ?? "";
      label.current!.classList.toggle("is-on", !!labelled);
      ring.current!.classList.toggle("is-hover", !labelled && !!t.closest("a, button, select, input, textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} />
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-label" ref={label} />
    </>
  );
}
