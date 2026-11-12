import { useState } from "react";
import { useProjects } from "../lib/projects";
import { FaGithub, FaExternalLinkAlt, FaCheck, FaImages } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Lightbox from "./Lightbox";

const TechTags = ({ technologies }) => (
  <ul className="flex flex-wrap gap-2">
    {technologies.map((tech) => (
      <li key={tech} className="tag">{tech}</li>
    ))}
  </ul>
);

const ProjectLinks = ({ project, onOpenGallery }) => {
  const links = [
    project.paper && { href: project.paper, label: "Read the paper", Icon: FaExternalLinkAlt },
    project.github && { href: project.github, label: "Source code", Icon: FaGithub },
    project.demo && { href: project.demo, label: "Live demo", Icon: FaExternalLinkAlt },
  ].filter(Boolean);
  const galleryCount = project.gallery?.length ?? 0;
  if (links.length === 0 && galleryCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-link">
          {label} <Icon className="text-xs" />
        </a>
      ))}
      {galleryCount > 0 && (
        <button type="button" onClick={() => onOpenGallery(0)} className="text-link">
          View {galleryCount} screenshots <FaImages className="text-xs" />
        </button>
      )}
    </div>
  );
};

// Problem and outcome, the two lines a reader needs before the detail.
const ProblemOutcome = ({ project }) => {
  if (!project.problem && !project.outcome) return null;
  return (
    <dl className="mt-5 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
      {project.problem && (
        <div>
          <dt className="text-sm font-medium text-faint">Problem</dt>
          <dd className="mt-1 text-sm leading-relaxed text-body sm:text-base">{project.problem}</dd>
        </div>
      )}
      {project.outcome && (
        <div>
          <dt className="text-sm font-medium text-water">Outcome</dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink sm:text-base">{project.outcome}</dd>
        </div>
      )}
    </dl>
  );
};

// Up to four thumbnails under the main image; the last shows how many more.
const ThumbStrip = ({ project, onOpen }) => {
  const gallery = project.gallery ?? [];
  if (gallery.length < 2) return null;
  const shown = gallery.slice(0, 4);
  const extra = gallery.length - shown.length;

  return (
    <ul className="mt-3 grid grid-cols-4 gap-2" aria-label={`${project.title} screenshots`}>
      {shown.map((src, i) => (
        <li key={src}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open screenshot ${i + 1} of ${gallery.length}`}
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface-alt transition-colors hover:border-water"
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            {i === shown.length - 1 && extra > 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/60 text-sm font-semibold text-white">
                +{extra}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

// Main image; clicking opens the gallery when the project has one.
const Cover = ({ project, onOpen, className }) => {
  const hasGallery = (project.gallery?.length ?? 0) > 0;
  const img = project.image ? (
    <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className={className} />
  ) : (
    <div className="flex aspect-[16/10] items-center justify-center p-6 text-center font-display text-xl text-faint">{project.title}</div>
  );
  if (!hasGallery || !project.image) return img;
  return (
    <button
      type="button"
      onClick={() => onOpen(0)}
      aria-label={`View ${project.title} screenshots`}
      className="group/cover relative block w-full cursor-zoom-in"
    >
      {img}
      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover/cover:opacity-100 group-focus-visible/cover:opacity-100">
        <FaImages /> {project.gallery.length} screenshots
      </span>
    </button>
  );
};

const FeaturedProject = ({ project, onOpen }) => (
  <article className="grid gap-8 rounded-[1.75rem] border border-line bg-surface p-5 sm:p-8 lg:grid-cols-12 lg:gap-10">
    <div className="lg:col-span-5">
      <div className="flex items-center justify-center overflow-hidden rounded-[1.25rem] bg-surface-alt">
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
          <Cover project={project} onOpen={onOpen} className="max-h-[560px] w-full object-contain" />
        )}
      </div>
      <ThumbStrip project={project} onOpen={onOpen} />
    </div>

    <div className="flex flex-col lg:col-span-7">
      <p className="text-sm font-medium text-water">Featured research project</p>
      <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{project.title}</h3>
      {project.subtitle && <p className="mt-2 text-lg text-body">{project.subtitle}</p>}
      <ProblemOutcome project={project} />
      <p className="mt-5 leading-relaxed text-faint">{project.description}</p>
      {project.features?.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-body">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-water-soft text-[10px] text-water">
                <FaCheck />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-col gap-5 lg:mt-auto lg:pt-8">
        <ProjectLinks project={project} onOpenGallery={onOpen} />
        <TechTags technologies={project.technologies} />
      </div>
    </div>
  </article>
);

const ProjectRow = ({ project, onOpen }) => (
  <article className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10">
    <div className="md:col-span-5">
      <div className="overflow-hidden rounded-[1.25rem] border border-line bg-surface-alt">
        <Cover project={project} onOpen={onOpen} className="aspect-[16/10] w-full object-cover object-top" />
      </div>
      <ThumbStrip project={project} onOpen={onOpen} />
    </div>
    <div className="md:col-span-7">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{project.title}</h3>
      {project.subtitle && <p className="mt-1 text-base text-faint">{project.subtitle}</p>}
      <ProblemOutcome project={project} />
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-body sm:text-base">{project.description}</p>
      <div className="mt-6 flex flex-col gap-4">
        <ProjectLinks project={project} onOpenGallery={onOpen} />
        <TechTags technologies={project.technologies} />
      </div>
    </div>
  </article>
);

const Project = () => {
  const projects = useProjects();
  const featured = projects?.find((p) => p.featured);
  const rest = projects?.filter((p) => p !== featured) ?? [];
  // { project, index } while the lightbox is open.
  const [viewing, setViewing] = useState(null);
  const openFor = (project) => (index) => setViewing({ project, index });

  return (
    <section id="projects" className="border-t border-line py-20 lg:py-28">
      <div className="case-grid">
        <SectionHeading
          title="Projects"
          intro="Case studies: the problem each one solved, what exists now, and the screenshots to prove it."
        />
        <div className="case-body">
          {!projects ? (
            <div aria-busy="true" aria-label="Loading projects" className="h-[480px] animate-pulse rounded-[1.75rem] bg-surface-alt" />
          ) : (
            <>
              {featured && <FeaturedProject project={featured} onOpen={openFor(featured)} />}
              <div className="mt-12">
                {rest.map((project) => (
                  <ProjectRow key={project.id || project.title} project={project} onOpen={openFor(project)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Lightbox
        images={viewing?.project.gallery ?? []}
        index={viewing?.index ?? null}
        title={viewing?.project.title ?? ""}
        onClose={() => setViewing(null)}
      />
    </section>
  );
};

export default Project;
