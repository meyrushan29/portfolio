import { useProjects } from "../lib/projects";
import { FaGithub, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const TechTags = ({ technologies }) => (
  <ul className="flex flex-wrap gap-2">
    {technologies.map((tech) => (
      <li key={tech} className="tag">{tech}</li>
    ))}
  </ul>
);

const ProjectLinks = ({ project }) => {
  const links = [
    project.paper && { href: project.paper, label: "Read the paper", Icon: FaExternalLinkAlt },
    project.github && { href: project.github, label: "Source code", Icon: FaGithub },
    project.demo && { href: project.demo, label: "Live demo", Icon: FaExternalLinkAlt },
  ].filter(Boolean);
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          {label} <Icon className="text-xs" />
        </a>
      ))}
    </div>
  );
};

const FeaturedProject = ({ project }) => (
  <article className="grid gap-10 rounded-[2rem] border border-line bg-surface p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
    <div className="flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-surface-alt lg:col-span-5">
      {project.video ? (
        <video
          src={project.video}
          poster={project.image}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="max-h-[560px] w-full object-contain"
        />
      ) : (
        <img src={project.image} alt={project.title} loading="lazy" className="max-h-[560px] w-full object-contain" />
      )}
    </div>

    <div className="flex flex-col lg:col-span-7">
      <p className="text-sm font-medium text-accent">Featured research project</p>
      <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{project.title}</h3>
      {project.subtitle && <p className="mt-2 text-lg text-body">{project.subtitle}</p>}
      <p className="mt-5 leading-relaxed text-faint">{project.description}</p>
      {project.features?.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-body">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-[10px] text-accent">
                <FaCheck />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-col gap-5 lg:mt-auto lg:pt-8">
        <ProjectLinks project={project} />
        <TechTags technologies={project.technologies} />
      </div>
    </div>
  </article>
);

const ProjectRow = ({ project }) => (
  <article className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10">
    <div className="overflow-hidden rounded-[1.25rem] border border-line bg-surface-alt md:col-span-5">
      {project.image ? (
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center p-6 text-center font-display text-xl text-faint">{project.title}</div>
      )}
    </div>
    <div className="md:col-span-7">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{project.title}</h3>
      {project.subtitle && <p className="mt-1 text-base text-accent">{project.subtitle}</p>}
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body sm:text-base">{project.description}</p>
      <div className="mt-6 flex flex-col gap-4">
        <ProjectLinks project={project} />
        <TechTags technologies={project.technologies} />
      </div>
    </div>
  </article>
);

const Project = () => {
  const projects = useProjects();
  const featured = projects?.find((p) => p.featured);
  const rest = projects?.filter((p) => p !== featured) ?? [];

  return (
    <section id="projects" className="border-t border-line py-24 lg:py-32">
      <SectionHeading
        title="Projects"
        intro="Production systems and research builds, from real-time quiz engines to role-scoped business platforms."
      />
      {!projects ? (
        <div aria-busy="true" aria-label="Loading projects" className="h-[480px] animate-pulse rounded-[2rem] bg-surface-alt" />
      ) : (
        <>
          {featured && <FeaturedProject project={featured} />}
          <div className="mt-16">
            {rest.map((project) => (
              <ProjectRow key={project.id || project.title} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Project;
