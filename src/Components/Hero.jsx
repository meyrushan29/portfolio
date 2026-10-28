import { HERO_CONTENT, HERO_ROLE } from "../constants";
import ProfilePic from '../assets/Profile.jpg';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease },
});

// Rounded-square portrait with a cobalt frame that slides out from behind on load.
const Portrait = () => (
  <motion.div
    {...rise(0.2)}
    className="relative mx-auto w-full max-w-[24rem] pb-4 pr-4 lg:ml-auto lg:mr-0"
  >
    <motion.div
      aria-hidden="true"
      initial={{ x: -16, y: -16, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.7, ease }}
      className="absolute bottom-0 right-0 left-4 top-4 rounded-[2rem] bg-accent"
    />
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface-alt">
      <img
        src={ProfilePic}
        alt="Meyrushan Nadarajan"
        className="h-full w-full object-cover object-[50%_30%]"
      />
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="grid items-center gap-14 pb-24 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-32 lg:pt-40">
      <div className="lg:col-span-7">
        <motion.a
          {...rise(0)}
          href="#research"
          className="group inline-flex max-w-full items-center gap-3 rounded-full border border-accent/30 bg-accent-soft py-1.5 pl-1.5 pr-4 text-sm text-ink"
        >
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">New</span>
          <span className="truncate">CISCON 2026 paper published in IEEE Xplore</span>
        </motion.a>

        <motion.h1
          {...rise(0.1)}
          className="mt-8 font-display text-[clamp(3.25rem,11vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-ink"
        >
          Meyrushan<br />Nadarajan
        </motion.h1>

        <motion.p {...rise(0.25)} className="mt-8 max-w-xl font-display text-2xl leading-snug tracking-tight text-ink sm:text-[1.7rem]">
          {HERO_ROLE}
        </motion.p>

        <motion.p {...rise(0.35)} className="mt-5 max-w-xl text-base leading-relaxed text-faint sm:text-lg">
          {HERO_CONTENT}
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">See projects</a>
          <a href="/resume/Meyrushan_Nadarajan_CV.pdf" download="Meyrushan_Nadarajan_CV.pdf" className="btn-secondary">Download CV</a>
        </motion.div>
      </div>

      <div className="lg:col-span-5">
        <Portrait />
      </div>
    </section>
  );
};

export default Hero;
