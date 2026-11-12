import { motion } from "motion/react";
import { HERO_CONTENT, HERO_ROLE } from "../constants";
import ForecastLine from "./ForecastLine";

const ease = [0.22, 1, 0.36, 1];
const rise = (delay) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease },
});

// The name fills the width in condensed Bricolage; the only self-starting
// motion on the page is this load sequence and the forecast curve under it.
const Hero = () => (
  <section className="pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
    <motion.h1
      {...rise(0)}
      className="font-display text-[clamp(3.6rem,16vw,14.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.035em] text-ink [font-stretch:75%]"
    >
      Meyrushan
      <br />
      Nadarajan
    </motion.h1>

    <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <motion.div {...rise(0.15)} className="lg:col-span-7">
        <p className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.9rem]">
          {HERO_ROLE}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-faint sm:text-lg">{HERO_CONTENT}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#research" className="btn-primary">See the research</a>
          <a href="/resume/Meyrushan_Nadarajan_CV.pdf" download="Meyrushan_Nadarajan_CV.pdf" className="btn-secondary">Download CV</a>
        </div>
      </motion.div>

      <motion.div {...rise(0.3)} className="self-end lg:col-span-5">
        <ForecastLine />
      </motion.div>
    </div>
  </section>
);

export default Hero;
