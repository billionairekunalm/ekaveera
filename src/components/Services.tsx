"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHASES } from "@/lib/data";

const ROWS = PHASES.flatMap((p) => p.services.map((s) => ({ ...s, phase: p.title })));

/** Index of all 16 services: hover shows a floating photo that trails the cursor; click expands the scope. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const fx = gsap.quickTo(float.current, "x", { duration: 0.7, ease: "power3" });
    const fy = gsap.quickTo(float.current, "y", { duration: 0.7, ease: "power3" });
    const move = (e: PointerEvent) => { fx(e.clientX + 30); fy(e.clientY - 115); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useGSAP(
    () => {
      gsap.from(".svc__row", {
        y: 50, opacity: 0, stagger: 0.04, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".svc", start: "top 80%" },
      });
      gsap.from(".sec-head .line-mask > span", { yPercent: 110, stagger: 0.1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".sec-head", start: "top 80%" } });
    },
    { scope: root },
  );

  useGSAP(() => {
    root.current!.querySelectorAll<HTMLElement>(".svc__panel").forEach((p, i) => {
      gsap.to(p, { height: i === open ? "auto" : 0, duration: 0.8, ease: "expo.inOut", onComplete: () => ScrollTrigger.refresh() });
    });
  }, { dependencies: [open], scope: root });

  // unique images for the floating preview
  const imgs = [...new Set(ROWS.map((r) => r.img))];
  const current = hover !== null ? ROWS[hover].img : null;

  return (
    <section className="section section--cream" id="services" ref={root} onPointerLeave={() => setHover(null)}>
      <div className="sec-head">
        <div>
          <span className="eyebrow">(03) Complete Construction Solutions</span>
          <h2 className="display" style={{ marginTop: 24 }}>
            <span className="line-mask"><span>Sixteen disciplines,</span></span>
            <span className="line-mask"><span><em style={{ color: "var(--gold)" }}>under one roof</em></span></span>
          </h2>
        </div>
        <p>Every trade a building needs — executed in-house or coordinated through trusted specialists, all answering to a single team.</p>
      </div>

      <ul className="svc">
        {ROWS.map((s, i) => (
          <li className={`svc__row ${open === i ? "is-open" : ""}`} key={s.no}>
            <button
              className="svc__btn"
              aria-expanded={open === i}
              onPointerEnter={() => setHover(i)}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="svc__no">{s.no}</span>
              <span className="svc__title">{s.title}</span>
              <span className="svc__phase">{s.phase}</span>
              <span className="svc__plus" />
            </button>
            <div className="svc__panel">
              <div className="svc__panel-inner">
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <img src={s.img} alt={s.title} loading="lazy" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={`svc-float ${current ? "is-on" : ""}`} ref={float} aria-hidden>
        {imgs.map((src) => <img key={src} src={src} alt="" className={src === current ? "is-on" : ""} />)}
      </div>
    </section>
  );
}
