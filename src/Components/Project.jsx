import { useState } from "react";
import { useProjects } from "../lib/projects";
import { FaGithub, FaExternalLinkAlt, FaCheck, FaImages, FaPlay } from "react-icons/fa";
import Lightbox from "./Lightbox";
import { spotlight } from "../lib/useSpotlight";

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
          View all {galleryCount} screenshots <FaImages className="text-xs" />
        </button>
      )}
    </div>
  );
};

// Problem and outcome, the two lines a reader needs before the detail.
const ProblemOutcome = ({ project }) => {
  if (!project.problem && !project.outcome) return null;
  return (
    <dl className="mt-6 grid gap-5 rounded-2xl bg-surface-alt/60 p-5 sm:grid-cols-2">
      {project.problem && (
        <div>
          <dt className="text-sm font-medium text-faint">The problem</dt>
          <dd className="mt-1 leading-relaxed text-body">{project.problem}</dd>
        </div>
      )}
      {project.outcome && (
        <div>
          <dt className="text-sm font-medium text-water">The outcome</dt>
          <dd className="mt-1 leading-relaxed text-ink">{project.outcome}</dd>
        </div>
      )}
    </dl>
  );
};

const Features = ({ features }) => {
  if (!features?.length) return null;
  return (
    <div className="mt-7">
      <h4 className="text-sm font-medium text-faint">What I built</h4>
      <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-body">
            <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-water-soft text-[9px] text-water">
              <FaCheck />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Stack = ({ technologies }) => {
  if (!technologies?.length) return null;
  return (
    <div>
      <h4 className="text-sm font-medium text-faint">Stack</h4>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li key={tech} className="tag">{tech}</li>
        ))}
      </ul>
    </div>
  );
};

// Short facts under the screenshots: scope, scale, and what makes it notable.
const Facts = ({ facts }) => {
  if (!facts?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key facts">
      {facts.map((fact) => (
        <li key={fact} className="inline-flex items-center gap-2 rounded-full border border-water/30 bg-water-soft/60 px-3 py-1 text-xs font-medium text-ink">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-water" />
          {fact}
        </li>
      ))}
    </ul>
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

// Main image or demo video; clicking an image opens the gallery when there is one.
const Media = ({ project, onOpen }) => {
  if (project.video) {
    return (
      <div className="flex items-center justify-center overflow-hidden rounded-[1.25rem] bg-surface-alt">
        <video
          src={project.video}
          poster={project.image}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="max-h-[520px] w-full object-contain"
        />
      </div>
    );
  }
  const hasGallery = (project.gallery?.length ?? 0) > 0;
  const img = project.image ? (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      loading="lazy"
      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover/img:scale-[1.03]"
    />
  ) : (
    <div className="flex aspect-[16/10] items-center justify-center p-6 text-center font-display text-xl text-faint">{project.title}</div>
  );
  return (
    <div className="group/img overflow-hidden rounded-[1.25rem] border border-line bg-surface-alt">
      {hasGallery && project.image ? (
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
      ) : img}
    </div>
  );
};

// One full case study. Every project gets the same depth; the featured one
// comes first with a label and the research tint.
const ProjectCase = ({ project, index, onOpen }) => (
  <article
    {...spotlight}
    className={`spot grid gap-8 rounded-[1.75rem] border bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_30px_60px_-40px_var(--water)] sm:p-8 lg:grid-cols-12 lg:gap-10 ${
      project.featured ? "border-water/40 hover:border-water/70" : "border-line hover:border-water/60"
    }`}
  >
    <div className="lg:col-span-5">
      <Media project={project} onOpen={onOpen} />
      <ThumbStrip project={project} onOpen={onOpen} />
      <Facts facts={project.facts} />
    </div>

    <div className="flex flex-col lg:col-span-7">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="tabular-nums text-faint">{String(index + 1).padStart(2, "0")}</span>
        {project.featured && (
          <span className="inline-flex items-center gap-1.5 font-medium text-water">
            <FaPlay className="text-[9px]" aria-hidden="true" /> Featured research project
          </span>
        )}
        {project.role && <span className="text-faint">{project.role}</span>}
      </p>
      <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{project.title}</h3>
      {project.subtitle && <p className="mt-2 text-lg text-body">{project.subtitle}</p>}

      <ProblemOutcome project={project} />

      {project.description && <p className="mt-6 leading-relaxed text-faint">{project.description}</p>}

      <Features features={project.features} />

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 lg:mt-auto">
        <Stack technologies={project.technologies} />
        <ProjectLinks project={project} onOpenGallery={onOpen} />
      </div>
    </div>
  </article>
);

const Project = () => {
  const projects = useProjects();
  const ordered = projects ? [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) : [];
  // { project, index } while the lightbox is open.
  const [viewing, setViewing] = useState(null);
  const openFor = (project) => (index) => setViewing({ project, index });

  return (
    <section id="projects" className="border-t border-line py-20 lg:py-28">
      {/* Full-width cards: this is the section that carries the most detail. */}
      <div className="mb-12 grid gap-4 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl md:col-span-6">Projects</h2>
        <p className="max-w-md text-base leading-relaxed text-faint md:col-span-6 md:justify-self-end">
          Full case studies: the problem, what I built, the stack, and the screenshots to prove it.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        {!projects ? (
          <div aria-busy="true" aria-label="Loading projects" className="h-[480px] animate-pulse rounded-[1.75rem] bg-surface-alt" />
        ) : (
          ordered.map((project, i) => (
            <ProjectCase key={project.id || project.title} project={project} index={i} onOpen={openFor(project)} />
          ))
        )}
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
