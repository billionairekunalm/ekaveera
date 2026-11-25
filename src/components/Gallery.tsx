"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ROW_A = [
  { src: "/images/residence-sunset.webp", cap: "Residential" },
  { src: "/images/doors.webp", cap: "Doors & woodwork" },
  { src: "/images/commercial.webp", cap: "Commercial" },
  { src: "/images/windows-interior.webp", cap: "Glazing" },
  { src: "/images/amenities-pool.webp", cap: "Amenities" },
];
const ROW_B = [
  { src: "/images/facade-detail.webp", cap: "Facade" },
  { src: "/images/tiling.webp", cap: "Flooring & tiling" },
  { src: "/images/tower-dusk.webp", cap: "Elevation" },
  { src: "/images/waterproofing.webp", cap: "Waterproofing" },
  { src: "/images/fire-fighting.webp", cap: "Fire-fighting" },
];

/** Two image rows drifting in opposite directions, tied to scroll. */
export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(".marquee--a", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo(".marquee--b", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo(".ticker", { xPercent: 0 }, { xPercent: -40, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  const row = (items: typeof ROW_A) =>
    [...items, ...items].map((it, i) => (
      <figure key={i} data-cursor="View">
        <img src={it.src} alt={it.cap} loading="lazy" />
        <figcaption>{it.cap}</figcaption>
      </figure>
    ));

  return (
    <section className="gallery" aria-label="Craft gallery" ref={root}>
      <div className="sec-head">
        <div>
          <span className="eyebrow">(05) The Craft</span>
          <h2 className="display" style={{ marginTop: 24 }}>Detail is<br /><em style={{ color: "var(--gold)" }}>the signature</em></h2>
        </div>
        <p>Stone, timber, glass and steel — chosen with care, installed with patience, finished to last.</p>
      </div>
      <div className="marquee marquee--a">{row(ROW_A)}</div>
      <div className="marquee marquee--b">{row(ROW_B)}</div>
      <div className="ticker" aria-hidden>
        {Array.from({ length: 4 }, (_, i) => <span key={i}>Luxury in every structure</span>)}
      </div>
    </section>
  );
}
