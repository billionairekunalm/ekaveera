"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

declare global {
  interface Window {
    __ekvReady?: boolean;
  }
}

export function onReady(cb: () => void) {
  if (window.__ekvReady) cb();
  else window.addEventListener("ekv:ready", cb, { once: true });
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      history.scrollRestoration = "manual"; // the intro always plays from the top
      window.scrollTo(0, 0);
      document.body.classList.add("is-loading");
      window.__lenis?.stop();
      const count = { v: 0 };
      const num = root.current!.querySelector(".preloader__count")!;
      const finish = () => {
        document.body.classList.remove("is-loading");
        window.__lenis?.start();
        window.__ekvReady = true;
        // dispatch outside this timeline's callback: GSAP would otherwise adopt listeners' animations
        // into the preloader's context and revert them when the preloader unmounts
        setTimeout(() => window.dispatchEvent(new Event("ekv:ready")), 0);
      };

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".preloader__logo", { clipPath: "inset(100% 0 0 0)", scale: 0.92 }, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.8 })
        .fromTo(".preloader__shine", { backgroundPosition: "150% 0" }, { backgroundPosition: "-50% 0", duration: 1.4, ease: "power2.inOut" }, 1.1)
        .to(".preloader__bar i", { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0.2)
        .to(count, { v: 100, duration: 2.2, ease: "power2.inOut", onUpdate: () => (num.textContent = String(Math.round(count.v)).padStart(3, "0")) }, 0.2)
        .to(".preloader__inner, .preloader__count, .preloader__tag", { opacity: 0, y: -30, duration: 0.8, ease: "power3.in" }, "+=0.15")
        .to(".preloader__curtain", { scaleY: 1, duration: 0.7, ease: "expo.inOut" }, "-=0.3")
        .set(root.current, { backgroundColor: "transparent" })
        .add(finish)
        .to(".preloader__curtain", { scaleY: 0, transformOrigin: "top", duration: 0.9, ease: "expo.inOut" })
        .add(() => setDone(true));
    },
    { scope: root },
  );

  if (done) return null;
  return (
    <div className="preloader" ref={root} aria-hidden>
      <div className="preloader__inner">
        <div className="preloader__logo">
          <img src="/images/logo.webp" alt="" width="770" height="809" fetchPriority="high" />
          <i className="preloader__shine" />
        </div>
        <div className="preloader__bar"><i /></div>
      </div>
      <div className="preloader__tag">Luxury in every structure</div>
      <div className="preloader__count">000</div>
      <div className="preloader__curtain" />
    </div>
  );
}
