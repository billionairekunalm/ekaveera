"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PHASES } from "@/lib/data";

/** The Ekveera Method — four phases, scrolled horizontally on desktop, stacked on mobile. */
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        const track = root.current!.querySelector<HTMLElement>(".journey__track")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: root.current, start: "top top", end: () => "+=" + dist(),
            pin: true, scrub: 1, invalidateOnRefresh: true,
          },
        });
        gsap.to(".journey__progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: true } });

        gsap.utils.toArray<HTMLElement>(".phase").forEach((p) => {
          gsap.fromTo(p.querySelector("img"), { xPercent: 8 }, {
            xPercent: -8, ease: "none",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
          gsap.from(p.querySelectorAll(".phase__list li, .phase__title, .phase__kicker"), {
            y: 40, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 60%" },
          });
          gsap.fromTo(p.querySelector(".phase__media"), { clipPath: "inset(0 0 0 100%)" }, {
            clipPath: "inset(0 0 0 0%)", ease: "none",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 95%", end: "left 35%", scrub: true },
          });
        });
      });
      mm.add("(max-width: 860px)", () => {
        gsap.utils.toArray<HTMLElement>(".phase").forEach((p) => {
          gsap.from(p.children, { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 80%" } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="journey" id="method" ref={root}>
      <div className="journey__track">
        <div className="journey__intro">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>(02) The Ekveera Method</span>
          <h2 className="display">
            Four phases.<br /><em className="gold-text">One</em> standard.
          </h2>
          <p>
            Every project moves through the same disciplined sequence — so the precision poured into the foundation is the
            precision you feel at handover.
          </p>
        </div>
        {PHASES.map((ph) => (
          <article className="phase" key={ph.no}>
            <div className="phase__media" data-cursor="Phase">
              <img src={ph.img} alt={ph.title} loading="lazy" />
            </div>
            <div className="phase__body">
              <span className="phase__kicker eyebrow">Phase {ph.no} — {ph.kicker}</span>
              <h3 className="phase__title display">{ph.title}</h3>
              <ul className="phase__list">
                {ph.services.map((s) => (
                  <li key={s.no}><span>{s.no}</span>{s.title}</li>
                ))}
              </ul>
            </div>
            <span className="phase__no" aria-hidden>{ph.no}</span>
          </article>
        ))}
      </div>
      <div className="journey__progress"><i /></div>
    </section>
  );
}
