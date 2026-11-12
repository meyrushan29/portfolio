import { EDUCATION, EXPERIENCES } from "../constants";
import SectionHeading from "./SectionHeading";

// One chronology: work and study interleaved, newest first.
const TIMELINE = [
  ...EXPERIENCES.map((e) => ({ kind: "Work", year: e.year, title: e.role, place: e.company, description: e.description, tags: e.technologies })),
  ...EDUCATION.map((e) => ({ kind: "Education", year: e.year, title: e.title, place: e.institution, description: e.description, tags: [] })),
].sort((a, b) => startYear(b.year) - startYear(a.year));

function startYear(label) {
  const match = label.match(/(\d{4})/);
  return match ? Number(match[1]) : 0;
}

const Experience = () => (
  <section id="experience" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading
      title="Experience"
      intro="Two years at D-Gateway Innovations on production MERN applications, alongside the degree that led to the research."
    />
    <ol className="case-body">
      {TIMELINE.map((item) => (
        <li key={`${item.kind}-${item.title}`} className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-sm tabular-nums text-faint md:pt-1">{item.year}</p>
            <p className={`mt-1 text-xs font-medium ${item.kind === "Work" ? "text-accent" : "text-water"}`}>{item.kind}</p>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
            <p className="mt-1 text-base text-body">{item.place}</p>
            {item.description && <p className="mt-4 max-w-2xl leading-relaxed text-faint">{item.description}</p>}
            {item.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tech) => (
                  <li key={tech} className="tag">{tech}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
