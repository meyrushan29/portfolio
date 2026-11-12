import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Project from "./Components/Project";
import Rail from "./Components/Rail";
import Research from "./Components/Research";
import Technology from "./Components/Technology";
import { useActiveSection } from "./lib/useActiveSection";

// Sections below the first screen rise in once when they enter the viewport.
// Anything already visible on load is left alone so nothing flashes.
const useRevealOnScroll = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"))
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.85);
    if (sections.length === 0) return;
    sections.forEach((el) => el.setAttribute("data-reveal", ""));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const App = () => {
  const { active, scrolled } = useActiveSection();
  useRevealOnScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <div className="grain" aria-hidden="true" />
        <Navbar active={active} scrolled={scrolled} />
        <Rail active={active} />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <Research />
          <Project />
          <Experience />
          <Education />
          <About />
          <Technology />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;
