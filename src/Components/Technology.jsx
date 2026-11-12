import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiMongodb, SiHtml5, SiCss, SiJavascript, SiDocker, SiMysql, SiSpringboot,
  SiTypescript, SiTailwindcss, SiPython, SiFastapi, SiPostgresql, SiFlutter,
  SiExpress, SiDart, SiGit, SiSwagger, SiJsonwebtokens, SiPytorch,
} from "react-icons/si";
import { FaNodeJs, FaJava, FaAws, FaGithub } from "react-icons/fa";
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
      { Icon: SiCss, name: "CSS3" },
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
    name: "AI and ML",
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
    name: "Tools and platforms",
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

// Plain lists, grouped by where each tool sits in the stack. No motion: the
// content is a reference, not a performance.
const Technology = () => (
  <section id="skills" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading title="Skills" intro="The tools I reach for across the stack, grouped by where they sit." />
    <div className="case-body grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_CATEGORIES.map((category) => (
        <div key={category.name}>
          <h3 className="border-b border-line pb-3 font-display text-lg font-semibold text-ink">{category.name}</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {category.items.map(({ Icon, name }) => (
              <li key={name} className="flex items-center gap-3 text-body">
                <span className="flex h-5 w-5 items-center justify-center text-accent" aria-hidden="true">
                  {Icon ? <Icon className="text-base" /> : <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Technology;
