import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiMongodb, SiHtml5, SiCss3, SiJavascript, SiDocker, SiMysql, SiSpringboot,
  SiTypescript, SiTailwindcss, SiPython, SiFastapi, SiPostgresql, SiFlutter,
  SiExpress, SiDart, SiGit, SiSwagger, SiJsonwebtokens, SiPytorch,
} from "react-icons/si";
import { FaNodeJs, FaJava, FaAws, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const TechItem = ({ Icon, color, duration, name }) => (
  <motion.div
    variants={iconVariants(duration)}
    initial="initial"
    animate="animate"
    className="rounded-2xl border-4 border-line p-4 transition-colors hover:border-line-strong bg-surface/50"
    title={name}
  >
    <Icon className={`text-5xl sm:text-6xl ${color}`} />
  </motion.div>
);

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    items: [
      { Icon: RiReactjsLine, color: "text-cyan-400", duration: 2, name: "React" },
      { Icon: TbBrandNextjs, color: "text-body", duration: 5, name: "Next.js" },
      { Icon: SiTypescript, color: "text-blue-400", duration: 4.5, name: "TypeScript" },
      { Icon: SiJavascript, color: "text-yellow-400", duration: 6, name: "JavaScript" },
      { Icon: SiHtml5, color: "text-orange-500", duration: 3, name: "HTML5" },
      { Icon: SiCss3, color: "text-blue-500", duration: 4, name: "CSS3" },
      { Icon: SiTailwindcss, color: "text-cyan-400", duration: 3.5, name: "Tailwind CSS" },
    ],
  },
  {
    name: "Backend",
    items: [
      { Icon: FaNodeJs, color: "text-green-500", duration: 4, name: "Node.js" },
      { Icon: SiExpress, color: "text-neutral-300", duration: 3, name: "Express.js" },
      { Icon: SiFastapi, color: "text-teal-400", duration: 3.5, name: "FastAPI" },
      { Icon: SiSpringboot, color: "text-green-600", duration: 3, name: "Spring Boot" },
      { Icon: FaJava, color: "text-orange-500", duration: 5, name: "Java" },
    ],
  },
  {
    name: "Mobile",
    items: [
      { Icon: SiFlutter, color: "text-sky-400", duration: 4, name: "Flutter" },
      { Icon: SiDart, color: "text-blue-400", duration: 3, name: "Dart" },
    ],
  },
  {
    name: "Database",
    items: [
      { Icon: SiMongodb, color: "text-green-500", duration: 6, name: "MongoDB" },
      { Icon: SiMysql, color: "text-blue-500", duration: 4, name: "MySQL" },
      { Icon: SiPostgresql, color: "text-blue-400", duration: 3, name: "PostgreSQL" },
    ],
  },
  {
    name: "AI / ML",
    items: [
      { Icon: SiPython, color: "text-yellow-300", duration: 5.5, name: "Python" },
      { Icon: SiPytorch, color: "text-orange-400", duration: 4, name: "PyTorch" },
    ],
    tags: ["XGBoost", "MobileNetV2", "SHAP", "Grad-CAM"],
  },
  {
    name: "Tools",
    items: [
      { Icon: SiGit, color: "text-orange-500", duration: 3, name: "Git" },
      { Icon: FaGithub, color: "text-body", duration: 4, name: "GitHub" },
      { Icon: SiDocker, color: "text-blue-600", duration: 2.5, name: "Docker" },
      { Icon: FaAws, color: "text-orange-400", duration: 3.5, name: "AWS" },
      { Icon: SiSwagger, color: "text-green-500", duration: 4.5, name: "Swagger" },
      { Icon: SiJsonwebtokens, color: "text-pink-400", duration: 3, name: "JWT" },
    ],
  },
];

const Technology = () => {
  return (
    <div id="technologies" className="border-b border-line pb-24">
      <motion.h2
       whileInView={{opacity:1 ,y:0}}
       initial={{opacity:0,y:-100}}
       transition={{duration:1}}
       className="my-20 text-center text-4xl font-light text-ink">Skills</motion.h2>

      <div className="flex flex-col gap-12 max-w-5xl mx-auto">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.name}>
            <motion.h3
              whileInView={{opacity:1 ,x:0}}
              initial={{opacity:0,x:-40}}
              transition={{duration:0.6}}
              className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-5 text-center sm:text-left"
            >
              {category.name}
            </motion.h3>
            <motion.div
             whileInView={{opacity:1 ,x:0}}
             initial={{opacity:0,x:-100}}
             transition={{duration:1}}
             className="flex flex-wrap items-center justify-center sm:justify-start gap-6"
            >
              {category.items.map((item) => (
                <TechItem key={item.name} {...item} />
              ))}
            </motion.div>
            {category.tags && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-5">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-alt border border-line px-3 py-1.5 text-xs font-medium text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
