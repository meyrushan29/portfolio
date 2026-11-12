import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { EXPERIENCES, HERO_CONTENT, HERO_ROLE, PROJECTS, PUBLICATIONS } from "../constants";
import ForecastLine from "./ForecastLine";
import portrait from "../assets/Profile.webp";

const ease = [0.22, 1, 0.36, 1];
const rise = (delay) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease },
});

// One line of the name: slides up out of a clipped box on load.
const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.06em]">
    <motion.span
      className="block"
      initial={{ y: "105%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

// The name in condensed Bricolage. Moving the pointer across it widens the
// letters from 75% to 96% of normal width, following the cursor with a spring.
// The size is chosen so the widest state still fits the content column.
const Name = () => {
  const x = useMotionValue(0);
  const spring = useSpring(x, { stiffness: 110, damping: 22, mass: 0.6 });
  // Whole-percent steps: each distinct width costs a fresh glyph raster for
  // 200px letters, so limiting it to ~21 steps keeps the sweep smooth.
  const fontStretch = useTransform(spring, (v) => `${Math.round(75 + v * 21)}%`);

  return (
    <motion.h1
      style={{ fontStretch }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
      }}
      onPointerLeave={() => x.set(0)}
      className="w-fit cursor-default select-none font-display text-[clamp(3.5rem,14.5vw,13.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.035em] text-ink [contain:layout_style]"
    >
      <Line delay={0.05}>Meyrushan</Line>
      <Line delay={0.18}>Nadarajan</Line>
    </motion.h1>
  );
};

// Portrait with a slowly turning water ring. It floats gently, and on a
// mouse it tilts a few degrees toward the pointer.
const Portrait = () => {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-8, 8]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-1, 1], [8, -8]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease }}
      className="portrait-float relative mx-auto w-44 sm:w-52 lg:ml-auto lg:mr-0 lg:w-64"
      style={{ perspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { px.set(0); py.set(0); }}
    >
      <span aria-hidden="true" className="portrait-ring absolute -inset-[7px] rounded-[2.1rem]" />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <img
          src={portrait}
          alt="Meyrushan Nadarajan"
          width="240"
          height="300"
          className="aspect-[4/5] w-full rounded-[1.75rem] border border-line bg-surface-alt object-cover object-[50%_30%] shadow-[0_24px_50px_-28px_var(--ink)]"
        />
      </motion.div>
    </motion.div>
  );
};

// A number that counts up from zero the first time it is on screen.
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (reduced) {
        setShown(value);
        return;
      }
      animate(0, value, {
        duration: 1.4,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setShown(Math.round(v)),
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}{suffix}
    </span>
  );
};

// Whole years between the earliest start and latest end in EXPERIENCES.
const yearsInIndustry = () => {
  const years = EXPERIENCES.flatMap((e) => e.year.match(/\d{4}/g) || []).map(Number);
  if (years.length === 0) return 0;
  return Math.max(1, Math.max(...years) - Math.min(...years));
};

const PROOF = [
  { value: PUBLICATIONS.length, label: "paper published in IEEE Xplore" },
  { value: yearsInIndustry(), suffix: "+", label: "years in industry" },
  { value: PROJECTS.length, label: "products built end to end" },
];

const Hero = () => (
  <section className="relative pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
    <div className="aurora" aria-hidden="true" />

    <Name />

    {/* Phone order: portrait, text, curve. Desktop: text left, portrait and curve stacked right. */}
    <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <Portrait />
      </div>

      <motion.div {...rise(0.35)} className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-start">
        <p className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.9rem]">
          {HERO_ROLE}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-faint sm:text-lg">{HERO_CONTENT}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#research" className="btn-primary">See the research <FaArrowDown className="text-xs" /></a>
          <a href="/resume/Meyrushan_Nadarajan_CV.pdf" download="Meyrushan_Nadarajan_CV.pdf" className="btn-secondary">Download CV <FaArrowRight className="text-xs" /></a>
        </div>
      </motion.div>

      <motion.div {...rise(0.5)} className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
        <ForecastLine />
      </motion.div>
    </div>

    <motion.ul {...rise(0.65)} className="glass mt-14 grid overflow-hidden rounded-[1.5rem] sm:grid-cols-3" aria-label="At a glance">
      {PROOF.map((item, i) => (
        <li key={item.label} className={`px-6 py-5 ${i > 0 ? "border-t border-line/80 sm:border-l sm:border-t-0" : ""}`}>
          <p className="font-display text-4xl font-semibold tracking-tight text-ink">
            <Counter value={item.value} suffix={item.suffix} />
          </p>
          <p className="mt-1 text-sm text-faint">{item.label}</p>
        </li>
      ))}
    </motion.ul>
  </section>
);

export default Hero;
