"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { onReady } from "./Preloader";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero__title .line-mask > span", { yPercent: 115 });
      gsap.set(".hero__meta > *, .hero__top > *", { opacity: 0, y: 20 });
      gsap.set(".hero__img", { scale: 1.25 });
      onReady(() => {
        gsap.timeline()
          .to(".hero__img", { scale: 1.08, duration: 2.8, ease: "expo.out" })
          .to(".hero__img", { scale: 1.16, xPercent: -2, duration: 24, ease: "sine.inOut", repeat: -1, yoyo: true })
          .to(".hero__title .line-mask > span", { yPercent: 0, duration: 1.6, stagger: 0.12, ease: "expo.out" }, 0.6)
          .to(".hero__meta > *, .hero__top > *", { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "power3.out" }, 1.1);
      });
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__media", { yPercent: 25, ease: "none", scrollTrigger: st });
      gsap.to(".hero__content, .hero__top", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        <img className="hero__img" src="/images/hero-tower.webp" alt="Luxury residential tower with landscaped entrance at sunset" fetchPriority="high" />
      </div>
      <div className="hero__vignette" />
      <div className="hero__top">
        <span>Construction &amp; Development</span>
        <span>Pune · Maharashtra</span>
      </div>
      <div className="hero__content">
        <h1 className="hero__title display">
          <span className="line-mask"><span>Luxury in</span></span>
          <span className="line-mask row-2"><span><em className="gold-text">every</em> structure</span></span>
        </h1>
        <div className="hero__meta">
          <span>Residential <strong>✦</strong> Commercial <strong>✦</strong> Turnkey</span>
          <span>From groundwork to final handover</span>
        </div>
      </div>
    </section>
  );
}
