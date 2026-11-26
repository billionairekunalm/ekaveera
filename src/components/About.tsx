"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT } from "@/lib/data";

const MANIFESTO =
  "We build from the ground up — earthwork to final handover — carrying *one* *standard* through every slab, every surface, every fitting. Luxury, for us, is not a finish applied at the end. It is *how* *a* *structure* *is* *made.*";

const STATS = [
  { n: 16, s: "", label: "Construction disciplines" },
  { n: 4, s: "", label: "Integrated phases" },
  { n: 3, s: "", label: "Sectors served" },
  { n: 1, s: "", label: "Accountable team" },
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // word-by-word ink-in on scroll
      gsap.to(".manifesto__text .w", {
        opacity: 1, stagger: 0.05, ease: "none",
        scrollTrigger: { trigger: ".manifesto__text", start: "top 78%", end: "bottom 45%", scrub: true },
      });

      // expanding frame: small window grows to full-bleed
      const ft = gsap.timeline({
        scrollTrigger: { trigger: ".frame", start: "top top", end: "+=140%", scrub: 1, pin: true },
      });
      ft.to(".frame__media", { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" })
        .to(".frame__media img", { scale: 1, ease: "none" }, 0)
        .from(".frame__card", { opacity: 0, y: 50, duration: 0.35 }, 0.38)
        .from(".frame__copy .line-mask > span", { yPercent: 110, stagger: 0.1, ease: "power2.out", duration: 0.4 }, 0.45)
        .from(".frame__copy p", { opacity: 0, duration: 0.3 }, 0.6)
        .to(".frame__side--l", { xPercent: -60, opacity: 0, ease: "none", duration: 0.4 }, 0)
        .to(".frame__side--r", { xPercent: 60, opacity: 0, ease: "none", duration: 0.4 }, 0);

      // counters
      gsap.utils.toArray<HTMLElement>(".stat__num b").forEach((el) => {
        const to = Number(el.dataset.to);
        const o = { v: 0 };
        gsap.to(o, {
          v: to, duration: 2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(2, "0")),
        });
      });
      gsap.from(".stat", { y: 60, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="section section--cream" id="about">
        <div className="manifesto">
          <div className="manifesto__side">
            <span className="eyebrow">(01) The Practice</span>
            <span>Ekveera Infra Projects LLP<br />Chinchwad, Pune</span>
          </div>
          <p className="manifesto__text">
            {MANIFESTO.split(" ").map((w, i) => {
              const gold = w.startsWith("*");
              const clean = w.replace(/\*/g, "");
              return (
                <span key={i}>
                  <span className="w">{gold ? <em>{clean}</em> : clean}</span>{" "}
                </span>
              );
            })}
          </p>
        </div>
        <div className="manifesto__sign">
          <img src="/images/logo.webp" alt="Ekveera Infra Projects LLP logo" />
          <div>
            <b>{CONTACT.director}</b>
            <span>{CONTACT.role}</span>
          </div>
        </div>
      </section>

      <section className="frame" aria-label="From groundwork to final handover">
        <span className="frame__side frame__side--l">Est. Pune</span>
        <span className="frame__side frame__side--r">Scroll to enter</span>
        <div className="frame__media">
          <img src="/images/tower-dusk.webp" alt="A completed residential tower at dusk" />
        </div>
        <div className="frame__copy">
          <div className="frame__card">
            <h2 className="display">
              <span className="line-mask"><span>From groundwork</span></span>
              <span className="line-mask"><span>to <em className="gold-text">final handover</em></span></span>
            </h2>
            <p>Complete construction solutions</p>
          </div>
        </div>
      </section>

      <section className="section section--cream" style={{ paddingTop: 0 }}>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num"><b data-to={s.n}>00</b><sup>{s.s || "✦"}</sup></div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
