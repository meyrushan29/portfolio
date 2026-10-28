import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiMongodb, SiHtml5, SiCss3, SiJavascript, SiDocker, SiMysql, SiSpringboot,
  SiTypescript, SiTailwindcss, SiPython, SiFastapi, SiPostgresql, SiFlutter,
  SiExpress, SiDart, SiGit, SiSwagger, SiJsonwebtokens, SiPytorch,
} from "react-icons/si";
import { FaNodeJs, FaJava, FaAws, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    items: [
      { Icon: RiReactjsLine, name: "React" },
      { Icon: TbBrandNextjs, name: "Next.js" },
      { Icon: SiTypescript, name: "TypeScript" },
      { Icon: SiJavascript, name: "JavaScript" },
      { Icon: SiHtml5, name: "HTML5" },
      { Icon: SiCss3, name: "CSS3" },
      { Icon: SiTailwindcss, name: "Tailwind CSS" },
    ],
  },
  {
    name: "Backend",
    items: [
      { Icon: FaNodeJs, name: "Node.js" },
      { Icon: SiExpress, name: "Express.js" },
      { Icon: SiFastapi, name: "FastAPI" },
      { Icon: SiSpringboot, name: "Spring Boot" },
      { Icon: FaJava, name: "Java" },
    ],
  },
  {
    name: "AI / ML",
    items: [
      { Icon: SiPython, name: "Python" },
      { Icon: SiPytorch, name: "PyTorch" },
      { name: "XGBoost" },
      { name: "MobileNetV2" },
      { name: "SHAP" },
      { name: "Grad-CAM" },
    ],
  },
  {
    name: "Mobile",
    items: [
      { Icon: SiFlutter, name: "Flutter" },
      { Icon: SiDart, name: "Dart" },
    ],
  },
  {
    name: "Databases",
    items: [
      { Icon: SiMongodb, name: "MongoDB" },
      { Icon: SiMysql, name: "MySQL" },
      { Icon: SiPostgresql, name: "PostgreSQL" },
    ],
  },
  {
    name: "Tools",
    items: [
      { Icon: SiGit, name: "Git" },
      { Icon: FaGithub, name: "GitHub" },
      { Icon: SiDocker, name: "Docker" },
      { Icon: FaAws, name: "AWS" },
      { Icon: SiSwagger, name: "Swagger" },
      { Icon: SiJsonwebtokens, name: "JWT" },
    ],
  },
];

const ICON_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.items).filter((item) => item.Icon);

const groupVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, delayChildren: i * 0.12 + 0.2 },
  }),
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22 } },
};

// Continuous strip of every skill icon; the list is doubled so the loop is seamless.
const Marquee = () => (
  <div
    aria-hidden="true"
    className="group relative mb-16 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
  >
    <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
      {[...ICON_SKILLS, ...ICON_SKILLS].map(({ Icon, name }, i) => (
        <span key={`${name}-${i}`} className="flex items-center gap-3 whitespace-nowrap font-display text-2xl font-medium text-ink/80">
          <Icon className="text-3xl text-accent" />
          {name}
        </span>
      ))}
    </div>
  </div>
);

const Technology = () => {
  return (
    <section id="skills" className="border-t border-line py-24 lg:py-32">
      <SectionHeading title="Skills" intro="The tools I reach for across the stack, grouped by where they sit." />
      <Marquee />
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category, i) => (
          <motion.div
            key={category.name}
            custom={i % 3}
            variants={groupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="relative pb-3 font-display text-xl font-semibold text-ink">
              {category.name}
              <span className="absolute inset-x-0 bottom-0 h-px bg-line" />
              <motion.span
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="absolute bottom-0 left-0 h-0.5 w-16 origin-left bg-accent"
              />
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {category.items.map(({ Icon, name }) => (
                <motion.li
                  key={name}
                  variants={pillVariants}
                  whileHover="hover"
                  className="group/pill inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_8px_20px_-8px_rgb(var(--accent)/0.45)]"
                >
                  {Icon && (
                    <motion.span
                      variants={{ hover: { rotate: 360, scale: 1.25, transition: { duration: 0.5 } } }}
                      className="inline-flex"
                    >
                      <Icon aria-hidden="true" className="text-base text-accent" />
                    </motion.span>
                  )}
                  {name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Technology;
