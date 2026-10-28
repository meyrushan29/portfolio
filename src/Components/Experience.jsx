import { EXPERIENCES } from "../constants";
import SectionHeading from "./SectionHeading";

const Experience = () => {
  return (
    <section id="experience" className="border-t border-line py-24 lg:py-32">
      <SectionHeading
        title="Experience"
        intro="From intern to associate engineer at D-Gateway Innovations, working on production MERN applications."
      />
      <ol className="relative">
        {EXPERIENCES.map((experience) => (
          <li key={experience.year} className="grid gap-3 border-t border-line py-10 md:grid-cols-12 md:gap-8">
            <p className="text-sm tabular-nums text-faint md:col-span-3 md:pt-1.5">{experience.year}</p>
            <div className="md:col-span-9">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{experience.role}</h3>
              <p className="mt-1 text-base font-medium text-accent">{experience.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-body">{experience.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <li key={tech} className="tag">{tech}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
