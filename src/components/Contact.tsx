"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT } from "@/lib/data";
import { scrollToId } from "./SmoothScroll";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact__head .line-mask > span", {
        yPercent: 110, stagger: 0.12, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ".contact__head", start: "top 75%" },
      });
      gsap.from(".contact__info > *, .form > *", {
        y: 40, opacity: 0, stagger: 0.06, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".contact__grid", start: "top 80%" },
      });
      gsap.fromTo(".footer__word", { yPercent: 40, opacity: 0.2 }, {
        yPercent: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
      });
    },
    { scope: root },
  );

  // ponytail: no backend — the enquiry opens the visitor's mail app pre-filled. Swap for an API route when the client has a CRM/inbox service.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nProject type: ${f.get("type")}\nLocation: ${f.get("location")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Project enquiry — " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div ref={root}>
      <section className="contact" id="contact">
        <div className="contact__glow" />
        <div className="contact__head">
          <span className="eyebrow" style={{ color: "var(--gold-l)" }}>(06) Begin a project</span>
          <h2 className="display" style={{ marginTop: 28 }}>
            <span className="line-mask"><span>Build with</span></span>
            <span className="line-mask"><span><em className="gold-text">confidence.</em></span></span>
          </h2>
          <p>Complete construction services, tailored to each project. Tell us about your site — we will respond with a considered scope and quotation.</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div><h4>Call</h4><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></div>
            <div><h4>Write</h4><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
            <div>
              <h4>Visit</h4>
              <address>
                <a href={CONTACT.map} target="_blank" rel="noopener noreferrer">{CONTACT.address[0]}<br />{CONTACT.address[1]}</a>
              </address>
            </div>
            <div><h4>Director</h4><address>{CONTACT.director}</address></div>
          </div>

          <form className="form" onSubmit={submit}>
            <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" required autoComplete="name" /></div>
            <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" required autoComplete="tel" pattern="[0-9+\s\-]{8,}" /></div>
            <div className="field">
              <label htmlFor="f-type">Project type</label>
              <select id="f-type" name="type" defaultValue="Residential">
                <option>Residential</option><option>Commercial</option><option>Turnkey</option><option>Specific service</option>
              </select>
            </div>
            <div className="field"><label htmlFor="f-loc">Site location</label><input id="f-loc" name="location" /></div>
            <div className="field field--full"><label htmlFor="f-msg">About your project</label><textarea id="f-msg" name="message" rows={3} /></div>
            <div className="form__foot">
              <span>{sent ? "Thank you — your mail app has opened with the enquiry." : "Scope, specifications and terms are subject to project quotation."}</span>
              <button className="btn" type="submit"><span>Send enquiry</span><span className="arrow">→</span></button>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer">
        <img className="footer__word" src="/images/logo.webp" alt="Ekveera Infra Projects LLP — Luxury in every structure" />
        <div className="footer__row">
          <span>© 2026 {CONTACT.company}. Luxury in every structure.</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("#top"); }}>Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
