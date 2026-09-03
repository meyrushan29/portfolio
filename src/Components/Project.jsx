import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaLink, FaCheckCircle, FaStar } from "react-icons/fa";

const ProjectLinks = ({ project }) => {
  if (!project.github && !project.demo) return null;
  return (
    <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub repository`} className="p-2 bg-neutral-100 rounded-full text-neutral-900 hover:bg-cyan-300 transition-colors"><FaGithub /></a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="p-2 bg-neutral-100 rounded-full text-neutral-900 hover:bg-cyan-300 transition-colors"><FaLink /></a>
      )}
    </div>
  );
};

const TechTags = ({ technologies, large }) => (
  <div className="flex flex-wrap gap-2">
    {technologies.map((tech) => (
      <span
        key={tech}
        className={`rounded bg-surface-alt px-2 py-1 font-medium text-cyan-400 border border-line ${large ? "text-xs sm:text-sm" : "text-xs"}`}
      >
        {tech}
      </span>
    ))}
  </div>
);

const FeaturedProject = ({ project }) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.6 }}
    className="glass-card p-6 sm:p-8 mb-10 group"
  >
    <div className="flex items-center gap-2 mb-6">
      <FaStar className="text-cyan-400" />
      <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Featured Project</span>
    </div>
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="relative overflow-hidden rounded-lg lg:w-2/5 h-[420px] sm:h-[480px] flex-shrink-0 flex items-center justify-center bg-surface-alt">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        )}
        {!project.video && <ProjectLinks project={project} />}
      </div>
      <div className="lg:w-3/5 flex flex-col">
        <h3 className="mb-1 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">{project.title}</h3>
        {project.subtitle && <p className="mb-3 text-sm text-purple-400 font-medium">{project.subtitle}</p>}
        <p className="mb-4 text-faint text-sm leading-relaxed">{project.description}</p>
        {project.features?.length > 0 && (
          <ul className="mb-4 flex flex-col gap-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-body">
                <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-2">
          <TechTags technologies={project.technologies} large />
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glass-card p-6 hover:shadow-cyan-500/10 transition-shadow group relative overflow-hidden flex flex-col"
  >
    <div className="relative overflow-hidden rounded-lg mb-4 h-48">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-alt to-surface text-center px-4">
          <span className="text-lg font-semibold text-faint">{project.title}</span>
        </div>
      )}
      <ProjectLinks project={project} />
    </div>

    <h3 className="mb-1 text-xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">{project.title}</h3>
    {project.subtitle && <p className="mb-2 text-xs text-purple-400 font-medium">{project.subtitle}</p>}
    <p className="mb-4 text-faint text-sm line-clamp-3">{project.description}</p>
    <div className="mt-auto">
      <TechTags technologies={project.technologies} />
    </div>
  </motion.div>
);

const Project = () => {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div id="projects" className="border-b border-line pb-24">
      <motion.h2
        whileInView={{opacity:1 ,y:0}}
        initial={{opacity:0,y:-100}}
        transition={{duration:0.5}}
        className="my-20 text-center text-4xl font-light text-ink"
      >
        Projects
      </motion.h2>

      <div className="px-4 lg:px-20">
        {featured && <FeaturedProject project={featured} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
