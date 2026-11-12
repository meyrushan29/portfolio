import { MotionConfig } from "motion/react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Experience from "./Components/Experience";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Project from "./Components/Project";
import Rail from "./Components/Rail";
import Research from "./Components/Research";
import Technology from "./Components/Technology";
import { useActiveSection } from "./lib/useActiveSection";

const App = () => {
  const { active, scrolled } = useActiveSection();

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <Navbar active={active} scrolled={scrolled} />
        <Rail active={active} />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <Research />
          <Project />
          <Experience />
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
