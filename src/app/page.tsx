import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Services from "@/components/Services";
import Sectors from "@/components/Sectors";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Journey />
        <Services />
        <Sectors />
        <Gallery />
      </main>
      <Contact />
      <div className="grain" aria-hidden />
    </>
  );
}
