import { MotionConfig } from "framer-motion";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Experience from "./Components/Experience";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Project from "./Components/Project";
import Research from "./Components/Research";
import Technology from "./Components/Technology";

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-hidden">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <Research />
          <About />
          <Experience />
          <Project />
          <Technology />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App;
