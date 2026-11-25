"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollToId } from "./SmoothScroll";
import { CONTACT } from "@/lib/data";

const LINKS = [
  { id: "#about", label: "About" },
  { id: "#method", label: "Method" },
  { id: "#services", label: "Services" },
  { id: "#sectors", label: "Sectors" },
  { id: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      setScrolled(y > window.innerHeight * 0.6);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    tl.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .to(menu.current, { clipPath: "inset(0 0 0% 0)", duration: 1 })
      .from(".menu__list a", { yPercent: 110, stagger: 0.06, duration: 1, ease: "expo.out" }, 0.45)
      .from(".menu__aside > *", { opacity: 0, y: 20, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0.6);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) { tl.current?.timeScale(1).play(); window.__lenis?.stop(); }
    else { tl.current?.timeScale(1.6).reverse(); window.__lenis?.start(); }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 650 : 0);
  };

  return (
    <>
      <header className={`nav ${hidden && !open ? "is-hidden" : ""} ${scrolled && !open ? "is-scrolled" : ""}`}>
        <a href="#top" className="nav__logo" aria-label="Ekveera home" onClick={(e) => { e.preventDefault(); go("#top"); }}>
          <img src="/images/logo-mark.webp" alt="" width="611" height="555" />
          <span><b>EKVEERA</b><small>INFRA PROJECTS LLP</small></span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.slice(0, 4).map((l) => (
            <a key={l.id} href={l.id} onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
          ))}
        </nav>
        <button className="nav__menu" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu">
          <span>{open ? "Close" : "Menu"}</span>
          <span className="nav__burger"><i /><i /></span>
        </button>
      </header>

      <div className="menu" id="site-menu" ref={menu} aria-hidden={!open}>
        <ul className="menu__list">
          {LINKS.map((l, i) => (
            <li key={l.id}>
              <a href={l.id} tabIndex={open ? 0 : -1} onClick={(e) => { e.preventDefault(); go(l.id); }}>
                <small>0{i + 1}</small>{l.label}
              </a>
            </li>
          ))}
        </ul>
        <aside className="menu__aside">
          <img className="menu__logo" src="/images/logo.webp" alt="Ekveera Infra Projects LLP" />
          <div><h4>Studio</h4>{CONTACT.address.join(" ")}</div>
          <div><h4>Talk to us</h4><a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
        </aside>
      </div>
    </>
  );
}
