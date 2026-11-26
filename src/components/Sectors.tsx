"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SECTORS } from "@/lib/data";

/** Stacked sticky cards: each sector slides over the last, which recedes and dims. */
export default function Sectors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".sector");
      cards.forEach((card, i) => {
        gsap.fromTo(card.querySelector("img"), { scale: 1.25 }, {
          scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 9%", scrub: true },
        });
        gsap.from(card.querySelectorAll(".sector__title, .sector__text, .sector__top"), {
          y: 70, opacity: 0, stagger: 0.08, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 55%" },
        });
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, { scale: 0.9, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 9%", scrub: true } });
        gsap.to(card.querySelector(".sector__shade"), { opacity: 0.6, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 9%", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section className="sectors" id="sectors" ref={root}>
      <div className="sec-head">
        <div>
          <span className="eyebrow">(04) Sectors</span>
          <h2 className="display" style={{ marginTop: 24 }}>Built for how<br /><em className="gold-text">you live &amp; work</em></h2>
        </div>
        <p>Whether it is a family home or a commercial address, the same discipline shapes every square foot.</p>
      </div>
      {SECTORS.map((s, i) => (
        <article className="sector" key={s.title}>
          <div className="sector__body">
            <div className="sector__top"><span>0{i + 1} / 0{SECTORS.length}</span><span>Ekveera Infra</span></div>
            <div>
              <h3 className="sector__title display">{s.title}</h3>
              <p className="sector__text">{s.text}</p>
            </div>
          </div>
          <div className="sector__media"><img src={s.img} alt={`${s.title} construction by Ekveera`} loading="lazy" /></div>
          <div className="sector__shade" />
        </article>
      ))}
    </section>
  );
}
