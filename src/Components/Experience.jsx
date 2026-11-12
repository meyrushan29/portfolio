import { EXPERIENCES } from "../constants";
import SectionHeading from "./SectionHeading";

const Experience = () => (
  <section id="experience" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading
      title="Experience"
      intro="From intern to associate engineer at D-Gateway Innovations, working on production MERN applications."
    />
    <ol className="case-body">
      {EXPERIENCES.map((item) => (
        <li key={`${item.role}-${item.year}`} className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8">
          <p className="text-sm tabular-nums text-faint md:col-span-3 md:pt-1">{item.year}</p>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{item.role}</h3>
            <p className="mt-1 text-base font-medium text-accent">{item.company}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-faint">{item.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <li key={tech} className="tag">{tech}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
