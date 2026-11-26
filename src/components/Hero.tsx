"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { onReady } from "./Preloader";

const SLIDES = [
  { src: "/images/hero-tower.webp", label: "Residential", alt: "Luxury residential tower with landscaped entrance at sunset" },
  { src: "/images/tower-dusk.webp", label: "Elevation", alt: "Residential tower with lit crown at dusk" },
  { src: "/images/commercial.webp", label: "Commercial", alt: "Glass commercial building with vertical fins at dusk" },
];
const HOLD = 7000; // ms per slide — keep in sync with --hold in globals.css

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  // advance only after the intro, and restart the timer whenever someone picks a slide
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), HOLD);
    return () => clearTimeout(t);
  }, [active, playing]);

  useGSAP(
    () => {
      gsap.set(".hero__title .line-mask > span", { yPercent: 115 });
      gsap.set(".hero__meta > *, .hero__top > *, .hero__nav", { opacity: 0, y: 20 });
      gsap.set(".hero__frame", { opacity: 0, scale: 1.04 });
      onReady(() => {
        gsap.timeline()
          .to(".hero__frame", { opacity: 1, scale: 1, duration: 2, ease: "expo.out" }, 0.2)
          .to(".hero__title .line-mask > span", { yPercent: 0, duration: 1.6, stagger: 0.12, ease: "expo.out" }, 0.5)
          .to(".hero__meta > *, .hero__top > *, .hero__nav", { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "power3.out" }, 1)
          .add(() => setPlaying(true));
      });
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__media", { yPercent: 22, ease: "none", scrollTrigger: st });
      gsap.to(".hero__content, .hero__top", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        {SLIDES.map((s, i) => (
          <div className={`hero__slide ${i === active ? "is-active" : ""}`} key={s.src} aria-hidden={i !== active}>
            <img className="hero__img" src={s.src} alt={s.alt} fetchPriority={i === 0 ? "high" : "low"} />
          </div>
        ))}
      </div>
      <div className="hero__vignette" />
      <div className="hero__frame" aria-hidden>
        <i /><i /><i /><i />
      </div>

      <div className="hero__top">
        <span>Construction &amp; Development</span>
        <span>Pune · Maharashtra</span>
      </div>

      <div className="hero__content">
        <h1 className="hero__title display">
          <span className="line-mask"><span>Luxury in</span></span>
          <span className="line-mask row-2"><span><em className="gold-text">every</em> structure</span></span>
        </h1>
        <div className="hero__side">
          <div className="hero__meta">
            <span>Residential <strong>✦</strong> Commercial <strong>✦</strong> Turnkey</span>
            <span>From groundwork to final handover</span>
          </div>
          <div className="hero__nav" role="tablist" aria-label="Featured projects">
            <span className="hero__count">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(SLIDES.length).padStart(2, "0")}
              <em>{SLIDES[active].label}</em>
            </span>
            <span className="hero__bars">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${s.label}`}
                  className={`${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""} ${playing ? "is-playing" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <i />
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
